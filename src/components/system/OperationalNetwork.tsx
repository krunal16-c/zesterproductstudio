"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildNetwork, STAGES } from "./networkGeometry";
import { useThemeTone } from "@/lib/useThemeTone";

/* --------------------------------------------------------------------------
   All per-frame work happens on the GPU. Pulse travel is derived in the vertex
   shader from a single time uniform, so the CPU never rewrites an attribute
   buffer and React never re-renders while the scene is running.

   Every material shares one depth-fade term. Camera sits at z = 13.5 and the
   assembly is roughly 14 units wide, so once it rotates, the far side of the
   rack is ~6 units further away than the near side. Fading on that distance is
   what stops the scene collapsing into a flat tangle of hairlines, which was
   the failure mode of the previous revision.
   -------------------------------------------------------------------------- */

const DEPTH_FADE = /* glsl */ `
  float depthFade(float d) {
    return mix(0.22, 1.0, smoothstep(20.5, 8.5, d));
  }
`;

/* ---- Nodes -------------------------------------------------------------- */

const NODE_VERT = /* glsl */ `
  attribute float aStage;
  attribute float aScale;
  uniform float uActive;
  uniform float uSize;
  varying float vActive;
  varying float vDepth;

  void main() {
    vActive = 1.0 - min(abs(aStage - uActive), 1.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_PointSize = uSize * aScale * (1.0 + vActive * 0.7) * (12.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const NODE_FRAG = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vActive;
  varying float vDepth;
  ${DEPTH_FADE}

  void main() {
    // Structure is square. Data is round. The distinction is deliberate.
    vec2 p = abs(gl_PointCoord - 0.5) * 2.0;
    float edge = max(p.x, p.y);
    if (edge > 1.0) discard;

    // An active node reads as a filled cell with a hairline rim, so the stage
    // currently doing work looks switched on rather than merely brighter.
    float rim = smoothstep(0.62, 0.98, edge);
    vec3 base = mix(uInk, uAccent, vActive);
    vec3 color = mix(base, uAccent, rim * vActive);

    float alpha = mix(0.42, 1.0, vActive) * depthFade(vDepth);
    gl_FragColor = vec4(color, alpha);
  }
`;

/* ---- Pathways ----------------------------------------------------------- */

const EDGE_VERT = /* glsl */ `
  attribute float aStage;
  uniform float uActive;
  varying float vActive;
  varying float vDepth;

  void main() {
    vActive = 1.0 - min(abs(aStage - uActive), 1.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const EDGE_FRAG = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vActive;
  varying float vDepth;
  ${DEPTH_FADE}

  void main() {
    vec3 color = mix(uInk, uAccent, vActive * 0.9);
    gl_FragColor = vec4(color, mix(0.20, 0.72, vActive) * depthFade(vDepth));
  }
`;

/* ---- Travelling data ---------------------------------------------------- */

const PULSE_VERT = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aPhase;
  attribute float aStage;
  attribute float aTrail;
  uniform float uTime;
  uniform float uActive;
  uniform float uSize;
  varying float vActive;
  varying float vFade;
  varying float vDepth;
  varying float vTrail;

  void main() {
    // Trail copies sit slightly behind the head along the same pathway, which
    // gives direction of travel without a second draw call per pulse.
    float t = fract(uTime * 0.135 + aPhase - aTrail * 0.026);
    vec3 p = mix(aStart, aEnd, t);

    // Data appears as it leaves a node and lands as it arrives, rather than
    // popping in and out at the ends of the pathway.
    vFade = smoothstep(0.0, 0.16, t) * (1.0 - smoothstep(0.84, 1.0, t));
    vActive = 1.0 - min(abs(aStage - uActive), 1.0);
    vTrail = aTrail;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_PointSize = uSize * (1.0 + vActive * 0.9) * (1.0 - aTrail * 0.42) * (12.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const PULSE_FRAG = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vActive;
  varying float vFade;
  varying float vDepth;
  varying float vTrail;
  ${DEPTH_FADE}

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float core = 1.0 - smoothstep(0.16, 0.5, d);
    vec3 color = mix(uInk, uAccent, max(vActive, 0.35));
    float a = core * vFade * mix(0.5, 1.0, vActive) * (1.0 - vTrail * 0.62);
    gl_FragColor = vec4(color, a * depthFade(vDepth));
  }
`;

/* ---- Stage brackets ----------------------------------------------------- */

const FRAME_FRAG = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vActive;
  varying float vDepth;
  ${DEPTH_FADE}

  void main() {
    vec3 color = mix(uInk, uAccent, vActive);
    gl_FragColor = vec4(color, mix(0.24, 1.0, vActive) * depthFade(vDepth));
  }
`;

/* ---- Floor -------------------------------------------------------------- */

const GRID_VERT = /* glsl */ `
  varying float vDepth;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const GRID_FRAG = /* glsl */ `
  uniform vec3 uInk;
  varying float vDepth;

  void main() {
    // The floor fades out with distance instead of ending on a hard edge, so
    // the plane reads as ground rather than as a rectangle of lines.
    float a = smoothstep(19.0, 10.5, vDepth) * 0.16;
    gl_FragColor = vec4(uInk, a);
  }
`;

const TRAIL_COPIES = 3;

function System({ activeStage, reduced }: { activeStage: number; reduced: boolean }) {
  const net = useMemo(() => buildNetwork(), []);
  const tone = useThemeTone();
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();

  /* Materials are addressed by ref and their uniforms are mutated in place on
     the render loop. Uniform objects are created once per material and never
     replaced: swapping the object would force a shader recompile every time the
     theme changes, which is exactly the cost this scene is built to avoid. */
  const nodeMat = useRef<THREE.ShaderMaterial>(null);
  const pulseMat = useRef<THREE.ShaderMaterial>(null);
  const edgeMat = useRef<THREE.ShaderMaterial>(null);
  const frameMat = useRef<THREE.ShaderMaterial>(null);
  const gridMat = useRef<THREE.ShaderMaterial>(null);

  // Seeded neutral, then overwritten from the live design tokens on frame one.
  const initial = useMemo(() => {
    const shared = () => ({
      uActive: { value: 0 },
      uInk: { value: new THREE.Color("#ededea") },
      uAccent: { value: new THREE.Color("#ffd400") },
    });
    return {
      node: { ...shared(), uSize: { value: 3.6 } },
      pulse: { ...shared(), uTime: { value: 0 }, uSize: { value: 5.4 } },
      edge: shared(),
      frame: shared(),
      grid: { uInk: { value: new THREE.Color("#ededea") } },
    };
  }, []);

  const inkColor = useMemo(() => new THREE.Color(tone?.ink ?? "#ededea"), [tone?.ink]);
  const accentColor = useMemo(() => new THREE.Color(tone?.accent ?? "#ffd400"), [tone?.accent]);

  // Pulse buffers are replicated once per trail copy. Roughly 50 pathways, so
  // this stays well under 200 points even with the trail.
  const pulse = useMemo(() => {
    const n = net.pulseCount;
    const total = n * TRAIL_COPIES;
    const start = new Float32Array(total * 3);
    const end = new Float32Array(total * 3);
    const phase = new Float32Array(total);
    const stage = new Float32Array(total);
    const trail = new Float32Array(total);

    for (let c = 0; c < TRAIL_COPIES; c++) {
      const o = c * n;
      start.set(net.pulseStart, o * 3);
      end.set(net.pulseEnd, o * 3);
      phase.set(net.pulsePhase, o);
      stage.set(net.pulseStage, o);
      trail.fill(c / (TRAIL_COPIES - 1 || 1), o, o + n);
    }

    return { start, end, phase, stage, trail, count: total };
  }, [net]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const nu = nodeMat.current?.uniforms;
    const pu = pulseMat.current?.uniforms;
    const eu = edgeMat.current?.uniforms;
    const fu = frameMat.current?.uniforms;
    const gu = gridMat.current?.uniforms;
    if (!nu || !pu || !eu || !fu) return;

    for (const u of [nu, pu, eu, fu]) {
      u.uInk.value = inkColor;
      u.uAccent.value = accentColor;
    }
    if (gu) gu.uInk.value = inkColor;

    if (!reduced) {
      pu.uTime.value = state.clock.elapsedTime;
      // Emphasis eases toward the active stage instead of snapping, so the
      // transition reads as the system handing work forward.
      nu.uActive.value += (activeStage - nu.uActive.value) * Math.min(1, d * 2.4);
      pu.uActive.value = nu.uActive.value;
      eu.uActive.value = nu.uActive.value;
      fu.uActive.value = nu.uActive.value;
    } else {
      for (const u of [nu, pu, eu, fu]) u.uActive.value = activeStage;
    }

    if (group.current && !reduced) {
      const px = state.pointer.x;
      const py = state.pointer.y;
      const t = state.clock.elapsedTime;
      // Cursor-aware, but damped hard. The system acknowledges you; it does not
      // chase you around the viewport. The X base tilt is what puts the floor
      // grid in view and makes the rack read as standing in space.
      const targetY = px * 0.26 + Math.sin(t * 0.11) * 0.06;
      const targetX = 0.15 - py * 0.13 + Math.cos(t * 0.09) * 0.03;
      group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, d * 1.6);
      group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, d * 1.6);
    }
  });

  // Narrow viewports get a tighter frame so the array still fills the canvas.
  const scale = size.width < 900 ? 0.78 : 1;

  return (
    <group ref={group} rotation={[0.15, 0, 0]} scale={scale}>
      {/* Floor. Drawn first and never depth-writes, so nothing in the assembly
          is occluded by ground it is meant to sit above. */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.gridPositions, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={gridMat}
          vertexShader={GRID_VERT}
          fragmentShader={GRID_FRAG}
          uniforms={initial.grid}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      {/* Verticals tying the action stage to the floor. */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.dropPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={accentColor} transparent opacity={0.2} depthWrite={false} />
      </lineSegments>

      {/* Pathways. */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.edgePositions, 3]} />
          <bufferAttribute attach="attributes-aStage" args={[net.edgeStage, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={edgeMat}
          vertexShader={EDGE_VERT}
          fragmentShader={EDGE_FRAG}
          uniforms={initial.edge}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      {/* Stage registration marks. */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.framePositions, 3]} />
          <bufferAttribute attach="attributes-aStage" args={[net.frameStage, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={frameMat}
          vertexShader={EDGE_VERT}
          fragmentShader={FRAME_FRAG}
          uniforms={initial.frame}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes. */}
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.nodePositions, 3]} />
          <bufferAttribute attach="attributes-aStage" args={[net.nodeStage, 1]} />
          <bufferAttribute attach="attributes-aScale" args={[net.nodeScale, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMat}
          vertexShader={NODE_VERT}
          fragmentShader={NODE_FRAG}
          uniforms={initial.node}
          transparent
          depthWrite={false}
        />
      </points>

      {/* Travelling data, with trail. Additive so overlapping pulses read as
          brighter rather than muddier. */}
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulse.start, 3]} />
          <bufferAttribute attach="attributes-aStart" args={[pulse.start, 3]} />
          <bufferAttribute attach="attributes-aEnd" args={[pulse.end, 3]} />
          <bufferAttribute attach="attributes-aPhase" args={[pulse.phase, 1]} />
          <bufferAttribute attach="attributes-aStage" args={[pulse.stage, 1]} />
          <bufferAttribute attach="attributes-aTrail" args={[pulse.trail, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pulseMat}
          vertexShader={PULSE_VERT}
          fragmentShader={PULSE_FRAG}
          uniforms={initial.pulse}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function OperationalNetwork({
  activeStage,
  reduced = false,
}: {
  activeStage: number;
  reduced?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.6, 13.5], fov: 42 }}
      frameloop={reduced ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <System activeStage={activeStage} reduced={reduced} />
    </Canvas>
  );
}

export { STAGES };

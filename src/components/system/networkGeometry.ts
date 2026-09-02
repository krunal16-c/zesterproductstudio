import * as THREE from "three";

/**
 * The hero scene is a real operational system, not an abstract sphere:
 * four stages of work, connected by the pathways that carry data between them.
 * Sensing feeds a workflow, the workflow feeds a reasoning layer, and the
 * reasoning layer converges on a small number of actions. Node counts narrow
 * from 9 to 4 for exactly that reason.
 *
 * Beyond the nodes and edges, the builder emits three structural artifacts that
 * exist to make the scene read as a machined assembly in real space rather than
 * a particle cloud: corner brackets around each stage, a floor grid the whole
 * rack sits above, and drop lines tying the action stage to that floor.
 */
export const STAGES = [
  { id: "input", label: "Input", count: 9, x: -5.1 },
  { id: "workflow", label: "Workflow", count: 11, x: -1.7 },
  { id: "intelligence", label: "Intelligence", count: 8, x: 1.7 },
  { id: "action", label: "Action", count: 4, x: 5.1 },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

/** The plane the assembly sits above. Shared by the grid and the drop lines. */
export const FLOOR_Y = -3.35;

/** Deterministic pseudo-random so the layout is identical on every render. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export type NetworkData = {
  nodePositions: Float32Array;
  nodeStage: Float32Array;
  nodeScale: Float32Array;
  nodeCount: number;

  edgePositions: Float32Array;
  /** Per-vertex stage, so an edge can be shaded by the stage it feeds. */
  edgeStage: Float32Array;

  pulseStart: Float32Array;
  pulseEnd: Float32Array;
  pulsePhase: Float32Array;
  pulseStage: Float32Array;
  pulseCount: number;

  /** Corner brackets framing each stage. */
  framePositions: Float32Array;
  frameStage: Float32Array;

  /** Faint floor grid in the XZ plane. */
  gridPositions: Float32Array;

  /** Verticals from the action nodes down to the floor. */
  dropPositions: Float32Array;

  bounds: number;
};

/** Vertical half-extent of a stage column, before the frame margin. */
const spreadFor = (count: number) => (count > 6 ? 4.4 : 3.0);

export function buildNetwork(): NetworkData {
  const rand = seeded(20260902);
  const nodes: THREE.Vector3[] = [];
  const stageIndex: number[] = [];
  const scales: number[] = [];
  const byStage: number[][] = [];

  STAGES.forEach((stage, si) => {
    const ids: number[] = [];
    const count: number = stage.count;
    const spread = spreadFor(count);

    for (let i = 0; i < count; i++) {
      // Even vertical distribution with a small jitter, so the array reads as
      // an engineered rack rather than a random particle cloud.
      const t = count === 1 ? 0.5 : i / (count - 1);
      const y = (t - 0.5) * spread + (rand() - 0.5) * 0.34;
      const z = (rand() - 0.5) * 2.6;
      const x = stage.x + (rand() - 0.5) * 0.42;

      ids.push(nodes.length);
      nodes.push(new THREE.Vector3(x, y, z));
      stageIndex.push(si);
      // Convergent stages carry heavier nodes. Action nodes are the largest.
      scales.push(si === 3 ? 2.5 : si === 2 ? 1.7 : 1.15);
    }
    byStage.push(ids);
  });

  // Edges only ever run forward, one stage to the next. An operational system
  // has a direction; a decorative graph does not.
  const edges: [number, number][] = [];
  for (let si = 0; si < STAGES.length - 1; si++) {
    const from = byStage[si];
    const to = byStage[si + 1];

    from.forEach((a, i) => {
      const fanout = si === STAGES.length - 2 ? 2 : 1 + Math.round(rand());
      for (let k = 0; k < fanout; k++) {
        const target = to[(i + k * 3 + Math.floor(rand() * to.length)) % to.length];
        edges.push([a, target]);
      }
    });

    // Guarantee every downstream node is fed. No orphaned nodes in the render.
    to.forEach((b) => {
      if (!edges.some(([, e]) => e === b)) {
        edges.push([from[Math.floor(rand() * from.length)], b]);
      }
    });
  }

  const nodePositions = new Float32Array(nodes.length * 3);
  nodes.forEach((n, i) => n.toArray(nodePositions, i * 3));

  const edgePositions = new Float32Array(edges.length * 6);
  const edgeStage = new Float32Array(edges.length * 2);
  const pulseStart = new Float32Array(edges.length * 3);
  const pulseEnd = new Float32Array(edges.length * 3);
  const pulsePhase = new Float32Array(edges.length);
  const pulseStage = new Float32Array(edges.length);

  edges.forEach(([a, b], i) => {
    const pa = nodes[a];
    const pb = nodes[b];
    pa.toArray(edgePositions, i * 6);
    pb.toArray(edgePositions, i * 6 + 3);
    // Both ends carry the downstream stage, so the whole pathway lights when
    // the stage it feeds becomes active.
    edgeStage[i * 2] = stageIndex[b];
    edgeStage[i * 2 + 1] = stageIndex[b];
    pa.toArray(pulseStart, i * 3);
    pb.toArray(pulseEnd, i * 3);
    pulsePhase[i] = rand();
    // A pulse belongs to the stage it is travelling toward.
    pulseStage[i] = stageIndex[b];
  });

  /* ---- Stage brackets ---------------------------------------------------
     Four corner marks per stage, drawn as Ls. Registration marks on a
     technical drawing: they bound the stage without boxing it in. */
  const frameSegs: number[] = [];
  const frameStageVals: number[] = [];
  const ARM_X = 0.34;
  const ARM_Y = 0.46;

  STAGES.forEach((stage, si) => {
    const w = 0.66;
    const h = spreadFor(stage.count) / 2 + 0.62;
    const x0 = stage.x - w;
    const x1 = stage.x + w;

    const corners: [number, number, number, number][] = [
      [x0, h, 1, -1], // top-left:     arm right, arm down
      [x1, h, -1, -1], // top-right:    arm left,  arm down
      [x0, -h, 1, 1], // bottom-left:  arm right, arm up
      [x1, -h, -1, 1], // bottom-right: arm left,  arm up
    ];

    corners.forEach(([cx, cy, dx, dy]) => {
      // Horizontal arm.
      frameSegs.push(cx, cy, 0, cx + ARM_X * dx, cy, 0);
      // Vertical arm.
      frameSegs.push(cx, cy, 0, cx, cy + ARM_Y * dy, 0);
      frameStageVals.push(si, si, si, si);
    });
  });

  /* ---- Floor grid -------------------------------------------------------
     The single strongest depth cue in the scene. Kept faint and wide so it
     reads as ground the assembly stands on, not as a pattern. */
  const gridSegs: number[] = [];
  const GX = 7.4;
  const GZ = 3.2;
  const STEP = 1.24;

  for (let x = -GX; x <= GX + 0.001; x += STEP) {
    gridSegs.push(x, FLOOR_Y, -GZ, x, FLOOR_Y, GZ);
  }
  for (let z = -GZ; z <= GZ + 0.001; z += STEP) {
    gridSegs.push(-GX, FLOOR_Y, z, GX, FLOOR_Y, z);
  }

  /* ---- Drop lines -------------------------------------------------------
     Only the action stage is tied to the floor. Action is the stage that
     touches the physical world, and the scene should say so. */
  const dropSegs: number[] = [];
  byStage[3].forEach((id) => {
    const n = nodes[id];
    dropSegs.push(n.x, n.y, n.z, n.x, FLOOR_Y, n.z);
  });

  return {
    nodePositions,
    nodeStage: new Float32Array(stageIndex),
    nodeScale: new Float32Array(scales),
    nodeCount: nodes.length,

    edgePositions,
    edgeStage,

    pulseStart,
    pulseEnd,
    pulsePhase,
    pulseStage,
    pulseCount: edges.length,

    framePositions: new Float32Array(frameSegs),
    frameStage: new Float32Array(frameStageVals),

    gridPositions: new Float32Array(gridSegs),
    dropPositions: new Float32Array(dropSegs),

    bounds: 6.2,
  };
}

"use client";

import { Component, type ReactNode } from "react";

/**
 * The value proposition and the primary action must render even if WebGL is
 * unavailable, blocked, or crashes. This boundary guarantees the hero degrades
 * to type rather than to a blank column.
 */
export class CanvasBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

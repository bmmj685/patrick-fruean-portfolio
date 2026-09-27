"use client";

import dynamic from "next/dynamic";

const NetworkScene = dynamic(() => import("./NetworkScene"), {
  ssr: false,
  loading: () => <div className="network-fallback" aria-hidden="true" />,
});

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="network-fallback" />
      <NetworkScene />
      <div className="hero-visual-vignette" />
    </div>
  );
}

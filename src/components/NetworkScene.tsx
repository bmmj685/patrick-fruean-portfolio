"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 46;
const CONNECT_DISTANCE = 2.15;

export default function NetworkScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      mount.dataset.fallback = "true";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.z = 8.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.003, (Math.random() - 0.5) * 0.003, (Math.random() - 0.5) * 0.002));
    }

    const nodesGeometry = new THREE.BufferGeometry();
    nodesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const nodes = new THREE.Points(
      nodesGeometry,
      new THREE.PointsMaterial({ color: 0x70e1ff, size: 0.065, transparent: true, opacity: 0.9, sizeAttenuation: true }),
    );
    scene.add(nodes);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3a83d6, transparent: true, opacity: 0.16 });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.34;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.24;
    };
    mount.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frame = 0;
    let animationId = 0;
    const render = () => {
      if (!reducedMotion) {
        for (let i = 0; i < NODE_COUNT; i += 1) {
          const index = i * 3;
          positions[index] += velocities[i].x;
          positions[index + 1] += velocities[i].y;
          positions[index + 2] += velocities[i].z;
          if (Math.abs(positions[index]) > 4.2) velocities[i].x *= -1;
          if (Math.abs(positions[index + 1]) > 3.2) velocities[i].y *= -1;
          if (Math.abs(positions[index + 2]) > 2.2) velocities[i].z *= -1;
        }
        nodesGeometry.attributes.position.needsUpdate = true;
        scene.rotation.y += (mouse.x - scene.rotation.y) * 0.025;
        scene.rotation.x += (-mouse.y - scene.rotation.x) * 0.025;
      }

      if (frame % 2 === 0 || reducedMotion) {
        const segmentPositions: number[] = [];
        for (let i = 0; i < NODE_COUNT; i += 1) {
          for (let j = i + 1; j < NODE_COUNT; j += 1) {
            const ax = positions[i * 3];
            const ay = positions[i * 3 + 1];
            const az = positions[i * 3 + 2];
            const bx = positions[j * 3];
            const by = positions[j * 3 + 1];
            const bz = positions[j * 3 + 2];
            const distance = Math.hypot(ax - bx, ay - by, az - bz);
            if (distance < CONNECT_DISTANCE) segmentPositions.push(ax, ay, az, bx, by, bz);
          }
        }
        lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(segmentPositions, 3));
      }

      renderer.render(scene, camera);
      frame += 1;
      if (!reducedMotion) animationId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      nodesGeometry.dispose();
      lineGeometry.dispose();
      (nodes.material as THREE.Material).dispose();
      lineMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="network-scene" aria-hidden="true" />;
}

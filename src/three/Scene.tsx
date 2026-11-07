"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { progress } from "@/lib/progress";

const sm = THREE.MathUtils.smoothstep;
function Cloud() {
  const g = useRef<THREE.Group>(null!);
  const pts = useRef<THREE.Points>(null!);
  const { n, pos, t, col } = useMemo(() => {
    const n = window.innerWidth < 768 ? 2200 : 5500;
    const t = [new Float32Array(n * 3), new Float32Array(n * 3), new Float32Array(n * 3)];
    const col = new Float32Array(n * 3), pos = new Float32Array(n * 3);
    const base = new THREE.Color("#d9d8d2"), acc = new THREE.Color("#ff5b3a");
    const side = Math.ceil(Math.sqrt(n)), c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      const k = i + 0.5, phi = Math.acos(1 - (2 * k) / n), th = Math.PI * (1 + Math.sqrt(5)) * k;
      t[0].set([1.9 * Math.cos(th) * Math.sin(phi), 1.9 * Math.sin(th) * Math.sin(phi), 1.9 * Math.cos(phi)], i * 3);
      const a = Math.random() * 6.283, b = Math.random() * 6.283, R = 2, r = 0.65;
      t[1].set([(R + r * Math.cos(b)) * Math.cos(a), (R + r * Math.cos(b)) * Math.sin(a), r * Math.sin(b)], i * 3);
      const x = ((i % side) / side - 0.5) * 8, z = (Math.floor(i / side) / side - 0.5) * 6;
      t[2].set([x, Math.sin(x * 1.4) * Math.cos(z * 1.4) * 0.6 - 0.8, z], i * 3);
      c.copy(Math.random() < 0.09 ? acc : base).multiplyScalar(0.55 + Math.random() * 0.45);
      col.set([c.r, c.g, c.b], i * 3);
    }
    pos.set(t[0]);
    return { n, pos, t, col };
  }, []);
  useFrame((s, d) => {
    const p = progress.v * 2, wide = s.size.width > 768;
    const [A, B, w] = p < 1 ? [0, 1, sm(p, 0, 1)] : [1, 2, sm(p - 1, 0, 1)];
    const geo = pts.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = geo.array as Float32Array;
    for (let i = 0; i < n * 3; i++) arr[i] += (t[A][i] + (t[B][i] - t[A][i]) * w - arr[i]) * 0.06;
    geo.needsUpdate = true;
    g.current.rotation.y += d * 0.15;
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -s.pointer.y * 0.5 + 0.3, 0.05);
    g.current.position.x = THREE.MathUtils.lerp(g.current.position.x, wide ? s.pointer.x * 0.6 : 0, 0.05);
    g.current.position.y = wide ? 0 : 1;
  });
  return (
    <group ref={g}>
      <points ref={pts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={n} array={pos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={n} array={col} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.024} vertexColors transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  );
}
export default function Scene() {
  return (
    <Canvas className="cv" dpr={[1, 1.5]} camera={{ position: [0, 0, 6.5], fov: 50 }} eventSource={document.body} eventPrefix="client">
      <Cloud />
    </Canvas>
  );
}

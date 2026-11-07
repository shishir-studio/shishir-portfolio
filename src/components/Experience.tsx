"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { progress } from "@/lib/progress";
const Scene = dynamic(() => import("@/three/Scene"), { ssr: false });

export default function Experience() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = document.createElement("canvas");
    setOn(!!(cv.getContext("webgl2") || cv.getContext("webgl")) && !reduce);
    const lenis = reduce ? null : new Lenis();
    const ring = document.querySelector<HTMLElement>(".cur");
    let raf = 0, x = 0, y = 0, tx = 0, ty = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      if (ring) ring.style.transform = `translate(${x}px,${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onScroll = () => {
      const m = document.documentElement.scrollHeight - innerHeight;
      progress.v = m > 0 ? scrollY / m : 0;
      document.documentElement.style.setProperty("--p", String(progress.v));
    };
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e: MouseEvent) => ring?.classList.toggle("big", !!(e.target as HTMLElement).closest("a,button"));
    addEventListener("scroll", onScroll); addEventListener("mousemove", onMove); addEventListener("mouseover", onOver);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); removeEventListener("scroll", onScroll); removeEventListener("mousemove", onMove); removeEventListener("mouseover", onOver); io.disconnect(); };
  }, []);
  return on ? <Scene /> : <div className="cv fallback" />;
}

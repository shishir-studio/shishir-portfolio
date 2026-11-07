"use client";
import { useState } from "react";
import { career } from "@/data/content";
export default function Career() {
  const [i, setI] = useState(0);
  const c = career[i];
  return (
    <div className="car">
      <div className="track"><span>2020</span><div className="line"><i /></div><span>2026 — Present</span></div>
      <div className="carbody">
        <div className="tabs" role="tablist">
          {career.map((x, n) => (<button key={x.name} role="tab" aria-selected={n === i} className={n === i ? "on" : ""} onClick={() => setI(n)}><em>0{n + 1}</em>{x.name}</button>))}
        </div>
        <div className="panel" key={i}><small>2020 — 2026 · Ongoing</small><h3>{c.name}</h3><p>{c.text}</p></div>
      </div>
    </div>
  );
}

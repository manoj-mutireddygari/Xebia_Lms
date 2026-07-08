import React from "react";
import { Sparkles } from "lucide-react";

export function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="section-heading">
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export function InfoCard({ title }: { title: string }) {
  return (
    <article className="info-card glass-card">
      <Sparkles size={18} />
      <h3>{title}</h3>
      <p>Realistic placeholder content, actions, empty states, and future integration surface.</p>
    </article>
  );
}
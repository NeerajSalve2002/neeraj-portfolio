"use client";

import { useState } from "react";

export type ExperienceIconName = "analytics" | "android" | "industry" | "coordination" | "social" | "learning";

export type ExperienceItem = {
  date?: string;
  title: string;
  organization: string;
  description: string;
  icon: ExperienceIconName;
  tags?: string[];
};

const iconPaths: Record<ExperienceIconName, string> = {
  analytics: "M3 3v18h18M7 14l4-4 4 4 6-7",
  android: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 15h4",
  industry: "M3 21V8l6 5V8l6 5V5h6v16H3Zm4-3h2m3 0h2m3 0h2",
  coordination: "M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5ZM8 10h8m-8 4h5",
  social: "M3 10v4h4l5 4V6l-5 4H3Zm9 1a3 3 0 0 1 0 2m3-5a7 7 0 0 1 0 8",
  learning: "M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 0 3 23V5.5Zm18 0A2.5 2.5 0 0 0 18.5 3H12v18h6.5A2.5 2.5 0 0 1 21 23V5.5Z",
};

export function ExperienceIcon({ name }: { name: ExperienceIconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name]} /></svg>;
}

type TimelineRole = ExperienceItem & { id: string };

function TimelineItem({
  entry,
  order,
  isExpanded,
  isPinned,
  onPreview,
  onClearPreview,
  onToggle,
}: {
  entry: TimelineRole;
  order: number;
  isExpanded: boolean;
  isPinned: boolean;
  onPreview: (id: string) => void;
  onClearPreview: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <li className="experience-role-item" data-scroll-reveal data-reveal-order={order} data-pinned={isPinned ? "true" : undefined}>
      <span className="experience-role-marker" aria-hidden="true"><span /></span>
      <button
        aria-expanded={isExpanded}
        aria-controls="experience-detail"
        className={`experience-role-button${isExpanded ? " is-active" : ""}`}
        onBlur={() => onClearPreview(entry.id)}
        onClick={() => onToggle(entry.id)}
        onFocus={() => onPreview(entry.id)}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse" || event.pointerType === "pen") onPreview(entry.id);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse" || event.pointerType === "pen") onClearPreview(entry.id);
        }}
        type="button"
      >
        <span className="experience-role-copy">
          <span className="experience-role-title">{entry.title}</span>
          <span className="experience-role-meta">
            <span>{entry.organization}</span>
            {entry.date && <><span className="experience-meta-divider" aria-hidden="true">·</span><span>{entry.date}</span></>}
          </span>
        </span>
        <span className="experience-role-chevron" aria-hidden="true">⌄</span>
      </button>
    </li>
  );
}

export default function ExperienceTimeline({ professionalItems, leadershipItems }: {
  professionalItems: ExperienceItem[];
  leadershipItems: ExperienceItem[];
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const groups = [
    { id: "professional", title: "Professional experience", label: "01 / PROFESSIONAL", items: professionalItems },
    { id: "leadership", title: "Leadership", label: "02 / LEADERSHIP", items: leadershipItems },
  ];
  const roles: TimelineRole[] = groups.flatMap((group) => group.items.map((entry, index) => ({ ...entry, id: `${group.id}-${index}` })));
  const previewId = expandedId ?? hoveredId;
  const previewEntry = roles.find((entry) => entry.id === previewId);

  function toggleRole(id: string) {
    setExpandedId((current) => current === id ? null : id);
    setHoveredId(null);
  }

  function previewRole(id: string) {
    if (!expandedId) setHoveredId(id);
  }

  function clearPreview(id: string) {
    setHoveredId((current) => current === id ? null : current);
  }

  return (
    <div className="experience-timeline-layout">
      <div className="experience-timeline-groups">
        {groups.map((group, groupIndex) => (
          <section className="experience-timeline-group" data-experience-group={group.id} data-scroll-reveal data-reveal-order={groupIndex} aria-label={group.title} key={group.id}>
            <div className="experience-group-heading"><span>{group.label}</span><h3>{group.title}</h3></div>
            <ol className="experience-timeline-list">
              {group.items.map((entry, index) => {
                const id = `${group.id}-${index}`;
                return <TimelineItem
                  key={id}
                  entry={{ ...entry, id }}
                  order={index}
                  isExpanded={previewId === id}
                  isPinned={expandedId === id}
                  onPreview={previewRole}
                  onClearPreview={clearPreview}
                  onToggle={toggleRole}
                />;
              })}
            </ol>
          </section>
        ))}
      </div>
      <aside id="experience-detail" data-scroll-reveal data-reveal-order="2" className={`experience-detail-panel${previewEntry ? " is-active" : " is-empty"}`} aria-label="Experience details">
        {previewEntry ? (
          <article className="experience-detail-content" key={previewEntry.id}>
            <div className="experience-detail-topline">
              <span className="experience-detail-icon"><ExperienceIcon name={previewEntry.icon} /></span>
              <span className="experience-detail-label">{previewEntry.date ?? "LEADERSHIP"}</span>
            </div>
            <h4>{previewEntry.title}</h4>
            <p className="experience-detail-organization">{previewEntry.organization}</p>
            <p className="experience-detail-description">{previewEntry.description}</p>
            {previewEntry.tags && <ul className="experience-detail-tags" aria-label={`${previewEntry.title} focus areas`}>{previewEntry.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
          </article>
        ) : (
          <div className="experience-detail-content experience-detail-intro" key="intro">
            <span className="experience-detail-empty-mark" aria-hidden="true">✳</span>
            <h4>A journey of growth</h4>
            <p>From data analytics and application development to industry experience and campus leadership, each chapter has shaped how I solve problems and work with people.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

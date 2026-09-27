"use client";

import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/portfolio";

const filters = ["All", "Full-stack", "Software", "Networking", "Concept"] as const;

export function ProjectExplorer() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <div>
      <div className="project-filters" aria-label="Filter projects">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "active" : ""}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="projects-grid" aria-live="polite">
        {visible.map((project) => (
          <article className={`project-card accent-${project.accent} ${project.featured ? "featured" : ""}`} key={project.slug}>
            <div className="project-card-topline">
              <span className="project-index">0{projects.indexOf(project) + 1}</span>
              <span className="project-status"><i aria-hidden="true" />{project.status}</span>
            </div>
            <div className="project-symbol" aria-hidden="true">
              <Layers3 size={26} />
              <span />
            </div>
            <p className="eyebrow">{project.category} / {project.period}</p>
            <h3>{project.title}</h3>
            <p className="project-summary">{project.summary}</p>
            <ul className="tag-list" aria-label={`${project.title} technologies`}>
              {project.technologies.slice(0, project.featured ? 6 : 4).map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            <Link className="project-link" href={`/projects/${project.slug}`}>
              Explore case study <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <span className="project-glow" aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  );
}

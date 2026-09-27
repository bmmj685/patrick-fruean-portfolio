import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";
import { CyberGrid } from "@/components/CyberGrid";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { projects } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Navigation />
      <main id="main-content" className="case-main">
        <section className={`case-hero accent-${project.accent}`}>
          <CyberGrid />
          <div className="section-shell relative-layer case-hero-inner">
            <Link className="case-back" href="/#projects"><ArrowLeft size={17} aria-hidden="true" /> All projects</Link>
            <div className="case-heading">
              <div>
                <p className="section-kicker"><span aria-hidden="true" /> {project.category} · {project.period}</p>
                <h1>{project.title}</h1>
                <p>{project.summary}</p>
              </div>
              <div className="case-symbol" aria-hidden="true"><Layers3 size={46} /><span /></div>
            </div>
            <div className="case-meta">
              <div><span>Status</span><strong>{project.status}</strong></div>
              <div><span>Role</span><strong>{project.role}</strong></div>
              <div><span>Stack</span><strong>{project.technologies.slice(0, 3).join(" · ")}</strong></div>
            </div>
          </div>
        </section>

        <section className="section case-body">
          <div className="section-shell case-content">
            <div className="case-narrative">
              <article><p className="eyebrow">01 / The challenge</p><h2>Understanding the problem</h2><p>{project.challenge}</p></article>
              <article><p className="eyebrow">02 / The approach</p><h2>Building a practical solution</h2><p>{project.solution}</p></article>
              <article><p className="eyebrow">03 / Contribution</p><h2>My role</h2><p>{project.role}. The work combined requirements, implementation, testing, and technical problem-solving appropriate to the project&apos;s scope.</p></article>
            </div>
            <aside className="case-sidebar">
              <div className="case-panel"><h2>Key capabilities</h2><ul>{project.highlights.map((highlight) => <li key={highlight}><CheckCircle2 size={17} aria-hidden="true" />{highlight}</li>)}</ul></div>
              <div className="case-panel"><h2>Technologies</h2><ul className="tag-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
              <p className="case-note">Project information reflects Patrick&apos;s CV and documented project materials. Private source, credentials, and infrastructure details are intentionally not exposed.</p>
            </aside>
          </div>
        </section>

        <section className="next-project"><div className="section-shell"><p>Next case study</p><Link href={`/projects/${next.slug}`}><span>{next.title}</span><ArrowRight size={28} aria-hidden="true" /></Link></div></section>
      </main>
      <Footer />
    </>
  );
}

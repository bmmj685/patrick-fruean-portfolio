import Link from "next/link";
import { ArrowDown, ArrowRight, Braces, BriefcaseBusiness, Check, Code2, Database, Download, GraduationCap, Mail, MapPin, Network, Phone, ServerCog, ShieldCheck, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { CyberGrid } from "@/components/CyberGrid";
import { Footer } from "@/components/Footer";
import { HeroVisual } from "@/components/HeroVisual";
import { Navigation } from "@/components/Navigation";
import { OrbBackground } from "@/components/OrbBackground";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { Reveal } from "@/components/Reveal";
import { journey, profile, services, skillGroups } from "@/data/portfolio";

const serviceIcons = [Code2, Braces, BriefcaseBusiness, Database, ServerCog, ShieldCheck];
const skillIcons = [Code2, Braces, Database, Network, ServerCog, Sparkles];

function SectionHeading({ id, kicker, title, copy }: { id: string; kicker: string; title: React.ReactNode; copy?: string }) {
  return <div className="section-heading"><p className="section-kicker"><span aria-hidden="true" />{kicker}</p><h2 id={id}>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>;
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <HeroVisual /><div className="hero-noise" aria-hidden="true" />
          <div className="section-shell hero-inner">
            <div className="hero-copy">
              <p className="availability"><span aria-hidden="true" /> Open to graduate, internship & project opportunities</p>
              <p className="hero-intro">Hello, I&apos;m</p>
              <h1 id="hero-title">Patrick<br /><span>Fruean.</span></h1>
              <p className="hero-role">{profile.shortHeadline}</p>
              <p className="hero-summary">{profile.summary}</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="#projects">View my work <ArrowRight size={18} aria-hidden="true" /></Link>
                <a className="button button-secondary" href={profile.cvPath} download><Download size={17} aria-hidden="true" /> Download CV</a>
                <Link className="text-link" href="#contact">Contact me</Link>
              </div>
              <div className="hero-meta">
                <span><MapPin size={15} aria-hidden="true" /> Samoa / Fiji</span>
                <a href={`mailto:${profile.email}`}><Mail size={15} aria-hidden="true" /> {profile.email}</a>
              </div>
            </div>
            <div className="hero-system-card" aria-label="Developer profile summary">
              <div className="system-card-head"><span>profile.ts</span><i /><i /><i /></div>
              <div className="system-code" aria-hidden="true">
                <p><b>const</b> developer = &#123;</p><p className="indent">focus: <em>&quot;full-stack systems&quot;</em>,</p><p className="indent">foundation: [</p><p className="indent-2"><em>&quot;software&quot;</em>, <em>&quot;networks&quot;</em>,</p><p className="indent-2"><em>&quot;databases&quot;</em>, <em>&quot;security&quot;</em></p><p className="indent">],</p><p className="indent">mindset: <em>&quot;build → test → improve&quot;</em></p><p>&#125;;</p>
              </div>
              <div className="system-status"><span aria-hidden="true" /> Ready to build meaningful systems</div>
            </div>
          </div>
          <Link className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>Scroll</span><ArrowDown size={17} aria-hidden="true" /></Link>
        </section>

        <section id="about" className="section about-section" aria-labelledby="about-title">
          <OrbBackground />
          <div className="section-shell relative-layer">
            <Reveal><SectionHeading id="about-title" kicker="About" title={<>Curious across the <span className="gradient-text">whole stack.</span></>} /></Reveal>
            <div className="about-grid">
              <Reveal className="about-story">
                <p className="lead">I&apos;m a Computer Science student at The University of the South Pacific, building at the intersection of software, systems, and networks.</p>
                <p>My hands-on work spans full-stack applications, databases, distributed Java systems, operating systems, and network engineering. I enjoy moving from requirements and data models to interfaces, deployment, and careful debugging.</p>
                <p>I&apos;m especially interested in reliable, secure, practical software—and in growing that foundation toward professional software engineering and cybersecurity work.</p>
                <Link href="#journey" className="inline-arrow">Follow my development journey <ArrowRight size={17} aria-hidden="true" /></Link>
              </Reveal>
              <div className="about-stats">
                <Reveal className="stat-card stat-primary" delay={80}><span className="stat-label">Currently</span><strong>BSc</strong><p>Computer Science major<br />Physics minor</p></Reveal>
                <Reveal className="stat-card" delay={140}><span className="stat-label">Academic journey</span><strong>2023<span>—present</span></strong><p>USP, Laucala Campus</p></Reveal>
                <Reveal className="stat-card" delay={200}><span className="stat-label">Perspective</span><strong>360°</strong><p>Applications · data · systems · networks</p></Reveal>
                <Reveal className="stat-card" delay={260}><span className="stat-label">Direction</span><strong>Secure</strong><p>Reliable, security-aware development</p></Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section" aria-labelledby="skills-title">
          <div className="section-shell">
            <Reveal><SectionHeading id="skills-title" kicker="Technical toolkit" title={<>Tools for turning ideas into <span className="gradient-text">working systems.</span></>} copy="A practical toolkit shaped by university coursework, personal projects, and full-stack implementation—not arbitrary proficiency scores." /></Reveal>
            <div className="skills-grid">
              {skillGroups.map((group, index) => { const Icon = skillIcons[index]; return (
                <Reveal className="skill-card" delay={(index % 3) * 70} key={group.title}>
                  <div className="skill-icon"><Icon size={21} aria-hidden="true" /></div><h3>{group.title}</h3><p>{group.description}</p>
                  <ul className="skill-tags" aria-label={`${group.title} skills`}>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </Reveal>
              ); })}
            </div>
          </div>
        </section>

        <section id="projects" className="section projects-section" aria-labelledby="projects-title">
          <CyberGrid />
          <div className="section-shell relative-layer">
            <Reveal><SectionHeading id="projects-title" kicker="Selected work" title={<>Projects built around <span className="gradient-text">real problems.</span></>} copy="Full-stack systems, distributed software, network engineering, and structured product concepts from my practical and academic work." /></Reveal>
            <Reveal delay={100}><ProjectExplorer /></Reveal>
          </div>
        </section>

        <section id="journey" className="section journey-section" aria-labelledby="journey-title">
          <div className="section-shell">
            <Reveal><SectionHeading id="journey-title" kicker="Development journey" title={<>Learning from the interface <span className="gradient-text">down to the network.</span></>} /></Reveal>
            <div className="journey-grid">
              <Reveal className="education-card">
                <div className="education-icon"><GraduationCap size={28} aria-hidden="true" /></div><p className="eyebrow">Education</p><h3>Bachelor of Science</h3><p className="education-school">The University of the South Pacific</p>
                <dl><div><dt>Major</dt><dd>Computer Science</dd></div><div><dt>Minor</dt><dd>Physics</dd></div><div><dt>Campus</dt><dd>Laucala, Fiji</dd></div><div><dt>Period</dt><dd>2023 — Present</dd></div></dl>
                <div className="coursework"><span>Relevant study</span><p>Computer Networks · Operating Systems · Distributed Systems · Database & Web Application Development · Software & System Design · Physics laboratory work</p></div>
              </Reveal>
              <div className="timeline">
                {journey.map((item, index) => <Reveal className="timeline-item" delay={index * 50} key={item.title}><span className="timeline-dot" aria-hidden="true">{index + 1}</span><div><p className="timeline-marker">{item.marker}</p><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>)}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section services-section" aria-labelledby="services-title">
          <OrbBackground />
          <div className="section-shell relative-layer">
            <Reveal><SectionHeading id="services-title" kicker="What I can build" title={<>From an idea to a <span className="gradient-text">useful product.</span></>} copy="Capabilities grounded in my current technical experience, with clear communication and practical implementation at the centre." /></Reveal>
            <div className="services-grid">
              {services.map((service, index) => { const Icon = serviceIcons[index]; return <Reveal className="service-card" delay={(index % 3) * 70} key={service.title}><span className="service-number">0{index + 1}</span><Icon size={24} aria-hidden="true" /><h3>{service.title}</h3><p>{service.text}</p><span className="service-line" aria-hidden="true" /></Reveal>; })}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <CyberGrid />
          <div className="section-shell relative-layer contact-grid">
            <Reveal className="contact-copy">
              <p className="section-kicker"><span aria-hidden="true" /> Contact</p><h2 id="contact-title">Let&apos;s build something <span className="gradient-text">useful.</span></h2>
              <p>Have an internship, graduate opportunity, software project, or technical challenge in mind? Send the context and I&apos;ll be glad to start a conversation.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}><span><Mail size={20} aria-hidden="true" /></span><div><small>Email</small>{profile.email}</div></a>
                <a href={`tel:${profile.phone}`}><span><Phone size={20} aria-hidden="true" /></span><div><small>Phone</small>{profile.phone}</div></a>
                <div><span><MapPin size={20} aria-hidden="true" /></span><div><small>Based in</small>Samoa / Fiji</div></div>
              </div>
              <div className="contact-assurance"><Check size={17} aria-hidden="true" /> Open to meaningful opportunities and collaborations</div>
            </Reveal>
            <Reveal delay={120}><ContactForm /></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

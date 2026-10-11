import SiteHeader from "@/components/site-header";

const skills = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "Git & GitHub"];
const projects = [
  { number: "01", title: "Your next standout project", type: "WEB APPLICATION", text: "A space for a project you’re proud of. Add the problem you solved, your approach, and the impact it made.", tags: ["Next.js", "TypeScript"] },
  { number: "02", title: "Something thoughtful, built well", type: "OPEN SOURCE / TOOL", text: "Use this card to share a useful tool, experiment, or contribution and what you learned along the way.", tags: ["React", "API"] },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section id="home" className="hero-shell section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEERING STUDENT <span className="eyebrow-divider">·</span> ASPIRING FULL-STACK DEVELOPER</div>
            <h1>Building ideas<br />into <span className="gradient-text">digital experiences.</span></h1>
            <p className="hero-description">Hey, I’m <strong>Neeraj Salve</strong> — a software engineering student who loves turning curious ideas into thoughtful, useful things on the web.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View projects <span aria-hidden="true">↗</span></a>
              <a className="button button-secondary" href="/resume.pdf" download>Download resume <span aria-hidden="true">↓</span></a>
            </div>
            <div className="social-links" aria-label="Social links">
              <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href="mailto:hello@neerajsalve.dev">Email <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Neeraj Salve monogram illustration">
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-card"><span className="card-corner">✳</span><div className="monogram">N<span>.</span>S</div><div className="visual-rule" /><div className="visual-caption"><span>NEERAJ SALVE</span><span>DESIGN · CODE · LEARN</span></div></div>
            <div className="floating-chip chip-top">✦&nbsp; Open to opportunities</div><div className="floating-chip chip-bottom"><span className="status-dot" /> Currently learning</div>
            <span className="visual-spark spark-one">✳</span><span className="visual-spark spark-two">✦</span>
          </div>
          <a className="scroll-cue" href="#about"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
        </section>

        <section id="about" className="content-section section-wrap">
          <div className="section-kicker">01 / A LITTLE ABOUT ME</div>
          <div className="section-grid"><h2>Curious by nature.<br /><span className="muted-heading">Builder by choice.</span></h2><div className="section-copy"><p>I’m a software engineering student exploring the craft of building for the web — from the first sketch to the last line of code. I care about clear thinking, good details, and making technology feel a little more human.</p><p>This is the beginning of my portfolio. More of my story, work, and learning journey will find a home here soon.</p><a className="text-link" href="mailto:hello@neerajsalve.dev">Let’s connect <span>↗</span></a></div></div>
        </section>

        <section id="skills" className="content-section section-wrap section-tinted">
          <div className="section-kicker">02 / MY TOOLKIT</div><div className="section-grid"><h2>Tools I’m learning<br /><span className="muted-heading">to make things happen.</span></h2><div className="skill-list">{skills.map((skill, index) => <div className="skill-item" key={skill}><span className="skill-index">0{index + 1}</span><span>{skill}</span><span className="skill-arrow">↗</span></div>)}</div></div>
        </section>

        <section id="projects" className="content-section section-wrap">
          <div className="section-kicker">03 / SELECTED WORK</div><div className="section-heading-row"><h2>Projects in progress<span className="gradient-text">.</span></h2><span className="coming-soon">A few things I’ve been making</span></div>
          <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-top"><span>{project.type}</span><span>{project.number}</span></div><div className="project-art"><span className="project-art-mark">{project.number === "01" ? "↗" : "✳"}</span><span className="project-art-label">A WORK IN PROGRESS</span></div><h3>{project.title}</h3><p>{project.text}</p><div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div>
        </section>

        <section id="experience" className="content-section section-wrap section-tinted">
          <div className="section-kicker">04 / THE JOURNEY</div><div className="section-grid"><h2>Learning as<br /><span className="muted-heading">I go.</span></h2><div className="experience-card"><span className="experience-mark">✳</span><div><span className="experience-date">PRESENT</span><h3>Software Engineering Student</h3><p>Building a strong foundation in software development, one project and lesson at a time.</p></div></div></div>
        </section>

        <section id="blog" className="blog-strip section-wrap"><div><div className="section-kicker">05 / NOTES & IDEAS</div><h2>Blog <span className="muted-heading">coming soon.</span></h2></div><p>When I have something worth sharing, you’ll find it here.</p></section>

        <section id="contact" className="contact-section section-wrap"><div className="section-kicker">06 / SAY HELLO</div><h2>Have an idea?<br /><span className="gradient-text">Let’s make it real.</span></h2><p>Open to opportunities, interesting projects, and good conversations.</p><a className="button button-light" href="mailto:hello@neerajsalve.dev">Get in touch <span aria-hidden="true">↗</span></a><div className="contact-decoration" aria-hidden="true">✳</div></section>
      </main>
      <footer className="site-footer section-wrap"><a className="brand footer-brand" href="#home"><span className="brand-mark">n<span>.</span></span><span>Neeraj Salve</span></a><span>Designed with curiosity. Built with care.</span><a href="#home" className="back-top">Back to top ↑</a></footer>
    </>
  );
}

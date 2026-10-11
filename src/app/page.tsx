import SiteHeader from "@/components/site-header";
import ExperienceTimeline, { ExperienceIcon, type ExperienceItem } from "@/components/experience-entry";
import ContactForm from "@/components/contact-form";
import MotionObserver from "@/components/motion-observer";
import CurrentYear from "@/components/current-year";
import BrandIcon from "@/components/brand-icon";
import Image from "next/image";

const emailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=neerajsalve01%40gmail.com";

const skillCategories = [
  { title: "Programming Languages", skills: ["Java", "Python", "C++", "C", "JavaScript"] },
  { title: "Web Development", skills: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "MERN Stack", "TypeScript", "Next.js", "Tailwind CSS"] },
  { title: "Core Computer Science", skills: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems", "Problem Solving"] },
  { title: "Tools & Platforms", skills: ["Git", "GitHub", "MySQL", "Android Studio"] },
  { title: "Generative AI & Agentic AI", skills: ["Generative AI (GenAI)", "Large Language Models (LLMs)", "Prompt Engineering", "AI Agents & Agentic AI"] },
];

const professionalExperience: ExperienceItem[] = [
  {
    date: "May 2026",
    title: "Data Analytics Virtual Intern",
    organization: "Deloitte",
    description: "Analyzed data in a forensic technology simulation, designing an interactive Tableau dashboard to identify patterns and using Excel to classify data and form conclusions.",
    icon: "analytics",
    tags: ["Tableau", "Excel", "Data analysis"],
  },
  {
    date: "June–July 2022",
    title: "Android Development Intern",
    organization: "UEF Pvt. Ltd.",
    description: "Built a College Management Android application using Java and Android Studio.",
    icon: "android",
    tags: ["Java", "Android Studio"],
  },
  {
    date: "January 2020–May 2021",
    title: "Apprentice",
    organization: "ASB International Pvt. Japan Ltd.",
    description: "Worked in an industrial environment, applying Kaizen-oriented process discipline, teamwork, quality, and problem-solving.",
    icon: "industry",
  },
];

const leadershipExperience: ExperienceItem[] = [
  {
    title: "Placement Coordinator",
    organization: "TPO, SCOE",
    description: "Coordinated placement activities for 500+ students and facilitated communication between students, the placement cell, and recruiters. Supported recruitment drives, pre-placement talks, and aptitude sessions.",
    icon: "coordination",
    tags: ["Coordination", "Communication"],
  },
  {
    date: "2025–2026",
    title: "Social Media Head",
    organization: "JNT, AISA, SCOE",
    description: "Led a seven-member team for digital marketing initiatives.",
    icon: "social",
    tags: ["Team Leadership", "Team Coordination"],
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <MotionObserver />
      <main>
        <section id="home" className="hero-shell section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> SOFTWARE DEVELOPER <span className="eyebrow-divider">·</span> JAVA · DSA · FULL-STACK</div>
            <h1>From problem solving<br />to <span className="gradient-text">building for the web.</span></h1>
            <p className="hero-description">I’m <strong>Neeraj Salve</strong>, a software developer focused on Java, data structures and algorithms, and full-stack development. I enjoy breaking down problems and building practical web experiences.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View Projects <span aria-hidden="true">↗</span></a>
              <a className="button button-secondary resume-button" href="/Neeraj_Salve_Resume.pdf" download="Neeraj_Salve_Resume.pdf">Download Resume <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" href="#contact">Contact Me <span aria-hidden="true">↗</span></a>
            </div>
            <div className="social-links" aria-label="Social links">
              <a href="https://github.com/NeerajSalve2002" target="_blank" rel="noopener noreferrer"><BrandIcon name="github" className="brand-icon-inline" />GitHub <span aria-hidden="true">↗</span></a>
              <a href="https://www.linkedin.com/in/neerajsalve01/" target="_blank" rel="noopener noreferrer"><BrandIcon name="linkedin" className="brand-icon-inline" />LinkedIn <span aria-hidden="true">↗</span></a>
              <a href={emailComposeUrl} target="_blank" rel="noopener noreferrer"><BrandIcon name="gmail" className="brand-icon-inline brand-icon-gmail" />Email <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Portrait of Neeraj Salve">
            <div className="hero-photo-orbits" aria-hidden="true">
              <span className="hero-orbit hero-orbit-one" />
              <span className="hero-orbit hero-orbit-two" />
              <span className="hero-sparkle hero-sparkle-one">✦</span>
              <span className="hero-sparkle hero-sparkle-two">✧</span>
              <span className="hero-sparkle hero-sparkle-three">✦</span>
            </div>
            <div className="visual-card profile-photo-card">
              <div className="profile-photo-window">
                <Image
                  className="profile-photo-image"
                  src="/images/neeraj-profile.jpg"
                  alt="Portrait of Neeraj Salve"
                  fill
                  sizes="(max-width: 720px) 203px, 238px"
                  unoptimized
                  priority
                />
              </div>
            </div>
            <div className="hero-status-badge hero-status-open">
              <span className="hero-badge-icon" aria-hidden="true">↗</span>
              <span>Open to opportunities</span>
              <span className="hero-badge-dot" aria-label="Available" />
            </div>
            <div className="hero-status-badge hero-status-learning">
              <span className="hero-badge-icon" aria-hidden="true">✳</span>
              <span>Currently learning</span>
              <span className="hero-badge-dot" aria-hidden="true" />
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
        </section>

        <section id="about" className="content-section section-wrap">
          <div className="section-kicker" data-scroll-reveal>01 / A LITTLE ABOUT ME</div>
          <div className="section-grid" data-scroll-reveal><h2>Curious by nature.<br /><span className="muted-heading">Builder by choice.</span></h2><div className="section-copy"><p>I’m a software engineering student exploring the craft of building for the web — from the first sketch to the last line of code. I care about clear thinking, good details, and making technology feel a little more human.</p><p>This is the beginning of my portfolio. More of my story, work, and learning journey will find a home here soon.</p><a className="text-link" href={emailComposeUrl} target="_blank" rel="noopener noreferrer"><BrandIcon name="gmail" className="brand-icon-inline brand-icon-gmail" />Let’s connect <span>↗</span></a></div></div>
        </section>

        <section id="skills" className="content-section section-wrap section-tinted">
          <div className="section-kicker" data-scroll-reveal>02 / MY TOOLKIT</div>
          <div className="section-grid skills-grid">
            <h2 data-scroll-reveal>Technologies I use<br /><span className="muted-heading">to <span className="skills-heading-gradient">build things</span>.</span></h2>
            <div className="skill-categories">
              {skillCategories.map((category, index) => (
                <section className="skill-category" data-scroll-reveal data-reveal-order={index} key={category.title} aria-labelledby={`skill-category-${index}`}>
                  <h3 id={`skill-category-${index}`}>{category.title}</h3>
                  <ul className="skill-chips">
                    {category.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="content-section section-wrap">
          <div className="section-kicker" data-scroll-reveal>03 / SELECTED WORK</div><div className="section-heading-row" data-scroll-reveal><h2>Projects in progress<span className="gradient-text">.</span></h2></div>
          <p className="projects-empty" data-scroll-reveal>Something new is in the works. Check back soon.</p>
        </section>

        <section id="experience" className="content-section section-wrap section-tinted experience-section">
          <div className="section-kicker" data-scroll-reveal>04 / EXPERIENCE &amp; LEADERSHIP</div>
          <div className="experience-heading" data-scroll-reveal>
            <h2>Work shaped by<br /><span className="muted-heading">curiosity and people.</span></h2>
            <p>Technical experience, industry learning, and campus leadership—alongside a separate, ongoing software engineering journey.</p>
          </div>
          <ExperienceTimeline professionalItems={professionalExperience} leadershipItems={leadershipExperience} />
          <article className="experience-journey" data-scroll-reveal>
            <span className="journey-icon"><ExperienceIcon name="learning" /></span>
            <div className="journey-copy">
              <span className="journey-status">CURRENT JOURNEY</span>
              <h3>Software Engineering Student</h3>
              <p>Focused on Java, data structures and algorithms, and full-stack development—strengthening problem-solving foundations while building practical web experiences.</p>
            </div>
            <span className="journey-accent" aria-hidden="true">✳</span>
          </article>
        </section>

        <section id="blog" className="blog-strip section-wrap"><div data-scroll-reveal><div className="section-kicker">05 / NOTES & IDEAS</div><h2>Blog <span className="muted-heading">coming soon.</span></h2></div><p data-scroll-reveal>When I have something worth sharing, you’ll find it here.</p></section>

        <section id="contact" className="contact-section section-wrap">
          <div className="section-kicker" data-scroll-reveal>06 / SAY HELLO</div>
          <div className="contact-layout">
            <div className="contact-copy" data-scroll-reveal>
              <h2>Let’s build<br /><span className="gradient-text">something meaningful.</span></h2>
              <p>I’m open to conversations with recruiters, engineering teams, and collaborators. If you’d like to connect, reach me through any of the links below.</p>
              <div className="contact-methods" aria-label="Contact links">
                <a className="contact-method" href={emailComposeUrl} target="_blank" rel="noopener noreferrer">
                  <span className="contact-method-icon"><BrandIcon name="gmail" /></span>
                  <span className="contact-method-copy"><span>Email</span><strong>neerajsalve01@gmail.com</strong></span>
                  <span className="contact-method-arrow" aria-hidden="true">↗</span>
                </a>
                <a className="contact-method" href="https://www.linkedin.com/in/neerajsalve01/" target="_blank" rel="noopener noreferrer">
                  <span className="contact-method-icon"><BrandIcon name="linkedin" /></span>
                  <span className="contact-method-copy"><span>LinkedIn</span><strong>Connect with me</strong></span>
                  <span className="contact-method-arrow" aria-hidden="true">↗</span>
                </a>
                <a className="contact-method" href="https://github.com/NeerajSalve2002" target="_blank" rel="noopener noreferrer">
                  <span className="contact-method-icon"><BrandIcon name="github" /></span>
                  <span className="contact-method-copy"><span>GitHub</span><strong>View my profile</strong></span>
                  <span className="contact-method-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="contact-form-panel" data-scroll-reveal>
              <div className="contact-form-heading"><span>HAVE A QUESTION?</span><h3>Send a note</h3></div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <div className="footer-main">
          <div className="footer-copy">
            <span className="section-kicker">KEEP IN TOUCH</span>
            <h2>Have something in mind?<br /><span className="footer-gradient">Let’s connect.</span></h2>
          </div>
          <nav className="footer-socials" aria-label="Contact and social links">
            <a href="https://github.com/NeerajSalve2002" target="_blank" rel="noopener noreferrer"><BrandIcon name="github" className="brand-icon-inline" />GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://www.linkedin.com/in/neerajsalve01/" target="_blank" rel="noopener noreferrer"><BrandIcon name="linkedin" className="brand-icon-inline" />LinkedIn <span aria-hidden="true">↗</span></a>
            <a href={emailComposeUrl} target="_blank" rel="noopener noreferrer"><BrandIcon name="gmail" className="brand-icon-inline brand-icon-gmail" />Email <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <a className="brand footer-brand" href="#home" aria-label="Neeraj Salve home"><span className="brand-mark">n<span>.</span></span><span>Neeraj Salve</span></a>
          <span className="footer-tagline">Designed with curiosity. Built with care.</span>
          <span className="footer-copyright">© <CurrentYear /> Neeraj Salve</span>
          <a href="#home" className="back-top" aria-label="Back to top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}

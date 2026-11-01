import { useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import "./filmography/contactFooter.css";

// End-credits style contact footer — the smallest possible contact section.
// Reachable directly, and via the "LET'S MAKE SOMETHING HAPPEN" cue in The Filmography.
export default function ContactFooter({ contact }) {
  useEffect(() => {
    // keep component mounted lifecycle minimal — no-op for now
  }, []);

  const c = contact || {
    email: "harshal.v.official@gmail.com",
    linkedin: "https://www.linkedin.com/in/harshal-vhatkar-372955258",
    github: "https://github.com/HarVkr/",
  };

  return (
    <footer className="cf-section" id="contact" data-testid="contact-footer">
      <p className="cf-eyebrow">Final credits</p>
      <p className="cf-wordmark">
        H<span className="cf-accent">.</span>
      </p>
      <p className="cf-tagline">A Mind Without a Genre</p>

      <nav className="cf-links" aria-label="Contact links">
        <a
          className="cf-link"
          href={`mailto:${c.email}`}
          data-testid="contact-email"
          data-cursor-hover
        >
          <Mail className="cf-link-icon" aria-hidden="true" />
          <span>{c.email}</span>
        </a>
        <span className="cf-dot" aria-hidden="true" />
        <a
          className="cf-link"
          href={c.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="contact-linkedin"
          data-cursor-hover
        >
          <Linkedin className="cf-link-icon" aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
        <span className="cf-dot" aria-hidden="true" />
        <a
          className="cf-link"
          href={c.github}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="contact-github"
          data-cursor-hover
        >
          <Github className="cf-link-icon" aria-hidden="true" />
          <span>GitHub</span>
        </a>
      </nav>

      <p className="cf-copyright">© 2026 Harshal Vhatkar</p>
    </footer>
  );
}
                
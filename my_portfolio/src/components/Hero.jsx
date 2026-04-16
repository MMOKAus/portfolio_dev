export default function Hero() {
    return (
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">QA · UX · Front-End</p>
            <h1>Olga Kozlovskaia</h1>
            <p className="hero-lead">
              I build thoughtful digital experiences with a sharp eye for quality,
              usability, and clean front-end presentation.
            </p>
  
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href="#contact" className="btn btn-secondary">Contact Me</a>
            </div>
          </div>
  
          <div className="hero-art">
            <div className="arch-card">
              <div className="arch-inner">
                <div className="sun"></div>
                <span className="initials">OK</span>
                <div className="wave wave-one"></div>
                <div className="wave wave-two"></div>
                <div className="wave wave-three"></div>
                <span className="arch-label">qa · ux · front-end</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
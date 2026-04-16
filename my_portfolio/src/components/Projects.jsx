import projects from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-tag">Projects</p>
        <h2>Selected Work</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className={`project-card ${project.accent}`}>
              <div className="project-top"></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="text-link">
                      Live Demo
                    </a>
  )}
                {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-link secondary">
                      GitHub
                    </a>
  )}
        </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
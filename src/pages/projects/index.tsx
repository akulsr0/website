import * as React from "react";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Head from "../../components/_head";

import defaults from "../../constants/default.json";

const { projects } = defaults;

interface ProjectItemProps {
  project: {
    title: string;
    description: string;
    links?: string[][];
    tags?: string[];
  };
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <div style={{ marginTop: 32 }}>
      <h3 style={{ margin: 0 }}>{project.title}</h3>
      {project.tags && (
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0" }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: "#f0f0f0",
                color: "#333",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <p style={{ margin: "8px 0" }}>{project.description}</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {project.links?.map(([label, url]) => (
          <a
            key={label + url}
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline", marginRight: 8 }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <Container>
      <Head
        title="Projects"
        metaDescription="You can find the links to my projects here."
      />
      <Header />
      <main className="main-content">
        <h2>Projects</h2>

        <div>
          {projects?.map((project) => (
            <ProjectItem key={project.title} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export default Projects;

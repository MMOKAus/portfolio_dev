import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  forceSimulation,
  forceCollide,
  forceManyBody,
  forceX,
  forceY,
} from "d3-force";

const SKILLS = [
  { id: 1, name: "JavaScript", size: "md", color: "seafoam" },
  { id: 2, name: "Accessibility", size: "xl", color: "mist" },
  { id: 3, name: "Tailwind", size: "sm", color: "seafoam" },
  { id: 4, name: "Django", size: "md", color: "surf" },
  { id: 5, name: "Testing", size: "md", color: "cream" },
  { id: 6, name: "GitHub", size: "sm", color: "sunset" },
  { id: 7, name: "React", size: "md", color: "surf" },
  { id: 8, name: "PostgreSQL", size: "lg", color: "seafoam" },
  { id: 9, name: "REST APIs", size: "sm", color: "sunset" },
  { id: 10, name: "CSS", size: "md", color: "cream" },
  { id: 11, name: "Figma", size: "sm", color: "mist" },
];

const SIZE_MAP = {
  sm: 36,
  md: 50,
  lg: 66,
  xl: 78,
};

const CLUSTER_WIDTH = 560;
const CLUSTER_HEIGHT = 520;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function About() {
  const containerRef = useRef(null);
  const simulationRef = useRef(null);
  const [nodes, setNodes] = useState([]);

  const initialNodes = useMemo(() => {
    return SKILLS.map((skill, index) => ({
      ...skill,
      radius: SIZE_MAP[skill.size],
      x: CLUSTER_WIDTH / 2 + Math.cos(index * 0.8) * 18,
      y: CLUSTER_HEIGHT / 2 + Math.sin(index * 0.8) * 18,
      vx: 0,
      vy: 0,
    }));
  }, []);

  useEffect(() => {
    const simNodes = initialNodes.map((node) => ({ ...node }));

    const simulation = forceSimulation(simNodes)
      .force("charge", forceManyBody().strength(1))
      .force("collide", forceCollide().radius((d) => d.radius + 4).iterations(4))
      .force("x", forceX(CLUSTER_WIDTH / 2).strength(0.08))
      .force("y", forceY(CLUSTER_HEIGHT / 2).strength(0.08))
      .alpha(1)
      .alphaDecay(0.02)
      .velocityDecay(0.28) 
      .on("tick", () => {
        simNodes.forEach((node) => {
          node.x = clamp(node.x, node.radius, CLUSTER_WIDTH - node.radius);
          node.y = clamp(node.y, node.radius, CLUSTER_HEIGHT - node.radius);
        });

        setNodes(simNodes.map((node) => ({ ...node })));
      });

    simulationRef.current = simulation;
    setNodes(simNodes.map((node) => ({ ...node })));

    return () => {
      simulation.stop();
    };
  }, [initialNodes]);

  const handleDragStart = (id) => {
    const simulation = simulationRef.current;
    if (!simulation) return;

    const dragged = simulation.nodes().find((node) => node.id === id);
    if (!dragged) return;

    dragged.fx = dragged.x;
    dragged.fy = dragged.y;

    simulation.alphaTarget(0.2).restart();
  };

  const handleDrag = (id, info) => {
    const simulation = simulationRef.current;
    const container = containerRef.current;
    if (!simulation || !container) return;

    const rect = container.getBoundingClientRect();
    const dragged = simulation.nodes().find((node) => node.id === id);
    if (!dragged) return;

    const nextX = clamp(
      info.point.x - rect.left,
      dragged.radius,
      CLUSTER_WIDTH - dragged.radius
    );

    const nextY = clamp(
      info.point.y - rect.top,
      dragged.radius,
      CLUSTER_HEIGHT - dragged.radius
    );

    dragged.fx = nextX;
    dragged.fy = nextY;

    simulation.alphaTarget(0.28).restart();
  };

  const handleDragEnd = (id) => {
    const simulation = simulationRef.current;
    if (!simulation) return;

    const dragged = simulation.nodes().find((node) => node.id === id);
    if (!dragged) return;

    dragged.fx = null;
    dragged.fy = null;

    simulation.alphaTarget(0);
  };

  return (
    <section id="about" className="section">
      <div className="container about-showcase">
        <div className="about-copy">
          <p className="section-tag">About</p>
          <h2>Thoughtful interfaces, tested properly.</h2>

          <p className="section-copy">
            I enjoy creating digital experiences that feel clear, useful, and
            intuitive. My background in QA sharpened my attention to detail,
            while front-end development lets me turn ideas into interfaces that
            actually work for real people.
          </p>

          <p className="section-copy">
            I’m especially interested in responsive UI, usability, accessibility,
            and building products that feel polished rather than patched together.<br />
            Feel free to drag and move the bubbles around :)
          </p>

          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
        </div>

        <div className="bubble-cluster-wrap">
          <div
            ref={containerRef}
            className="bubble-cluster bubble-cluster--physics"
          >
            {nodes.map((skill) => (
              <motion.button
                key={skill.id}
                type="button"
                drag
                dragMomentum={false}
                dragElastic={0}
                onDragStart={() => handleDragStart(skill.id)}
                onDrag={(_, info) => handleDrag(skill.id, info)}
                onDragEnd={() => handleDragEnd(skill.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  x: skill.x - skill.radius,
                  y: skill.y - skill.radius,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 24,
                  mass: 0.8,
                }}
                className={`skill-orb ${skill.size} ${skill.color}`}
                style={{
                  width: skill.radius * 2,
                  height: skill.radius * 2,
                }}
              >
                <span>{skill.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import {
  ExternalLink,
  Lightbulb,
  Code2,
  Sprout,
  Map,
} from "lucide-react";
import { useState } from "react";

type Status = "in progress" | "idea" | "completed";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: Status;
  icon: typeof Lightbulb;
  image: string;
  imageAlt: string;
  video?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Tiny Footprint",
    description:
      "A simple app that helps users track and categorize the waste they produce each day, such as cardboard, plastic, or compostable materials. By logging their habits, users can see how much waste or energy they’ve saved over time and visualize their digital footprint. It encourages small, daily actions that add up to a meaningful environmental impact.",
    tags: [
      "ecology",
      "community",
      "climate",
      "education",
      "HTML/CSS",
    ],
    status: "completed",
    icon: Map,
    image: "",
    imageAlt: "image of app",
    video: "/videos/tiny-footprint-demo.mp4",
  },
  {
    id: 2,
    title: "Crawly Collection",
    description:
      "Showcase of different bugs and some of their roles in our day to day lives with a dragable screen that allows you to interact on a different level with the website.",
    tags: ["illustration", "botany", "education", "HTML/CSS"],
    status: "in progress",
    icon: Lightbulb,
    image: "",
    imageAlt:
      "Gif of the crawly collection front page dragging",
    video: "/videos/crawly-demo.mp4",
  },
  {
    id: 3,
    title: "Zero-Waste Vida",
    description:
      "A website that shows how to live a more sustainable life as I was thought in my hispanic household. Combining this idea with Tiny Footprint.",
    tags: ["climate", "education", "design"],
    status: "idea",
    icon: Sprout,
    image: "/images/zerowaste.png",
    imageAlt: "Cute doodle",
  },
  {
    id: 4,
    title: "Sketchbook to Portfolio Converter",
    description:
      "A mobile progressive web app that lets users photograph sketchbook pages, clean them up, and auto-arrange them into a polished shareable portfolio, no Photoshop required.",
    tags: ["illustration", "PWA", "mobile", "creative tools"],
    status: "idea",
    icon: Code2,
    image: "/images/sketchbook.png",
    imageAlt: "Sketchbook drawing",
  },
];

const statusColors: Record<
  Status,
  { bg: string; text: string; label: string }
> = {
  "in progress": {
    bg: "#d6e8c4",
    text: "#1a3009",
    label: "In Progress",
  },
  idea: { bg: "#fde8d0", text: "#7a2e0a", label: "Idea" },
  completed: {
    bg: "#d0e8f0",
    text: "#0a3a4a",
    label: "Completed",
  },
};

const allTags = [
  "all",
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="min-h-screen pt-24 pb-32"
    >
      <section className="max-w-5xl mx-auto px-8 pt-12">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "var(--accent)",
            marginBottom: "0.5rem",
          }}
        >
          WHAT I'M BUILDING
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            lineHeight: 1.15,
            color: "var(--primary)",
            marginBottom: "1rem",
          }}
        >
          Projects &amp; Ideas
        </h1>
        <p
          style={{
            color: "var(--muted-foreground)",
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          A mix of things I've done, building, and
          seeds of ideas I haven't found time for yet. All
          rooted in art, ecology, or both.
        </p>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                padding: "0.3rem 0.75rem",
                borderRadius: "999px",
                border: "1px solid",
                borderColor:
                  activeFilter === tag
                    ? "var(--primary)"
                    : "var(--border)",
                background:
                  activeFilter === tag
                    ? "var(--primary)"
                    : "transparent",
                color:
                  activeFilter === tag
                    ? "var(--primary-foreground)"
                    : "var(--muted-foreground)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project) => {
            const Icon = project.icon;
            const statusStyle = statusColors[project.status];
            return (
              <article
                key={project.id}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLElement
                  ).style.transform = "translateY(-4px)";
                  (
                    e.currentTarget as HTMLElement
                  ).style.boxShadow =
                    "0 12px 32px rgba(44,32,21,0.12)";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLElement
                  ).style.transform = "translateY(0)";
                  (
                    e.currentTarget as HTMLElement
                  ).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    height: "180px",
                    overflow: "hidden",
                    background: "var(--muted)",
                  }}
                >
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  )}
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Icon
                        size={16}
                        style={{
                          color: "var(--accent)",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <h2
                        style={{
                          fontFamily:
                            "'Playfair Display', serif",
                          fontSize: "1.2rem",
                          color: "var(--foreground)",
                        }}
                      >
                        {project.title}
                      </h2>
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        background: statusStyle.bg,
                        color: statusStyle.text,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {statusStyle.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      color: "var(--muted-foreground)",
                      marginBottom: "1.2rem",
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.06em",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "4px",
                          background: "var(--muted)",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
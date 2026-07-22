import {
  Download,
  GraduationCap,
  Users,
  Wrench,
  Code2,
} from "lucide-react";

const education = [
  {
    degree: "B.S. Computer Science & Mathematics",
    institution: "Vanderbilt University — Nashville, TN",
    year: "Expected May 2028",
    note: "QuestBridge Recipient · Minor: Earth and Environmental Sciences",
    courses: [
      "Algorithms",
      "Statistics",
      "Intro to C++",
      "Discrete Structures",
      "Data Structures",
      "Intro to Java",
      "Linear Algebra",
    ],
  },
  {
    degree: "High School Diploma",
    institution: "Eastwood Academy — Houston, TX",
    year: "Jun 2024",
    note: "STEM-focused magnet school",
    courses: [],
  },
];

const leadership = [
  {
    role: "VUceptor (Peer Mentor)",
    org: "Vanderbilt University",
    period: "Mar 2025 – Present",
    bullets: [
      "Mentored 15+ first-year students through their academic and personal transition to college, serving as a trusted resource throughout the semester.",
      "Led and planned weekly discussions, community-building activities, and a semester-long orientation program designed to foster belonging and student success alongside a Vanderbilt faculty member.",
    ],
  },
  {
    role: "Sophomore Liaison",
    org: "FirstVU at Vanderbilt University",
    period: "Feb 2026 – Apr 2025",
    bullets: [
      "Planned and promoted community-building events for first-generation students, helping create opportunities for connection.",
      "Collaborated with executive board members to support FirstVU initiatives and strengthen the first-generation student community.",
    ],
  },
  {
    role: "Team Lead (Oct 2024–Apr 2025) · Lab Assistant (Sep 2025–Dec 2025)",
    org: "Vanderbilt Students Volunteers for Science (VSVS)",
    period: "Oct 2024 – Dec 2025",
    bullets: [
      "Led weekly hands-on science lessons for elementary and middle school students as part of a 3–4-member teaching team.",
      "Coordinated lesson materials, prepared volunteer kits, and maintained cost spreadsheets to support weekly classroom visits.",
      "Promoted STEM accessibility by creating engaging learning experiences for students in underserved Nashville-area schools.",
    ],
  },
  {
    role: "Scholar",
    org: "HeadStart Fellowship",
    period: "Sep 2025 – Dec 2025",
    bullets: [
      "Engaged in bi-weekly online sessions focused on preparing for pre-professional tech careers, including resume workshops and technical interview practice.",
      "Networked with industry professionals from leading tech firms and recent grads to gain insights into software engineering roles.",
    ],
  },
];

const projects = [
  {
    name: "Tiny Footprint",
    status: "In Progress",
    stack: "HTML, CSS, JavaScript",
    period: "Oct 2025 – Present",
    bullets: [
      "Developing a sustainability-focused web application that allows users to track and categorize daily waste production, including recyclable, compostable, and landfill materials.",
      "Strengthening front-end development skills through responsive design, user interface development, and data organization.",
    ],
  },
  {
    name: "Crawly Collection",
    status: "In Progress",
    stack: "HTML, CSS",
    period: "May 2026 – Present",
    bullets: [
      "Building an interactive educational website highlighting insects and their ecological importance through custom illustrations and engaging content, implementing a draggable interface for a more interactive and accessible learning experience.",
      "Expanding knowledge of web development, user experience design, and creative approaches to science communication.",
    ],
  },
  {
    name: "Urban Heat Island Effect in Texas",
    status: "Independent Research Project",
    stack: "Microsoft Excel",
    period: "Feb 2025 – May 2025",
    bullets: [
      "Collected and organized over 100 years of historical temperature data across Texas counties to investigate the Urban Heat Island Effect, building a structured database comparing large counties, smaller counties adjacent to urban areas, and rural counties.",
      "Analyzed long-term temperature trends and created graphs to visualize differences in warming patterns and the influence of urbanization.",
      "Designed a research poster summarizing the project's findings and presented the research at a symposium-style showcase.",
    ],
  },
];

const skills = [
  {
    category: "Languages",
    items: ["English (Native)", "Spanish (Native)"],
  },
  {
    category: "Programming & Software",
    items: [
      "Java",
      "Python",
      "C++",
      "HTML/CSS",
      "Microsoft Office",
      "Git/GitHub",
      "AutoCAD",
      "Canva",
    ],
  },
  {
    category: "Activities",
    items: [
      "Tutoring & Mentorship",
      "Vanderbilt Ballet Folklórico",
      "Girls Who Code Summer Alum",
    ],
  },
];

export function ResumePage() {
  return (
    <div
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="min-h-screen pt-24 pb-32"
    >
      <div className="max-w-5xl mx-auto px-8 pt-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-6 flex-wrap">
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                color: "var(--accent)",
                marginBottom: "0.5rem",
              }}
            >
              RÉSUMÉ
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.15,
                color: "var(--primary)",
              }}
            >
              Adamaris Rodriguez
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginTop: "0.6rem",
              }}
            >
              {[
                {
                  label: "adamarisrodriguez465@gmail.com",
                  href: "mailto:adamarisrodriguez465@gmail.com",
                },
                {
                  label: "linkedin.com/in/adamaris-rodriguez",
                  href: "https://linkedin.com/in/adamaris-rodriguez/",
                },
                {
                  label: "github.com/adamax-bones",
                  href: "https://github.com/adamax-bones",
                },
                {
                  label: "713-576-9599",
                  href: "tel:7135769599",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--muted-foreground)",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    ((
                      e.currentTarget as HTMLElement
                    ).style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    ((
                      e.currentTarget as HTMLElement
                    ).style.color = "var(--muted-foreground)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <a
            href="/resume.pdf"
            download="Adamaris_Rodriguez_Resume.pdf"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              textDecoration: "none",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.9rem",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity =
                "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity =
                "1")
            }
          >
            <Download size={15} />
            Download PDF
          </a>
        </div>

        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--muted-foreground)",
            marginBottom: "2.5rem",
            fontStyle: "italic",
          }}
        >
          PDF is the most current version — this page will stay
          up to date as the résumé evolves.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Education */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap
                  size={16}
                  style={{ color: "var(--accent)" }}
                />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    color: "var(--foreground)",
                  }}
                >
                  Education
                </h2>
              </div>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.75rem",
                      padding: "1.25rem 1.5rem",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3
                          style={{
                            fontFamily:
                              "'Playfair Display', serif",
                            fontSize: "1rem",
                            color: "var(--foreground)",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {edu.degree}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--accent)",
                          }}
                        >
                          {edu.institution}
                        </p>
                        <p
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--muted-foreground)",
                            marginTop: "0.2rem",
                          }}
                        >
                          {edu.note}
                        </p>
                        {edu.courses.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "5px",
                              marginTop: "0.75rem",
                            }}
                          >
                            {edu.courses.map((c) => (
                              <span
                                key={c}
                                style={{
                                  fontFamily:
                                    "'DM Mono', monospace",
                                  fontSize: "0.65rem",
                                  padding: "0.2rem 0.5rem",
                                  borderRadius: "4px",
                                  background:
                                    "var(--secondary)",
                                  color: "var(--primary)",
                                }}
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.72rem",
                          color: "var(--muted-foreground)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Leadership */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Users
                  size={16}
                  style={{ color: "var(--accent)" }}
                />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    color: "var(--foreground)",
                  }}
                >
                  Leadership &amp; Involvement
                </h2>
              </div>
              <div className="space-y-7">
                {leadership.map((item) => (
                  <div
                    key={item.role + item.org}
                    style={{
                      paddingLeft: "1.25rem",
                      borderLeft: "2px solid var(--secondary)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3
                          style={{
                            fontFamily:
                              "'Playfair Display', serif",
                            fontSize: "1.02rem",
                            color: "var(--foreground)",
                            marginBottom: "0.1rem",
                          }}
                        >
                          {item.role}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--accent)",
                            marginBottom: "0.6rem",
                          }}
                        >
                          {item.org}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.7rem",
                          color: "var(--muted-foreground)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {item.bullets.map((b, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: "0.88rem",
                            lineHeight: 1.7,
                            color: "var(--muted-foreground)",
                            paddingLeft: "1rem",
                            position: "relative",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0.62em",
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: "var(--accent)",
                            }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Code2
                  size={16}
                  style={{ color: "var(--accent)" }}
                />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    color: "var(--foreground)",
                  }}
                >
                  Projects
                </h2>
              </div>
              <div className="space-y-7">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    style={{
                      paddingLeft: "1.25rem",
                      borderLeft: "2px solid var(--secondary)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.02rem",
                            color: "var(--foreground)",
                            marginBottom: "0.1rem",
                          }}
                        >
                          {project.name}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--accent)",
                            marginBottom: "0.6rem",
                          }}
                        >
                          {project.status} · {project.stack}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.7rem",
                          color: "var(--muted-foreground)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {project.period}
                      </span>
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {project.bullets.map((b, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: "0.88rem",
                            lineHeight: 1.7,
                            color: "var(--muted-foreground)",
                            paddingLeft: "1rem",
                            position: "relative",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0.62em",
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: "var(--accent)",
                            }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar — Skills */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 mb-2">
              <Wrench
                size={15}
                style={{ color: "var(--accent)" }}
              />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  color: "var(--foreground)",
                }}
              >
                Skills
              </h2>
            </div>
            {skills.map((group) => (
              <div key={group.category}>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    color: "var(--muted-foreground)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {group.category.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontSize: "0.82rem",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "999px",
                        border: "1px solid var(--border)",
                        background: "var(--card)",
                        color: "var(--foreground)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Awards callout */}
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem 1.1rem",
                borderRadius: "0.75rem",
                background: "var(--secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  color: "var(--primary)",
                  marginBottom: "0.5rem",
                }}
              >
                RECOGNITION
              </p>
              {[
                "Presidential Volunteer Service Award '24",
                "QuestBridge Scholar",
                "Houston Art Car '24",
                "Girls Who Code Summer Alum",
              ].map((award) => (
                <p
                  key={award}
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--foreground)",
                    lineHeight: 1.8,
                  }}
                >
                  · {award}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
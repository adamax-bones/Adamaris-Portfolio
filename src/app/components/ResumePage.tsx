import {
  Download,
  GraduationCap,
  Users,
  Wrench,
} from "lucide-react";

const education = [
  {
    degree: "B.S. Computer Science & Mathematics",
    institution: "Vanderbilt University — Nashville, TN",
    year: "Expected May 2028",
    note: "QuestBridge Recipient · Minor: Earth and Environmental Sciences",
    courses: [
      "Algorithms",
      "Data Structures",
      "Discrete Structures",
      "Statistics",
      "Intro to C++",
      "Intro to Java",
      "Calculus I–III",
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
      "Mentor 15+ first-year students through academic and personal transitions to college life, serving as a consistent resource for advising and support.",
      "Facilitate group discussions and events as part of a semester-long orientation program to build community among incoming students.",
    ],
  },
  {
    role: "Sophomore Liaison",
    org: "FirstVU at Vanderbilt University",
    period: "Apr 2026 – Feb 2026",
    bullets: [
      "Planned and hosted events serving the FirstVU first-generation student community, with a focus on peer mentorship and belonging.",
    ],
  },
  {
    role: "Scholar",
    org: "HeadStart Fellowship",
    period: "Sep 2025 – Dec 2025",
    bullets: [
      "Participated in bi-weekly sessions on pre-professional tech career preparation, including resume workshops and technical interview practice.",
      "Networked with software engineers and professionals from leading tech firms to build industry insight and connections.",
    ],
  },
  {
    role: "Lab Assistant",
    org: "Vanderbilt Students Volunteers for Science (VSVS)",
    period: "Sep 2025 – Dec 2025",
    bullets: [
      "Prepared 20+ volunteer kits and maintained cost analysis spreadsheets, ensuring all materials were accurate and deployment-ready for weekly school visits.",
      "Streamlined inventory management processes, reducing preparation time for volunteer kit assembly.",
    ],
  },
  {
    role: "Team Lead",
    org: "Vanderbilt Students Volunteers for Science (VSVS)",
    period: "Oct 2024 – Apr 2025",
    bullets: [
      "Led a 3–4 member team delivering weekly hands-on science lessons to elementary and middle school students in under-resourced Nashville schools.",
      "Developed collaborative facilitation skills while making STEM education accessible and engaging for young learners.",
    ],
  },
  {
    role: "President, Art Club",
    org: "Eastwood Academy",
    period: "Sep 2021 – Jun 2024",
    bullets: [
      "Directed the creation of the 2023 Eastwood Art Car, overseeing 40+ hours of collaborative work with a 4-member team.",
      "Spearheaded fundraising initiatives that raised $200+ to support club programming and materials.",
    ],
  },
  {
    role: "Information Manager & Volunteer",
    org: "Humanitarian Society – Eastwood Academy",
    period: "Sep 2021 – Jun 2024",
    bullets: [
      "Earned the Presidential Volunteer Service Award with 200+ hours of documented community service.",
      "Organized and mobilized peers for community service initiatives, coordinating logistics and volunteer outreach.",
    ],
  },
  {
    role: "Alumni Participant",
    org: "Quantum Science Camp – Texas A&M University",
    period: "Jul – Aug 2023",
    bullets: [
      "Completed an intensive curriculum in quantum science fundamentals and delivered a final research presentation to faculty and peers.",
    ],
  },
];

const skills = [
  {
    category: "Languages",
    items: ["Java", "Python", "C++", "HTML", "CSS"],
  },
  {
    category: "Tools & Software",
    items: [
      "Git & GitHub",
      "Microsoft Office",
      "Figma",
      "VS Code",
    ],
  },
  {
    category: "Environmental Focus",
    items: [
      "Earth & Environmental Sciences",
      "Sustainability",
      "STEM Outreach",
    ],
  },
  {
    category: "Other",
    items: [
      "Spanish (Native)",
      "Tutoring & Mentorship",
      "Girls Who Code Alum",
      "Vanderbilt Ballet Folklórico",
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
                  label: "adamaris.rodriguez@vanderbilt.edu",
                  href: "mailto:adamaris.rodriguez@vanderbilt.edu",
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
                "Presidential Volunteer Service Award",
                "QuestBridge Scholar",
                "Girls Who Code Alum",
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
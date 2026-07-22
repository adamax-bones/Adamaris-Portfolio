import { useState } from "react";
import {
  Mail,
  Github,
  Twitter,
  Send,
  CheckCircle,
} from "lucide-react";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="min-h-screen pt-24 pb-32"
    >
      <div className="max-w-5xl mx-auto px-8 pt-12">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "var(--accent)",
            marginBottom: "0.5rem",
          }}
        >
          GET IN TOUCH
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            lineHeight: 1.15,
            color: "var(--primary)",
            marginBottom: "1.5rem",
          }}
        >
          Say hello.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side */}
          <div>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--muted-foreground)",
                marginBottom: "2rem",
              }}
            >
              To contact me and send a nice little note on my
              portfolio!
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--muted-foreground)",
                marginBottom: "3rem",
              }}
            ></p>

            {/* Contact links */}
            <div className="space-y-4">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-3 group"
                style={{
                  color: "var(--foreground)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.5rem",
                    background: "var(--secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Mail
                    size={16}
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Email
                  </p>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--foreground)",
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
                      ).style.color = "var(--foreground)")
                    }
                  >
                    adamaris.rodriguez@vanderbilt.edu
                  </p>
                </div>
              </a>

              <a
                href="https://github.com"
                className="flex items-center gap-3"
                style={{
                  color: "var(--foreground)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.5rem",
                    background: "var(--secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Github
                    size={16}
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    GitHub
                  </p>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--foreground)",
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
                      ).style.color = "var(--foreground)")
                    }
                  >
                    @adamax-bones
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com"
                className="flex items-center gap-3"
                style={{
                  color: "var(--foreground)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.5rem",
                    background: "var(--secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Twitter
                    size={16}
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Twitter / X
                  </p>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--foreground)",
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
                      ).style.color = "var(--foreground)")
                    }
                  >
                    @Adamaris Rodriguez
                  </p>
                </div>
              </a>
            </div>

            {/* Availability */}
            <div
              style={{
                marginTop: "2.5rem",
                padding: "1rem 1.25rem",
                borderRadius: "0.75rem",
                background: "var(--secondary)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#3a8c1e",
                }}
              />
              <span
                style={{
                  fontSize: "0.88rem",
                  color: "var(--primary)",
                }}
              >
                Open to freelance illustration & collaborative
                projects
              </span>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem 2rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  textAlign: "center",
                  gap: "1rem",
                  minHeight: "380px",
                }}
              >
                <CheckCircle
                  size={48}
                  style={{ color: "var(--primary)" }}
                />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    color: "var(--primary)",
                  }}
                >
                  Message sent!
                </h2>
                <p
                  style={{
                    color: "var(--muted-foreground)",
                    maxWidth: "280px",
                    lineHeight: 1.7,
                  }}
                >
                  Thank you for reaching out. I'll get back to
                  you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--muted-foreground)",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {[
                  {
                    key: "name",
                    label: "Your name",
                    type: "text",
                    placeholder: "Jane Smith",
                  },
                  {
                    key: "email",
                    label: "Email address",
                    type: "email",
                    placeholder: "jane@example.com",
                  },
                  {
                    key: "subject",
                    label: "Subject",
                    type: "text",
                    placeholder: "Illustration commission",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--muted-foreground)",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={
                        form[field.key as keyof typeof form]
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [field.key]: e.target.value,
                        })
                      }
                      required
                      style={{
                        width: "100%",
                        padding: "0.7rem 1rem",
                        borderRadius: "0.5rem",
                        border: "1px solid var(--border)",
                        background: "var(--input-background)",
                        color: "var(--foreground)",
                        fontSize: "0.92rem",
                        fontFamily: "'Nunito', sans-serif",
                        outline: "none",
                        transition: "border-color 0.15s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) =>
                        ((
                          e.currentTarget as HTMLInputElement
                        ).style.borderColor = "var(--primary)")
                      }
                      onBlur={(e) =>
                        ((
                          e.currentTarget as HTMLInputElement
                        ).style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                ))}
                <div>
                  <label
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--muted-foreground)",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    required
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "0.7rem 1rem",
                      borderRadius: "0.5rem",
                      border: "1px solid var(--border)",
                      background: "var(--input-background)",
                      color: "var(--foreground)",
                      fontSize: "0.92rem",
                      fontFamily: "'Nunito', sans-serif",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.15s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) =>
                      ((
                        e.currentTarget as HTMLTextAreaElement
                      ).style.borderColor = "var(--primary)")
                    }
                    onBlur={(e) =>
                      ((
                        e.currentTarget as HTMLTextAreaElement
                      ).style.borderColor = "var(--border)")
                    }
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 1.75rem",
                    borderRadius: "0.5rem",
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.95rem",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((
                      e.currentTarget as HTMLElement
                    ).style.opacity = "0.85")
                  }
                  onMouseLeave={(e) =>
                    ((
                      e.currentTarget as HTMLElement
                    ).style.opacity = "1")
                  }
                >
                  <Send size={14} />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
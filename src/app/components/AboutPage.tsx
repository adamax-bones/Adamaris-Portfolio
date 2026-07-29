import {
  Leaf,
  Palette,
  BookOpen,
  Sprout,
  Wind,
  Mountain,
} from "lucide-react";

const hobbies = [
  {
    icon: Palette,
    title: "Drawing & Painting",
    description:
      "Sketchbooks and digital art are my favorite ways to express myself. I always have a sketchbook on me. I especially love drawing portraits and animals. Favorite Artist: Yoshitomo Nara.",
  },
  {
    icon: Sprout,
    title: "Volunteering",
    description:
      "I've always been dedicated to serve back my community in any shape or form. I especially love to volunteer at local parks and help with environmental cleanups.",
  },
  {
    icon: Mountain,
    title: "Hiking",
    description:
      "Love walking in the woods and taking pictures of all the animals and plants I see. Also enjoy taking walks with my dog.",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description:
      "Recently got into reading novels and anything science related. Currently reading: Earthlings.",
  },
  {
    icon: Wind,
    title: "Movies & Shows",
    description:
      "I love watching movies and analyzing them. I enjoy watching anything from animation to horror.",
  },
  {
    icon: Leaf,
    title: "Mexican Folklorico Dancing",
    description:
      "I started dancing folklorico since I was 10 years old. I stopped for a while and recently got back into it in college! I love dancing and performing in front of an audience.",
  },
];

export function AboutPage() {
  return (
    <div
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="min-h-screen pt-24 pb-32"
    >
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-12 pb-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--accent)",
              marginBottom: "1rem",
            }}
          >
            HELLO, I'M ADAMARIS
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
              color: "var(--primary)",
              marginBottom: "1.5rem",
            }}
          >
            Welcome to my
            <em> garden</em>
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--foreground)",
              maxWidth: "480px",
            }}
          >
            I'm a designer and builder with a love for
            sustainability. I combine my skills to learn more
            about how technology can serve the natural world.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--muted-foreground)",
              maxWidth: "480px",
              marginTop: "1rem",
            }}
          >
            This portfolio is meant to be fun. Grab the
            drawing tool in the bottom right and leave your mark
            I love seeing what people add. There are also six
            little bugs wandering around the site. Try dragging
            one into the jar in the corner.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginBottom: "4rem",
          }}
        />
      </div>

      {/* Hobbies & Interests */}
      <section className="max-w-5xl mx-auto px-8">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "var(--accent)",
            marginBottom: "0.5rem",
          }}
        >
          WHAT I CARE ABOUT
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            color: "var(--foreground)",
            marginBottom: "3rem",
          }}
        >
          Hobbies &amp; Interests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby) => {
            const Icon = hobby.icon;
            return (
              <div
                key={hobby.title}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem",
                  padding: "1.75rem",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLDivElement
                  ).style.transform = "translateY(-3px)";
                  (
                    e.currentTarget as HTMLDivElement
                  ).style.boxShadow =
                    "0 8px 24px rgba(44,32,21,0.1)";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLDivElement
                  ).style.transform = "translateY(0)";
                  (
                    e.currentTarget as HTMLDivElement
                  ).style.boxShadow = "none";
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
                    marginBottom: "1rem",
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    color: "var(--foreground)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {hobby.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "var(--muted-foreground)",
                  }}
                >
                  {hobby.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
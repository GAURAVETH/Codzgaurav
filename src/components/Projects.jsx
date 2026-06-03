import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

// --- HELPER COMPONENTS ---

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: "transform 0.1s ease" }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, isLive, href }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <img
        src={src}
        className="absolute left-0 top-0 size-full object-cover object-center"
        alt={title}
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font text-3xl font-bold">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}

        {isLive && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Live</p>
          </a>
        )}
      </div>
    </div>
  );
};

// --- DATA ---

const projects = [
  {
    title: "AI Resume Analyzer",
    image: "img/feature-ai.png",
    desc: "AI-powered resume analysis platform with ATS score, keyword optimization, and skill recommendations.",
    link: "https://ai-resume-platform.netlify.app/",
  },
  {
    title: "Donation Platform",
    image: "img/feature-1.png",
    desc: "Donation management platform helping NGOs distribute unused items efficiently.",
    link: "https://unused-items-donation-platform-for-ngos.onrender.com/",
  },
  {
    title: "Realtime Chat Application",
    image: "img/feature-2.png",
    desc: "MERN + Socket.io based real-time messaging application.",
    link: "https://chat-application-de2t.onrender.com/",
  },
];

const hobbies = [
  { title: "Coding", emoji: "💻", left: "5%", top: "5%" },
  { title: "Gaming", emoji: "🎮", left: "50%", top: "5%" },
  { title: "Learning New Things", emoji: "📚", left: "10%", top: "35%" },
  { title: "Traveling", emoji: "✈️", left: "35%", top: "40%" },
  { title: "Music", emoji: "🎵", left: "70%", top: "45%" },
  { title: "Reading", emoji: "📚", left: "5%", top: "65%" },
];

// --- MAIN COMPONENT ---

const Projects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");

      // Set initial positions (slide from right)
      gsap.set(cards.slice(1), { xPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${projects.length * 100}vh`,
          pin: true,
          scrub: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const label = `slide-${index}`;

        tl.to(
          cards[index - 1],
          {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(5px)",
            duration: 0.5,
          },
          label
        ).to(
          card,
          {
            xPercent: 0,
            ease: "none",
            duration: 1,
          },
          label
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-black">
      {/* --- GSAP HORIZONTAL SCROLL PROJECTS --- */}
      <section
        ref={containerRef}
        id="project"
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
            style={{ zIndex: index + 1 }}
          >
            {/* Replaced standard div with BentoTilt for the 3D hover effect */}
            <BentoTilt className="w-full max-w-7xl overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
              <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
                <div className="relative h-[30vh] min-h-[250px] w-full md:h-[500px] lg:col-span-7 lg:h-[650px] xl:col-span-8">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 text-white sm:p-8 md:p-10 lg:col-span-5 lg:p-14 xl:col-span-4">
                  <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:mb-6 lg:text-5xl">
                    {project.title}
                  </h2>

                  <p className="mb-6 text-base text-zinc-400 sm:text-lg lg:mb-8">
                    {project.desc}
                  </p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 sm:px-8 sm:text-base"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </BentoTilt>
          </div>
        ))}
      </section>

      {/* --- BEYOND THE CODE (HOBBIES) --- */}
      <section className="relative z-10 w-full bg-black px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <BentoTilt className="bento-tilt_1 h-[530px] rounded-3xl border border-zinc-800 bg-zinc-900/50 text-white md:col-span-1">
            <div className="flex h-[500px] flex-col p-0">
              <div className="flex flex-col items-center justify-center px-10 pt-10">
                <div className="inline-flex items-center gap-2">
                  <PiStarFourFill className="size-9 text-emerald-300" />
                  <h3 className="font-serif text-3xl font-bold">
                    Beyond the Code
                  </h3>
                </div>

                <p className="mt-2 text-sm text-white/60">
                  Explore my interests and hobbies beyond the digital realm
                </p>
              </div>

              <div className="relative flex-1 overflow-hidden">
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="absolute inline-flex cursor-grab active:cursor-grabbing items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 px-6 py-1.5"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoTilt>
        </div>
      </section>
    </main>
  );
};

export default Projects;
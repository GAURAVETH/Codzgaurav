import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { PiStarFourFill } from 'react-icons/pi';
import { motion } from 'framer-motion';


const hobbies = [
  {
    title: 'Coding',
    emoji: '💻',
    left: '5%',
    top: '5%'
  },
  {
    title: 'Gaming',
    emoji: '🎮',
    left: '50%',
    top: '5%'
  },
  {
    title: 'Learning New Things',
    emoji: '📚',
    left: '10%',
    top: '35%'
  },
  {
    title: 'Traveling',
    emoji: '✈️',
    left: '35%',
    top: '40%'
  },
  {
    title: 'Music',
    emoji: '🎵',
    left: '70%',
    top: '45%'
  },
  {
    title: 'Reading',
    emoji: '📚',
    left: '5%',
    top: '65%'
  }
];


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
      style={{ transform: transformStyle }}
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
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
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
            {/* Radial gradient hover effect */}
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
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white"
          >
            {/* Radial gradient hover effect */}
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

const Projects = () => (
  <section id="project" className="bg-black pb-28">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Introuduce My Projects
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
        Project successfully completed, showcasing my skills in [technologies used, e.g., MERN stack, React, TailwindCSS], with features like [key features, e.g., real-time chat, user authentication, feedback collection]. Looking forward to the next challenge!
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="img/feature-1.png"
          title={<>Dona<b>t</b>e</>}
          description="The Unused Donation Items Platform is a web application designed to help NGOs efficiently manage and distribute unused donation items. Built with the MERN stack and styled using Tailwind CSS, the platform offers a responsive and user-friendly interface tailored for seamless functionality."
          isLive
          href="https://unused-items-donation-platform-for-ngos.onrender.com/"
        />
      </BentoTilt>

      <div className="grid min-h-96 w-full grid-cols-2 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="img/feature-2.png"
            title={<>Realtime Chat Application</>}
            description="This real-time chat application is built with modern web development technologies, focusing on user experience, performance, and reliability. It enables users to communicate seamlessly with real-time messaging features and intuitive UI components."
            isLive
            href="https://chat-application-de2t.onrender.com/"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re projects co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="h-[530px] bento-tilt_1 me-14 md:col-span-1 md:me-0 text-white">
          <div className="p-0 h-[500px] flex flex-col ">
            <div className="flex flex-col justify-center items-center px-10 pt-10 ">
              <div className="inline-flex gap-2">
                <PiStarFourFill className="size-9 text-emerald-300" />
                <h3 className="font-serif text-3xl">Beyond the Code</h3>
              </div>
              <p className="text-sm text-white/60 mt-2">Explore my interests and hobbies beyond the digital realm</p>
            </div>
            <div className="relative flex-1">
              {hobbies.map(hobby => (
                <motion.div
                  key={hobby.title}
                  className="cursor-pointer inline-flex gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                  style={{
                    left: hobby.left,
                    top: hobby.top,
                  }}
                  drag
                >
                  <span className="font-medium text-gray-950">{hobby.title}</span>
                  <span>{hobby.emoji}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </BentoTilt>

        {/* <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <img
            src="img/feature-1.png"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt> */}
      </div>
    </div>

  </section>
);

export default Projects;

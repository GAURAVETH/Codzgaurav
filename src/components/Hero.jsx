import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

// --- 3D Tilt, Stretch & Curved Radius Wrapper ---
const MiniVideoTilt = ({ children, onClick }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();

        const xPos = (event.clientX - left) / width - 0.5;
        const yPos = (event.clientY - top) / height - 0.5;

        const tiltX = yPos * 30;
        const tiltY = xPos * -30;

        const moveX = xPos * 40;
        const moveY = yPos * 40;

        const stretchX = 1 + Math.abs(xPos) * 0.25;
        const stretchY = 1 + Math.abs(yPos) * 0.25;

        const newTransform = `
          perspective(700px) 
          translate(${moveX}px, ${moveY}px) 
          rotateX(${tiltX}deg) 
          rotateY(${tiltY}deg) 
          scale3d(${stretchX}, ${stretchY}, 1.05)
        `;

        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="size-full cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
            style={{
                transform: transformStyle,
                transition: transformStyle
                    ? "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    : "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
        >
            {children}
        </div>
    );
};

// --- DATA STRUCTURE FOR DYNAMIC TEXT ---
// Maps each video index to its respective text variants
const HERO_CONTENT = {
    1: {
        topText: <>W<b>e</b>b</>,
        bottomText: <>Develop<b>e</b>r</>,
        subText: "Full Stack Developer",
    },
    2: {
        topText: <>Clo<b>u</b>d</>,
        bottomText: <>Engine<b>e</b>r</>,
        subText: "Cloud Solutions Architect",
    },
    3: {
        topText: <>Dev<b>O</b>ps</>,
        bottomText: <>Engine<b>e</b>r</>,
        subText: "CI/CD & Infrastructure Specialist",
    },
};

// --- MAIN HERO COMPONENT ---
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;

    const currentVideoRef = useRef(null);
    const nextVideoRef = useRef(null);

    const handleVideoLoaded = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    };

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    // 1. Video Swap Animation
    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });

                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    force3D: true,
                    onStart: () => nextVideoRef.current.play(),
                });

                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                    force3D: true,
                });
                
                // OPTIONAL: Smooth text entry animation on change
                gsap.from(".hero-heading, .hero-subtext", {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }
        },
        { dependencies: [currentIndex], revertOnUpdate: true }
    );

    // 2. Scroll Trigger Mask Animation
    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
            borderRadius: "0 0 40% 10%",
        });

        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",
            force3D: true,
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: 1,
            },
        });
    });

    const getVideoSrc = (index) => `videos/heros-${index}.mp4`;

    // Grab the text for the currently active video index
    const currentText = HERO_CONTENT[currentIndex] || HERO_CONTENT[1];

    return (
        <div id="home" className="relative h-dvh w-full overflow-x-hidden">

            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
            )}

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
                style={{ willChange: "clip-path, border-radius, transform" }}
            >
                <div>
                    {/* Mini Video Trigger Container with 3D Tilt */}
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 overflow-visible">
                        <div className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 size-full">
                            <MiniVideoTilt onClick={handleMiniVdClick}>
                                <video
                                    ref={currentVideoRef}
                                    src={getVideoSrc(upcomingVideoIndex)}
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    id="current-video"
                                    className="size-64 origin-center scale-150 object-cover object-center shadow-2xl"
                                    onLoadedData={handleVideoLoaded}
                                />
                            </MiniVideoTilt>
                        </div>
                    </div>

                    {/* Expanding Next Video */}
                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoaded}
                    />

                    {/* Background Video */}
                    <video
                        src={getVideoSrc(
                            currentIndex === totalVideos - 1 ? 1 : currentIndex
                        )}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoaded}
                    />
                </div>

                {/* DYNAMIC TEXT: Foreground Bottom Heading */}
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 drop-shadow-md">
                    {currentText.bottomText}
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        {/* DYNAMIC TEXT: Foreground Top Heading */}
                        <h1 className="special-font hero-heading text-blue-100 drop-shadow-md">
                            {currentText.topText}
                        </h1>
                        {/* DYNAMIC TEXT: Subtitle text */}
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100 text-lg drop-shadow-md hero-subtext">
                            {currentText.subText}
                        </p>
                        <a href="#contact">
                            <Button
                                title="Contact Me"
                                leftIcon={<TiLocationArrow />}
                                containerClass="!bg-emerald-400 !text-black hover:bg-emerald-300 transition-colors flex-center gap-1 font-bold"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* DYNAMIC TEXT: Shadow Text underneath the clip-path mask */}
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                {currentText.bottomText}
            </h1>
        </div>
    );
};

export default Hero;
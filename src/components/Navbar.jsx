import React, { useEffect, useState, useRef } from 'react';
import { useWindowScroll } from 'react-use';
import { TiLocationArrow } from 'react-icons/ti';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from './Button.jsx';
import gsap from 'gsap';
import HoverSoundLink from './HoverSoundLink.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['Home', 'About', 'Skills', 'Contact'];

// Mobile navigation includes Projects too
const mobileNavItems = [
    'Home',
    'About',
    'Skills',
    'Contact',
    'Projects',
];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isIndicatorActive, setIsIndicatorActive] =
        useState(false);

    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    const [activeSection, setActiveSection] =
        useState('home');

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();

    // ==========================================
    // NAVBAR VISIBILITY
    // ==========================================

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);

            if (navContainerRef.current) {
                navContainerRef.current.classList.remove(
                    'floating-nav'
                );
            }
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);

            if (navContainerRef.current) {
                navContainerRef.current.classList.add(
                    'floating-nav'
                );
            }
        } else {
            setIsNavVisible(true);

            if (navContainerRef.current) {
                navContainerRef.current.classList.add(
                    'floating-nav'
                );
            }
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    // ==========================================
    // GSAP
    // ==========================================

    useEffect(() => {
        if (!navContainerRef.current) return;

        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    // ==========================================
    // AUDIO
    // ==========================================

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        if (!audioElementRef.current) return;

        if (isAudioPlaying) {
            audioElementRef.current.pause();
        } else {
            audioElementRef.current
                .play()
                .catch(() => { });
        }
    }, [isAudioPlaying]);

    // ==========================================
    // ACTIVE SECTION
    // INCLUDING PROJECT
    // ==========================================

    useEffect(() => {
        const sectionIds = [
            'home',
            'about',
            'skills',
            'project',
            'contact',
        ];

        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter(
                        (entry) => entry.isIntersecting
                    )
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    );

                if (visibleSections.length > 0) {
                    setActiveSection(
                        visibleSections[0].target.id
                    );
                }
            },
            {
                threshold: [0.1, 0.25, 0.5, 0.75],
                rootMargin:
                    '-15% 0px -55% 0px',
            }
        );

        sections.forEach((section) =>
            observer.observe(section)
        );

        return () => {
            sections.forEach((section) =>
                observer.unobserve(section)
            );
        };
    }, []);

    // ==========================================
    // MOBILE NAV CLICK
    // ==========================================

    const handleMobileNavClick = (item) => {
        const sectionId =
            item.toLowerCase() === 'projects'
                ? 'project'
                : item.toLowerCase();

        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);

        const target =
            document.getElementById(sectionId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    // ==========================================
    // ESCAPE KEY
    // ==========================================

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener(
            'keydown',
            handleEscape
        );

        return () => {
            document.removeEventListener(
                'keydown',
                handleEscape
            );
        };
    }, []);

    // ==========================================
    // BODY SCROLL LOCK
    // ==========================================

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* ==================================================
                DESKTOP NAVBAR
                YOUR ORIGINAL STRUCTURE
            ================================================== */}

            <div
                ref={navContainerRef}
                className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
            >
                <header className="absolute top-1/2 w-full -translate-y-1/2">
                    <nav className="flex size-full items-center justify-between p-4">

                        {/* LEFT */}
                        <div className="flex items-center gap-7">
                            <img
                                src="/img/logo.png"
                                alt="logo"
                                className="w-10"
                            />

                            {/* DESKTOP PROJECT BUTTON */}
                            <a href="#project">
                                <Button
                                    id="product-button"
                                    title="Projects"
                                    rightIcon={
                                        <TiLocationArrow />
                                    }
                                    containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                                />
                            </a>
                        </div>

                        {/* RIGHT */}
                        <div className="flex h-full items-center">

                            {/* DESKTOP LINKS */}
                            <div className="hidden md:block">
                                {navItems.map((item) => (
                                    <HoverSoundLink
                                        text={item}
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="nav-hover-btn"
                                    />
                                ))}
                            </div>

                            {/* AUDIO */}
                            <button
                                className="ml-10 flex items-center space-x-0.5"
                                onClick={
                                    toggleAudioIndicator
                                }
                            >
                                <audio
                                    ref={
                                        audioElementRef
                                    }
                                    className="hidden"
                                    src="/audio/loop.mp3"
                                    loop
                                />

                                {[1, 2, 3].map(
                                    (bar) => (
                                        <div
                                            key={bar}
                                            className={`indicator-line ${isIndicatorActive
                                                ? 'active'
                                                : 'inactive'
                                                }`}
                                            style={{
                                                animationDelay: `${bar *
                                                    0.1
                                                    }s`,
                                            }}
                                        />
                                    )
                                )}
                            </button>

                            {/* ==========================================
                                MOBILE MENU BUTTON
                            ========================================== */}

                            <motion.button
                                type="button"
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() =>
                                    setIsMobileMenuOpen(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                className="
                                    ml-4
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/10
                                    text-white
                                    backdrop-blur-xl
                                    md:hidden
                                "
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence
                                    mode="wait"
                                >
                                    {isMobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{
                                                rotate: -90,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                rotate: 0,
                                                opacity: 1,
                                            }}
                                            exit={{
                                                rotate: 90,
                                                opacity: 0,
                                            }}
                                        >
                                            <FiX
                                                size={22}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{
                                                rotate: 90,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                rotate: 0,
                                                opacity: 1,
                                            }}
                                            exit={{
                                                rotate: -90,
                                                opacity: 0,
                                            }}
                                        >
                                            <FiMenu
                                                size={22}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </nav>
                </header>
            </div>

            {/* ==================================================
                MOBILE NAVIGATION
            ================================================== */}

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* BACKDROP */}
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            onClick={() =>
                                setIsMobileMenuOpen(
                                    false
                                )
                            }
                            className="
                                fixed
                                inset-0
                                z-40
                                bg-black/70
                                backdrop-blur-md
                                md:hidden
                            "
                        />

                        {/* MOBILE MENU */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -20,
                                scale: 0.96,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                                scale: 0.96,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            className="
                                fixed
                                left-3
                                right-3
                                top-24
                                z-50
                                overflow-hidden
                                rounded-3xl
                                border
                                border-white/10
                                bg-black/90
                                p-3
                                shadow-[0_25px_80px_rgba(0,0,0,0.65)]
                                backdrop-blur-2xl
                                md:hidden
                            "
                        >
                            {/* GLOW */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-24
                                    -top-24
                                    h-52
                                    w-52
                                    rounded-full
                                    bg-blue-500/20
                                    blur-3xl
                                "
                            />

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -bottom-24
                                    -left-24
                                    h-52
                                    w-52
                                    rounded-full
                                    bg-purple-500/10
                                    blur-3xl
                                "
                            />

                            <div className="relative">

                                {/* ======================================
                                    ALL MOBILE LINKS
                                ======================================= */}

                                <div className="space-y-2">

                                    {mobileNavItems.map(
                                        (
                                            item,
                                            index
                                        ) => {
                                            const sectionId =
                                                item ===
                                                    'Projects'
                                                    ? 'project'
                                                    : item.toLowerCase();

                                            const isActive =
                                                activeSection ===
                                                sectionId;

                                            return (
                                                <motion.button
                                                    key={
                                                        item
                                                    }
                                                    type="button"
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            index *
                                                            0.05,
                                                        duration:
                                                            0.3,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.97,
                                                    }}
                                                    onClick={() =>
                                                        handleMobileNavClick(
                                                            item
                                                        )
                                                    }
                                                    className={`
                                                        group
                                                        relative
                                                        flex
                                                        w-full
                                                        items-center
                                                        justify-between
                                                        overflow-hidden
                                                        rounded-2xl
                                                        border
                                                        px-5
                                                        py-4
                                                        text-left
                                                        transition-all
                                                        duration-300

                                                        ${isActive
                                                            ? `
                                                                    border-white/20
                                                                    bg-white
                                                                    text-black
                                                                    shadow-[0_8px_30px_rgba(255,255,255,0.12)]
                                                                `
                                                            : `
                                                                    border-white/5
                                                                    bg-white/[0.03]
                                                                    text-white/60
                                                                    hover:border-white/10
                                                                    hover:bg-white/[0.08]
                                                                    hover:text-white
                                                                `
                                                        }
                                                    `}
                                                >

                                                    {/* ACTIVE BAR */}
                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.span
                                                                layoutId="mobile-active-bar"
                                                                className="
                                                                    absolute
                                                                    left-0
                                                                    top-1/2
                                                                    h-8
                                                                    w-1
                                                                    -translate-y-1/2
                                                                    rounded-r-full
                                                                   
                                                                "
                                                                initial={{
                                                                    opacity: 0,
                                                                    scaleY: 0,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    scaleY: 1,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    scaleY: 0,
                                                                }}
                                                                transition={{
                                                                    type: 'spring',
                                                                    stiffness: 500,
                                                                    damping: 30,
                                                                }}
                                                            />
                                                        )}
                                                    </AnimatePresence>

                                                    {/* TEXT */}
                                                    <div className="flex items-center gap-3">

                                                        {/* DOT */}
                                                        <motion.span
                                                            animate={{
                                                                scale: isActive
                                                                    ? 1
                                                                    : 0.55,
                                                                opacity: isActive
                                                                    ? 1
                                                                    : 0.3,
                                                            }}
                                                            className={`
                                                                h-2
                                                                w-2
                                                                rounded-full
                                                                ${isActive
                                                                    ? 'bg-black'
                                                                    : 'bg-white'
                                                                }
                                                            `}
                                                        />

                                                        <span
                                                            className={`
                                                                text-base
                                                                ${isActive
                                                                    ? 'font-semibold'
                                                                    : 'font-medium'
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                item
                                                            }
                                                        </span>
                                                    </div>

                                                    {/* ARROW */}
                                                    <motion.span
                                                        animate={{
                                                            x: isActive
                                                                ? 0
                                                                : 3,
                                                            rotate: isActive
                                                                ? 0
                                                                : -45,
                                                        }}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 400,
                                                            damping: 20,
                                                        }}
                                                        className={`
                                                            text-xl
                                                            ${isActive
                                                                ? 'opacity-100'
                                                                : 'opacity-40 group-hover:opacity-100'
                                                            }
                                                        `}
                                                    >
                                                        <TiLocationArrow />
                                                    </motion.span>

                                                </motion.button>
                                            );
                                        }
                                    )}

                                </div>

                                {/* ======================================
                                    STATUS
                                ======================================= */}

                                <div
                                    className="
                                        mt-2
                                        flex
                                        items-center
                                        gap-2
                                        px-2
                                        pb-1
                                        pt-3
                                        text-xs
                                        text-white/40
                                    "
                                >
                                    <span
                                        className="
                                            h-2
                                            w-2
                                            animate-pulse
                                            rounded-full
                                            bg-green-400
                                            shadow-[0_0_10px_rgba(74,222,128,0.7)]
                                        "
                                    />

                                    <span>
                                        Available for
                                        opportunities
                                    </span>
                                </div>

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
import React, { useEffect, useState, useRef } from 'react';
import { useWindowScroll } from 'react-use';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button.jsx';
import gsap from 'gsap';
import HoverSoundLink from './HoverSoundLink.jsx';

const navItems = ['Home', 'About', 'Skills', 'Contact'];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);
    const { y: currentScrollY } = useWindowScroll();

    // Handle Navbar Visibility
    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        } else {
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    // GSAP Animation for Navbar
    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    // Toggle Audio Indicator
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    // Play or Pause Audio
    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);



    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="logo" className="w-10" />
                        <a href='#project'>
                        <Button
                            id="product-button"
                            title="Projects"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                          
                        />
                        </a>
                    </div>
                    <div className="flex h-full items-center">
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

                        <button
                            className="ml-10 flex items-center space-x-0.5"
                            onClick={toggleAudioIndicator}
                        >
                            <audio
                                ref={audioElementRef}
                                className="hidden"
                                src="/audio/loop.mp3"
                                loop
                            />
                            {[1, 2, 3].map((bar) => (
                                <div
                                    key={bar}
                                    className={`indicator-line ${
                                        isIndicatorActive ? '' : 'active'
                                    }`}
                                    style={{ animationDelay: `${bar * 0.1}s` }}
                                />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;

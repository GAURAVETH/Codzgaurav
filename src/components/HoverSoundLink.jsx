import { useRef } from "react";

const HoverSoundLink = ({ text, href = "#", soundFile = "/audio/click.mp3", className = "" }) => {
    const audioRef = useRef(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Restart sound
            audioRef.current.muted = false; // Ensure audio is not muted
            audioRef.current.play().catch(error => {
                console.warn("Audio play prevented:", error);
            });
        }
    };

    return (
        <>
            <a
                href={href}
                onMouseEnter={playSound}
                className={className}
            >
                {text}
            </a>
            <audio ref={audioRef} src={soundFile} preload="auto" playsInline />
        </>
    );
};

export default HoverSoundLink;

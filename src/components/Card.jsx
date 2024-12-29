import React from "react";
import grainImage from "../../public/img/grain.png"

const Card = ({ className, children }) => {
    return (
        <div
            className={`bg-gray-800 border border-white rounded-3xl relative z-0 overflow-hidden after:z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none p-6 ${className}`}
        >
            <div
                className="absolute inset-0 -z-10 opacity-5"
                style={{
                    backgroundImage: `url${grainImage}`, // Correct image URL referencing
                }}
            />
            {children}
        </div>
    );
};

export default Card;

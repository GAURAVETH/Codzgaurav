import { motion, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";


const BackToTop = () => {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setShowButton(latest > 0.05);
    });
    return unsubscribe; // Cleanup on unmount
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-transparent text-primary p-3 rounded-full shadow-lg transition-color z-[150] flex items-center justify-center"
          aria-label="scroll to top"
          style={{ width: "50px", height: "50px" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ transform: "rotate(-80deg)" }}
          >
            <svg width={50} height={50} viewBox="0 0 36 36">
              <path
                d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                fill="none"
                stroke="#ffc107"
                strokeWidth={3}
              />
              <motion.path
                d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                fill="none"
                stroke="black"
                strokeWidth={3}
                strokeDasharray="1000 1000"
                strokeDashoffset={100}
                style={{
                  pathLength: scrollYProgress,
                }}
              />
            </svg>
          </motion.div>
          <span className="text-xl relative z-[150]" style={{ color: '#ffc107' }}>↑</span>
        </button>
      )}
    </>
  );
};

export default BackToTop;

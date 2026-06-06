import { motion, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";

const BackToTop = () => {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setShowButton(latest > 0.05);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 bg-transparent p-3 z-[150] flex items-center justify-center cursor-pointer"
          aria-label="scroll to top"
          style={{ width: "60px", height: "60px" }}
        >
          {/* SVG Progress Ring */}
          <motion.div
            className="absolute inset-0"
            style={{ transform: "rotate(-80deg)" }}
            whileHover={{ filter: "drop-shadow(0 0 8px #ffc107)" }}
          >
            <svg width={60} height={60} viewBox="0 0 36 36">
              <path
                d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                fill="none"
                stroke="black"
                strokeWidth={3}
              />
              <motion.path
                d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                fill="none"
                stroke="#ffc107"
                strokeWidth={3}
                style={{
                  pathLength: scrollYProgress,
                }}
              />
            </svg>
          </motion.div>

          {/* Arrow Icon with Hover Bounce */}
          <motion.span
            className="text-xl relative z-[150]"
            style={{ color: '#ffc107' }}
            whileHover={{ y: -5 }}
          >
            ↑
          </motion.span>
        </motion.button>
      )}
    </>
  );
};

export default BackToTop;
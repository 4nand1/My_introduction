"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 22 });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) setHovering(true);
    };
    const onLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Sharp dot — snappy */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] hidden md:block rounded-full bg-[#6d63ff]"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Lazy ring — follows with lag */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[998] hidden md:block rounded-full border border-white/25"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          borderColor: hovering ? "rgba(109,99,255,0.7)" : "rgba(255,255,255,0.2)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

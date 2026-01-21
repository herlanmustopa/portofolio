"use client";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RiveCharacterProps {
  src: string;
  stateMachine?: string;
  artboard?: string;
  direction?: "left" | "right";
  duration?: number;
  delay?: number;
  size?: number;
}

function RiveCharacter({
  src,
  stateMachine,
  artboard,
  direction = "right",
  duration = 12,
  delay = 0,
  size = 60,
}: RiveCharacterProps) {
  const isLeft = direction === "left";
  const [hasError, setHasError] = useState(false);

  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachine ? [stateMachine] : undefined,
    artboard,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoadError: () => setHasError(true),
  });

  if (hasError) return null;

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2"
      style={{
        width: size,
        height: size,
        transform: `${isLeft ? "scaleX(-1)" : "scaleX(1)"} translateY(-50%)`,
      }}
      initial={{ x: isLeft ? "calc(100vw + 50px)" : -size }}
      animate={{ x: isLeft ? -size : "calc(100vw + 50px)" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <RiveComponent />
    </motion.div>
  );
}

// Wrapper component for multiple Rive characters
export function RiveRunningCharacters() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-x-0  h-32 overflow-hidden pointer-events-none">
      {/* Character 2 - Walking left */}
      <RiveCharacter
        src="/rive/fire-running.riv"
        direction="right"
        duration={14}
        delay={6}
      />
    </div>
  );
}

export default RiveCharacter;

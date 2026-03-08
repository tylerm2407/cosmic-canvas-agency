import React, { useMemo } from "react";

interface ShinyTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = "",
}: ShinyTextProps) {
  const animationName = "shiny-text-slide";

  const style = useMemo<React.CSSProperties>(() => {
    if (disabled) return { color };
    return {
      color,
      backgroundImage: `linear-gradient(${direction === "left" ? "90deg" : "270deg"}, ${color}, ${shineColor} 50%, ${color})`,
      backgroundSize: `${spread}% 100%`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: `${animationName} ${speed}s linear ${delay}s ${yoyo ? "alternate" : ""} infinite`,
    };
  }, [color, shineColor, spread, speed, delay, direction, yoyo, disabled]);

  return (
    <>
      <style>{`
        @keyframes ${animationName} {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <span
        className={`inline-block ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""} ${className}`}
        style={style}
      >
        {text}
      </span>
    </>
  );
}

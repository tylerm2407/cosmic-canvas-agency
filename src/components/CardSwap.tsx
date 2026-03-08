import React, { useState, useEffect, useCallback, Children, cloneElement, isValidElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}

interface CardSwapProps {
  children: React.ReactNode;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
}

export default function CardSwap({
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
}: CardSwapProps) {
  const cards = Children.toArray(children).filter(isValidElement);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, delay);
    return () => clearInterval(interval);
  }, [next, delay, isPaused]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {cards.map((card, index) => {
        const offset = (index - activeIndex + cards.length) % cards.length;
        const isActive = offset === 0;
        const zIndex = cards.length - offset;
        const translateX = offset * cardDistance;
        const translateY = offset * verticalDistance * 0.15;
        const scale = 1 - offset * 0.06;
        const opacity = offset > 2 ? 0 : 1 - offset * 0.25;

        return (
          <motion.div
            key={index}
            className="absolute cursor-pointer"
            animate={{
              x: translateX,
              y: translateY,
              scale,
              opacity,
              zIndex,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            onClick={() => setActiveIndex(index)}
            style={{ zIndex }}
          >
            {isValidElement(card) ? cloneElement(card as React.ReactElement<any>, { 
              className: `${(card.props as any).className || ""} ${isActive ? "ring-2 ring-neon-purple/60 shadow-[0_0_30px_rgba(168,85,247,0.3)]" : ""}`.trim()
            }) : card}
          </motion.div>
        );
      })}

      {/* Dots indicator */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "bg-neon-purple w-6" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

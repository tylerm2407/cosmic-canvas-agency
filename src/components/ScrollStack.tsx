import React, { useRef, Children, isValidElement } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ScrollStackItem({ children, className = "", onClick }: ScrollStackItemProps) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}

interface ScrollStackProps {
  children: React.ReactNode;
}

export default function ScrollStack({ children }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = Children.toArray(children).filter(isValidElement);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} style={{ height: `${cards.length * 100}vh` }} className="relative">
      <div className="sticky top-0 flex items-center justify-center overflow-hidden" style={{ height: "100vh" }}>
        {cards.map((card, index) => (
          <ScrollStackCard
            key={index}
            index={index}
            total={cards.length}
            scrollYProgress={scrollYProgress}
          >
            {card}
          </ScrollStackCard>
        ))}
      </div>
    </div>
  );
}

interface ScrollStackCardProps {
  children: React.ReactNode;
  index: number;
  total: number;
  scrollYProgress: any;
}

function ScrollStackCard({ children, index, total, scrollYProgress }: ScrollStackCardProps) {
  const cardProgress = 1 / total;
  const start = index * cardProgress;
  const activeAt = start + cardProgress * 0.3;
  const end = (index + 1) * cardProgress;

  const y = useTransform(
    scrollYProgress,
    [start, activeAt, end],
    ["100vh", "0vh", "0vh"]
  );

  const scale = useTransform(
    scrollYProgress,
    [activeAt, end, Math.min(end + cardProgress * 0.3, 1)],
    [1, 1, index < total - 1 ? 0.92 : 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, activeAt, end, Math.min(end + cardProgress * 0.2, 1)],
    [0, 1, 1, index < total - 1 ? 0 : 1]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4"
      style={{
        y,
        scale,
        opacity,
        zIndex: index,
      }}
    >
      {children}
    </motion.div>
  );
}
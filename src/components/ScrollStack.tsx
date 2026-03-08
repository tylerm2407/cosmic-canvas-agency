import React, { useRef, Children, isValidElement, cloneElement } from "react";
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
    <div ref={containerRef} style={{ height: `${(cards.length + 1) * 40}vh` }} className="relative">
      <div className="sticky top-24 flex items-center justify-center overflow-visible" style={{ height: "60vh" }}>
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
  const start = index / total;
  const end = (index + 1) / total;

  const y = useTransform(scrollYProgress, [start, end], [100 + index * 20, index * -8]);
  const scale = useTransform(scrollYProgress, [start, end], [0.92, 1 - index * 0.03]);
  const opacity = useTransform(
    scrollYProgress,
    [start, Math.min(end + 0.1, 1), Math.min(end + 0.3, 1)],
    [1, 1, index < total - 1 ? 0.6 : 1]
  );

  return (
    <motion.div
      className="absolute w-full flex justify-center"
      style={{
        y,
        scale,
        opacity,
        zIndex: total - index,
      }}
    >
      {children}
    </motion.div>
  );
}

import { AnimatePresence, motion } from "framer-motion";

interface GradualSpacingProps {
  text: string;
  isOpen: boolean;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export default function GradualSpacing({ text, isOpen, tag }: GradualSpacingProps) {
  const gradual = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const Comp = tag;

  return (
    <div className="flex space-x-1 justify-center">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            exit="hidden"
            variants={gradual}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            className=""
          >
            <Comp>{char === " " ? <span>&nbsp;</span> : char}</Comp>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

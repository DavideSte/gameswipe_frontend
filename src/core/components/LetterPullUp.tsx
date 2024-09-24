import { motion } from "framer-motion";

interface LetterPullUpProps {
  words: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function LetterPullUp({ words, tag }: LetterPullUpProps) {
  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
      },
    }),
  };

  const Comp = tag;

  return (
    <div className="flex">
      {letters.map((letter, i) => (
        <motion.div
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className=""
        >
          <Comp>{letter === " " ? <span>&nbsp;</span> : letter}</Comp>
        </motion.div>
      ))}
    </div>
  );
}

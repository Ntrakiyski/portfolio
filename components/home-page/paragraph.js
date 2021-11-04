import React from "react";
import { motion } from "framer-motion";

export const Paragraph = ({ delayDuration, paragraphContent }) => {
  return (
    <motion.div className="mt-4">
      <p
        className="text-lg"
        initial={{ y: 60, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: delayDuration,
          },
        }}
      >
        {paragraphContent}
      </p>
    </motion.div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const Toggle = ({ value, onClick }) => {
  return (
    <div
      className={clsx(
        "relative flex items-center w-12 h-6 rounded-full cursor-pointer",
        "border border-secondary-accent transition-colors duration-300",
        value ? "bg-primary-highlight" : "bg-primary"
      )}
      onClick={onClick}
    >
      <motion.div
        className={clsx(
          "absolute w-4 h-4 rounded-full",
          value ? "bg-primary" : "bg-primary-highlight"
        )}
        initial={{
          x: value ? 26 : 4,
        }}
        animate={{
          x: value ? 26 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </div>
  );
};

export default Toggle;

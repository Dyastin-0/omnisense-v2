import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const Toggle = ({ value, onClick }) => {
  const toggleSwitch = () => {
    if (onClick) {
      onClick(!value);
    }
  };

  return (
    <div
      className={clsx(
        "relative flex items-center w-12 h-6 rounded-full cursor-pointer",
        "border border-secondary-accent transition-colors duration-300",
        value ? "bg-primary-highlight" : "bg-primary"
      )}
      onClick={toggleSwitch}
    >
      <motion.div
        className={clsx(
          "absolute w-4 h-4 rounded-full",
          value ? "bg-primary" : "bg-primary-highlight"
        )}
        animate={{
          x: value ? 25 : 5,
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

import React from "react";
import { motion } from "framer-motion";

const Toggle = ({ value, onClick }) => {
  const toggleSwitch = () => {
    if (onClick) {
      onClick(!value);
    }
  };

  return (
    <div
      className={`relative flex items-center w-11 h-6 rounded-full cursor-pointer
        border border-secondary-accent transition-colors duration-300 ${
          value ? "bg-primary-highlight" : "bg-transparent"
        }`}
      onClick={toggleSwitch}
    >
      <motion.div
        className="absolute w-5 h-5 bg-secondary-accent rounded-full"
        animate={{
          x: value ? 20 : 2,
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

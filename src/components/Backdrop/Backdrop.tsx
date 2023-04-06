import { motion } from "framer-motion";
import { ReactNode } from "react";

import "./Backdrop.scss";

/**
 * Backdrop Component
 * Component provides a fading background for its child components.
 * Used in Popup Components
 *
 * @param {ReactNode} children - Child components to be rendered within the backdrop.
 * @returns {JSX.Element} - Backdrop component.
 */
const Backdrop = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;

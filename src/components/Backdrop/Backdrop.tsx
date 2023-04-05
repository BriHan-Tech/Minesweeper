import { motion } from "framer-motion";

import "./Backdrop.scss";

/**
 * Provides a backdrop for all popup components
 */
const Backdrop = ({ children }: any) => {
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

export const popUp = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "15%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export const dropDown = {
  hidden: {
    y: "-1000%",
    opacity: 0,
  },
  visible: {
    y: "-55%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 30,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
  },
};

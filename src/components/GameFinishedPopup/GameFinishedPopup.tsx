import { useContext } from "react";
import { motion, useAnimation } from "framer-motion";

import { GameContext } from "../App/GameContext";
import Backdrop from "../Backdrop/Backdrop";
import "./GameFinishedPopup.scss";
import crown from "../../assets/imgs/crown.svg";
import bomb from "../../assets/imgs/bomb.svg";

const popUp = {
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

const dropDown = {
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

const GameFinishedPopup = () => {
  const { gameStatus, setGameStatus } = useContext(GameContext);

  return (
    <Backdrop>
      <motion.img
        className="icon"
        src={gameStatus == "W" ? crown : bomb}
        variants={dropDown}
        initial="hidden"
        animate="visible"
        exit="exit"
      />
      <motion.div
        className="popup"
        variants={popUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="popup__message">
          {gameStatus == "W" ? "You Win!" : "You Lose!"}
        </h1>
        <button
          className="popup__btn"
          onClick={() => {
            setGameStatus("R");
          }}
        >
          Play Again!
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default GameFinishedPopup;

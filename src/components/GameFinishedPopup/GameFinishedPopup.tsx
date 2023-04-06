import { useContext } from "react";
import { motion, useAnimation } from "framer-motion";

import Backdrop from "../Backdrop/Backdrop";
import { GameContext } from "../App/GameContext";
import { popUp, dropDown } from "../../animations/popUpAnimations";
import crown from "../../assets/imgs/crown.svg";
import mine from "../../assets/imgs/mine.svg";
import "./GameFinishedPopup.scss";

const GameFinishedPopup = () => {
  const { gameStatus, setGameStatus } = useContext(GameContext);

  return (
    <Backdrop>
      <motion.img
        className="icon"
        src={gameStatus === "W" ? crown : mine}
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
          {gameStatus === "W" ? "You Win!" : "You Lose!"}
        </h1>
        <button
          className="btn"
          onClick={() => {
            setGameStatus("");
          }}
        >
          Play Again!
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default GameFinishedPopup;

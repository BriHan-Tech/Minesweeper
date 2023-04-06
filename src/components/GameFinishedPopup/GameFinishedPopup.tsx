import { useContext } from "react";
import { motion } from "framer-motion";

import Backdrop from "../Backdrop/Backdrop";
import { GameContext, GameState } from "../App/GameContext";
import { popUp, dropDown } from "../../animations/popUpAnimations";
import { iGameStatus } from "../../interfaces/iGameStatus";
import crown from "../../assets/imgs/crown.svg";
import mine from "../../assets/imgs/mine.svg";

import "./GameFinishedPopup.scss";

/**
 * Game Finished Component
 * Component is a modal that displays a message and an icon depending on gameStatus.
 * Indicates whether the player has won or lost the game based on gameStatus context.
 * Provides option to reset the game and play again
 *
 * @returns {JSX.Element} - The rendered GameFinishedPopup Component
 */
const GameFinishedPopup = (): JSX.Element => {
  const { gameStatus, setGameStatus } = useContext<iGameStatus>(GameContext);

  return (
    <Backdrop>
      {/* Animate crown/mine icon depending on gameStatus. */}
      <motion.img
        alt="Game Result Icon"
        className="icon"
        src={gameStatus === GameState.Won ? crown : mine}
        variants={dropDown}
        initial="hidden"
        animate="visible"
        exit="exit"
      />
      {/* Animate container with message */}
      <motion.div
        className="popup"
        variants={popUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="popup__message">
          {
            // Displays different message based on gameStatus.
            gameStatus === GameState.Won ? "You Win!" : "You Lose!"
          }
        </h1>
        <button
          className="btn"
          onClick={() => {
            // Resetting gameStatus to allow user to play again.
            setGameStatus(GameState.Prologue);
          }}
        >
          Play Again!
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default GameFinishedPopup;

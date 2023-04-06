import { useState, useEffect, useContext } from "react";

import { GameContext } from "../App/GameContext";
import stopwatch from "../../assets/imgs/stopwatch.svg";

import "./Timer.scss";

/**
 * Timer Component
 * Component displays a timer that counts seconds. The timer starts when the game has started
 * and is not finished (neither lost nor won), and resets to 0 seconds when the game is reset.
 *
 * @returns {JSX.Element} - JSX Element representing the Timer Component
 */
const Timer = (): JSX.Element => {
  const [seconds, setSeconds] = useState<number>(0);
  const { gameStatus } = useContext(GameContext);

  useEffect(() => {
    let intervalId: any;

    // If the game started & the game is not finished (neither lost nor won)
    if (gameStatus.length > 0 && gameStatus !== "L" && gameStatus !== "W") {
      // Start the timer by incrementing seconds every 1000ms (1 second)
      intervalId = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }

    // If the game status is "S" (game reset), reset timer is set to 0 seconds
    if (gameStatus === "S") setSeconds(0);

    // Clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [gameStatus]);

  return (
    <div className="timer">
      <img className="timer__icon" src={stopwatch} alt="Timer Icon" />
      {seconds}s
    </div>
  );
};

export default Timer;

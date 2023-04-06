import { useState, useEffect, useContext } from "react";

import { GameContext } from "../App/GameContext";
import stopwatch from "../../assets/imgs/stopwatch.svg";
import "./Timer.scss";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const { gameStatus } = useContext(GameContext);

  useEffect(() => {
    let intervalId: any;

    // If the game started & the game is not finished
    if (gameStatus.length > 0 && gameStatus !== "L" && gameStatus !== "W")
      intervalId = setInterval(() => setSeconds((prev) => prev + 1), 1000);

    // If the timer is game is getting reset
    if (gameStatus === "S") setSeconds(0);

    // Clear interval
    return () => clearInterval(intervalId);
  }, [gameStatus]);

  return (
    <div className="timer">
      <img className="timer__icon" src={stopwatch} />
      {seconds}s
    </div>
  );
};

export default Timer;

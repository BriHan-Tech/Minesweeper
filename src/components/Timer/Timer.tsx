import { useState, useEffect, useContext } from "react";
import { GameContext } from "../App/GameContext";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const { gameStatus, setGamestatus } = useContext(GameContext);

  useEffect(() => {
    let intervalId: any;
    if (gameStatus.length > 0 && gameStatus != "L" && gameStatus != "W")
      intervalId = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(intervalId);
  }, [gameStatus]);

  return <>{seconds}</>;
};

export default Timer;

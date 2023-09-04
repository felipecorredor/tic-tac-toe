import { TURNS } from "../global/constants";

const useChangeTurnRandomly = () => {
  const changeTurnRandomly = () => {
    const possibleTurns = Object.values(TURNS);
    const randomIndex = Math.floor(Math.random() * possibleTurns.length);
    const randomTurn = possibleTurns[randomIndex];
    return randomTurn;
  };

  return { changeTurnRandomly };
};

export default useChangeTurnRandomly;

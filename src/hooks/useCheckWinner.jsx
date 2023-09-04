import { useCallback } from "react";
import { WINNER_COMBOS } from "../global/constants";

const useCheckWinner = () => {
  const checkWinner = useCallback((boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }

    return false;
  }, []);

  return { checkWinner };
};

export default useCheckWinner;

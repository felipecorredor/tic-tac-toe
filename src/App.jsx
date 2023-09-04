import { useState, useEffect } from "react";
import "./App.css";
import Square from "./components/square";
import useChangeTurnRandomly from "./hooks/useChangeTurnRandomly";
import useCheckWinner from "./hooks/useCheckWinner";
import { TURNS } from "./global/constants";
import useCheckEndGame from "./hooks/useCheckEndGame";
import confetti from "canvas-confetti";

const INITIAL_BOARD = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(null);

  const { changeTurnRandomly } = useChangeTurnRandomly();
  const { checkWinner } = useCheckWinner();
  const { checkEndGame } = useCheckEndGame();

  useEffect(() => {
    const randomTurn = changeTurnRandomly();
    setTurn(randomTurn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else {
      const isEndGame = checkEndGame(newBoard);
      setWinner(isEndGame ? false : null);
    }
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setWinner(null);
    const randomTurn = changeTurnRandomly();
    setTurn(randomTurn);
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Draw" : "Win:"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Reset Game</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
};

export default App;

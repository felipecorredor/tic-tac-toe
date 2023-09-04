const useCheckEndGame = () => {
  const checkEndGame = (boardToCheck) => {
    const validate = boardToCheck.every((item) => item !== null);
    return validate;
  };

  return { checkEndGame };
};

export default useCheckEndGame;

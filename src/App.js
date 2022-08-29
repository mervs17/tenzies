import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import style from "./scss/Dice.scss";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allEqual = dice.every((die) => die.value === dice[0].value);
    if (allEqual && allHeld) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const { width, height } = useWindowSize();

  return (
    <main>
      {tenzies ? (
        <div className={style.Confetti}>
          <Confetti width={width} height={height} />
        </div>
      ) : (
        ""
      )}
      <div className={style.Tenzies}>
        <h1 className={style.Title}>Tenzies</h1>
        <p className={style.Paragraph}>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className={style.Dice}>
          {dice.map((die) => (
            <Die
              key={die.id}
              holdDice={() => holdDice(die.id)}
              isHeld={die.isHeld}
              value={die.value}
            />
          ))}
        </div>
        <button onClick={rollDice} className={style.Roll}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

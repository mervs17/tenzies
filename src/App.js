import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import style from "./scss/Dice.scss";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useLocalStorage } from "./useLocalStorage";
import { If, Then, Else } from "react-if";
import soundDice from "./audio/dice.wav";

export default function App() {
  const [dice, setDice] = useState(
    () => JSON.parse(localStorage.getItem("dice")) || allNewDice()
  );
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useLocalStorage("rolls", 0);
  const [time, setTime] = useState(
    () => JSON.parse(localStorage.getItem("time")) || 0
  );
  const [saveTime, setSaveTime] = useState(
    () => JSON.parse(localStorage.getItem("saveTime")) || 0
  );

  const audio = new Audio(soundDice);

  useEffect(() => {
    localStorage.setItem("dice", JSON.stringify(dice));
    const allHeld = dice.every((die) => die.isHeld);
    const allEqual = dice.every((die) => die.value === dice[0].value);

    if (allEqual && allHeld) {
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(time));
    let interval;
    if (!tenzies) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 10), 10);
    } else {
      localStorage.setItem("saveTime", JSON.stringify(time));
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    localStorage.setItem("rolls", JSON.parse(rolls));
  }, [rolls]);

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
      setRolls((prevRolls) => prevRolls + 1);
      audio.play();
      console.log(audio);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRolls(0);
      setTime((prevTime) => prevTime === 0);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const minute = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
  const second = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
  const millisecond = ("0" + ((time / 10) % 100)).slice(-2);

  const saveMinute = ("0" + Math.floor((saveTime / 60000) % 60)).slice(-2);
  const saveSecond = ("0" + Math.floor((saveTime / 1000) % 60)).slice(-2);
  const saveMillisecond = ("0" + ((saveTime / 10) % 100)).slice(-2);

  const bestTime = `${saveMinute}:${saveSecond}:${saveMillisecond}`;

  return (
    <main>
      <If condition={tenzies}>
        <Then>
          <div>
            <div className={style.Confetti}>
              <Confetti />
            </div>
          </div>
        </Then>
      </If>
      {/*    <div className={style.BestTime}>
        <h2>Best Time</h2>
        <p>{bestTime}</p>
      </div> */}
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
        <button onClick={rollDice} className={style.Tenzies__Roll}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className={style.Tenzies__Top}>
          <p className={style.Tenzies__Number}>Number of rolls: {rolls}</p>
          <div className={style.Tenzies__Time}>
            {minute}:{second}:{millisecond}
          </div>
        </div>
      </div>
    </main>
  );
}

import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import UserContext from "../Context/UserContext";
const words = "The quick brown fox jumps over the lazy dog";

const TypingGame = () => {
  //Counter
  const [seconds, setSeconds] = useState(0);
  //Usecontext
  const { scorelist, setscorelist, addScore } = useContext(UserContext);
  const [playing, setplaying] = useState(false);

  //Ref to store and compute the result data
  const score = useRef();
  const accuracy = useRef();

  //Input and word ref
  const textRef = useRef();
  const inputRef = useRef();

  //Ref to store the correct incorrect and total char in word
  const correctChar = useRef(0);
  const incorrectChar = useRef(0);
  const totalChar = useRef(0);

  //Counter useeffect
  useEffect(() => {
    let interval = null;
    if (playing) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!playing && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing, seconds]);

  //Handling the animation char color
  const textInputChange = () => {
    const spans = textRef.current.querySelectorAll("span");
    const inputValue = inputRef.current.value.split("");
    spans.forEach((charSpan, index) => {
      const inputChar = inputValue[index];
      if (inputChar == null) {
        charSpan.classList.remove("correct");
        charSpan.classList.remove("incorrect");
      } else if (inputChar === charSpan.innerText) {
        charSpan.classList.add("correct");
        charSpan.classList.remove("incorrect");
      } else {
        charSpan.classList.add("incorrect");
        charSpan.classList.remove("correct");
      }
    });
    if (spans.length === inputValue.length) {
      gameOver();
    }
  };

  function startGame() {
    setSeconds(0);
    setplaying(true);
    inputRef.current.value = "";

    //Focusing the textarea to start typing
    inputRef.current.disabled = false;
    inputRef.current.focus();

    accuracy.current = 0;
    incorrectChar.current = 0;
    correctChar.current = 0;
    totalChar.current = 0;
    inputRef.current.focus();
  }

  //Looping through all the char again and increament the correct and incorrect ref and  accuracy
  function getaccuracy() {
    const spans = textRef.current.querySelectorAll("span");
    totalChar.current = spans.length;
    spans.forEach((charSpan) => {
      if (charSpan.classList.contains("correct")) {
        correctChar.current = correctChar.current + 1;
        charSpan.classList.remove("correct");
      } else {
        incorrectChar.current = incorrectChar.current + 1;
        charSpan.classList.remove("incorrect");
      }
    });
    const accuracy = Math.floor(
      100 - (incorrectChar.current / totalChar.current) * 100
    );

    //Accuracy
    return accuracy;
  }

  function getCharPerMin() {
    const charPerMin = Math.floor((correctChar.current * 60) / seconds);
    score.current = charPerMin;
  }
  function gameOver() {
    setplaying(false);
    inputRef.current.disabled = true;

    //Populating result
    accuracy.current = getaccuracy();
    getCharPerMin();

    //Adding score to the database
    addScore({
      accuracy: accuracy.current,
      finishedIn: seconds,
      score: score.current,
    });

    //Adding data to the usestate to avoid any refresh and add data directly to the list
    const currentRun = {
      accuracy: accuracy.current,
      finishedIn: seconds,
      score: score.current,
      createdAt: new Date().getTime(),
    };
    setscorelist([...scorelist, currentRun]);
  }
  return (
    <div className="relative h-full grid gap-6 w-full mt-16 px-4">
      <div className=" grid md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-6 w-full ">
        <div className=" relative md:h-28 py-2  bg-AccentSecondary/80 flex items-center justify-around">
          <p className=" flex md:absolute md:bg-AccentPrimary bg-transparent  text-white text-sm top-[-10px] right-[-10px] px-4 py-1">
            Time Taken
          </p>
          <h3 className="text-4xl text-white">{seconds}'s</h3>
        </div>
        <div className=" relative  md:h-28  bg-[#86C8BC]/80 flex flex-col items-center justify-around py-2">
          <div className="flex items-center w-full justify-around">
            <p className=" flex md:absolute md:bg-AccentPrimary bg-transparent  text-white text-sm top-[-10px] right-[-10px] px-4 py-1">
              Accuracy
            </p>
            <h3 className="text-4xl  text-white">{accuracy.current}%</h3>
          </div>
          <div className="flex items-center w-full justify-around">
            <p>Correct words {correctChar.current}</p>
            <p>Correct words {incorrectChar.current}</p>
          </div>
        </div>
        <div className=" relative py-2 md:h-28  bg-[#86C8BC]/80 flex items-center justify-around ">
          <p className=" flex md:absolute md:bg-AccentPrimary bg-transparent  text-white text-sm top-[-10px] right-[-10px] px-4 py-1">
            Char / Min
          </p>
          <h3 className="text-4xl text-white">{score.current}</h3>
        </div>
      </div>
      <div ref={textRef} className="bg-AccentSecondary/10 p-4">
        {words.split("").map((word, index) => {
          return (
            <span className="text-3xl font-bold" key={index}>
              {word}
            </span>
          );
        })}
      </div>
      <textarea
        disabled
        type="text"
        ref={inputRef}
        rows={3}
        placeholder="Click on Start Game to play...."
        className="text-3xl font-bold p-4"
        onChange={textInputChange}
      />
      <button
        onClick={() => startGame()}
        className={` px-4 py-2 text-white rounded-3xl ${
          playing ? "bg-AccentSecondary" : "bg-AccentPrimary"
        } w-fit mx-auto`}
      >
        {playing ? "Playing" : "Start Game"}
      </button>
    </div>
  );
};

export default TypingGame;

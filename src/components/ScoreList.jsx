import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../Context/UserContext";

const ScoreList = () => {
  const { scorelist, fetchUserScoreList } = useContext(UserContext);

  useEffect(() => {
    fetchUserScoreList();
    console.log(scorelist);
  }, []);
  return (
    <div className="mx-4">
      <div className="flex gap-4 items-center my-6">
        <p className="text-2xl my-4">Previous Rounds</p>
        <hr className=" bg-AccentPrimary h-1 w-full" />
      </div>
      <ul className="flex flex-col gap-4">
        {scorelist?.map((score, index) => {
          return (
            <li
              key={index}
              className="flex justify-between relative group bg-AccentPrimary/10 px-4 py-4 hover:bg-AccentSecondary hover:text-white duration-100 transition-all cursor-pointer "
            >
              <div className="text-center">
                <p>Accuracy</p>
                <p>{score.accuracy}%</p>
              </div>
              <p className=" bg-AccentPrimary px-4 hidden group-hover:flex text-white absolute top-[-1rem] left-0">
                {new Date(score.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="text-center">
                <p>Time Taken</p>
                <p>{score.finishedIn}'s</p>
              </div>
              <div className="text-center">
                <p>Score char/min</p>
                <p>{score.score}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScoreList;

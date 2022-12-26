import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import UserContext from "../Context/UserContext";

const Leaderboard = () => {
  const { fetchleaderboard, leaderboard, user, getuser } =
    useContext(UserContext);
  useEffect(() => {
    fetchleaderboard();
    //Fetching user data even if page refresh
    getuser();
  }, []);
  return (
    <div className="w-full self-start mt-16 mx-4 ">
      <h2 className="my-6 text-4xl font-semibold  text-center">LeaderBoard </h2>
      <table className=" max-w-3xl w-full mx-auto">
        <thead className="text-xl w-full bg-AccentSecondary/50 h-14 text-white">
          <tr>
            <th>Rank</th>
            <th>UserID</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard?.map((player, index) => {
            return (
              <tr
                className={`w-full text-center h-11 ${
                  user._id === player._id ? "bg-AccentPrimary/20" : null
                } hover:bg-AccentPrimary/50 cursor-pointer duration-300 transition-all hover:text-white`}
                key={index}
              >
                <td>{index + 1}</td>
                <td>{player._id}</td>
                <td>{player.firstName}</td>
                <td>{player.highestScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

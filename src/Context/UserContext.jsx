import { useState } from "react";
import { createContext } from "react";
const UserContext = createContext();

export const UserState = ({ children }) => {
  const [leaderboard, setleaderboard] = useState([]);
  const [user, setuser] = useState([]);
  const [scorelist, setscorelist] = useState([]);

  const userAuth = () => {
    if (!localStorage.getItem("auth-token")) {
      return false;
    }
    return true;
  };

  const fetchUserScoreList = async () => {
    const response = await fetch(
      "https://typing-backend-three.vercel.app/api/score/fetchuserscore",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    const result = await response.json();
    setscorelist(result);
  };
  const addScore = async ({ accuracy, score, finishedIn }) => {
    const response = await fetch(
      "https://typing-backend-three.vercel.app/api/score/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          accuracy,
          score,
          finishedIn,
        }),
      }
    );
    const result = await response.json();
    if (result.success) {
      return true;
    } else {
      return result.msg;
    }
  };

  const getuser = async () => {
    const response = await fetch(
      "https://typing-backend-three.vercel.app/api/auth/getuser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    const result = await response.json();
    setuser(result);
  };

  const fetchleaderboard = async () => {
    try {
      const response = await fetch(
        "https://typing-backend-three.vercel.app/api/auth/leaderboard",
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setleaderboard(result);
    } catch (error) {}
  };

  const userlogout = () => {
    setuser([]);
    localStorage.removeItem("auth-token");
  };
  return (
    <UserContext.Provider
      value={{
        scorelist,
        setscorelist,
        fetchUserScoreList,
        user,
        setuser,
        getuser,
        addScore,
        fetchleaderboard,
        leaderboard,
        userlogout,
        userAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

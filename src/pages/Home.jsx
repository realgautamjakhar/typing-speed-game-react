import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ScoreList from "../components/ScoreList";

import TypingGame from "../components/TypingGame";
import UserContext from "../Context/UserContext";

const Home = () => {
  const { getuser } = useContext(UserContext);

  //Fetching user data even if page refresh
  useEffect(() => {
    getuser();
  }, []);
  return (
    <div className="w-full self-start">
      <TypingGame />
      <ScoreList />
    </div>
  );
};

export default Home;

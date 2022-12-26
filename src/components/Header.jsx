import React from "react";
import TypeWriter from "typewriter-effect";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, userlogout, userAuth } = useContext(UserContext);

  const handleLogout = () => {
    userlogout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between p-4">
      <NavLink to="/">
        <h4 className=" text-4xl font-bold text-AccentSecondary uppercase">
          <TypeWriter
            options={{
              strings: ["typeto"],
              autoStart: true,
              loop: true,
              delay: 100,
            }}
          />
        </h4>
      </NavLink>
      <nav className="hidden md:flex justify-between  gap-4">
        <NavLink to={"/leaderboard"}>
          <p className=" bg-AccentPrimary text-white px-4 py-2 uppercase text-sm rounded-3xl">
            LeaderBoard
          </p>
        </NavLink>
        {!user._id ? (
          <div className="flex gap-4">
            <NavLink to="/login">
              <button className=" bg-AccentPrimary text-white px-4 py-2 uppercase text-sm rounded-3xl">
                Login
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button className=" bg-AccentPrimary text-white px-4 py-2 uppercase text-sm rounded-3xl">
                Signup
              </button>
            </NavLink>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-AccentSecondary/75 text-white px-4 py-2 uppercase text-sm rounded-3xl"
          >
            Log out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;

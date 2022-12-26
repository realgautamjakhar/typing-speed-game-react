import React from "react";
import TypeWriter from "typewriter-effect";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { AiOutlineFire } from "react-icons/ai";
const Header = () => {
  const navigate = useNavigate();
  const { user, userlogout } = useContext(UserContext);
  const mobileMenuRef = useRef();
  const handleMenu = () => {
    mobileMenuRef.current.classList.toggle("mobile-menu-show");
  };
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

      <nav className="flex items-center gap-6">
        {user._id ? (
          <div className="flex flex-col items-center">
            <p className=" justify-self-end">
              HI{" "}
              <span className="text-lg text-AccentPrimary font-semibold">
                {user.firstName}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <AiOutlineFire className=" text-AccentSecondary" />
              {user.highestScore}
            </p>
          </div>
        ) : null}

        <button className="md:hidden" onClick={handleMenu}>
          Menu
        </button>
        <div className="hidden md:flex justify-between  gap-4 items-center">
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
        </div>
      </nav>

      <div className="hidden gap-6 md:hidden" ref={mobileMenuRef}>
        <button onClick={handleMenu} className=" absolute top-2 right-8">
          Close
        </button>
        <NavLink to={"/leaderboard"}>
          <p
            className=" text-AccentPrimary px-4 py-2 uppercase text-xl rounded-3xl"
            onClick={handleMenu}
          >
            LeaderBoard
          </p>
        </NavLink>
        {!user._id ? (
          <div className="flex flex-col gap-6">
            <NavLink to="/login">
              <button
                className=" text-AccentPrimary  px-4 py-2 uppercase text-xl rounded-3xl"
                onClick={handleMenu}
              >
                Login
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button
                className=" text-AccentPrimary  px-4 py-2 uppercase text-xl rounded-3xl"
                onClick={handleMenu}
              >
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
      </div>
    </header>
  );
};

export default Header;

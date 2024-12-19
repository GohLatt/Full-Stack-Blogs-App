import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

import CustomMenu from "./CustomMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className=" flex justify-between items-center max-w-[1300px] px-2 my-0 mx-auto py-2 text-gray-200">
      <div>
        <NavLink className="font-bold text-2xl" to="/">
          Full Stack Post
        </NavLink>
      </div>
      <ul className="flex items-center gap-4 list-none">
        {!token ? (
          <>
            <li className="close">
              <Button>
                <NavLink to={"/login"}>Login</NavLink>
              </Button>
            </li>
            <li className="close">
              <Button variant={"secondary"}>
                <NavLink to={"/register"}>Register</NavLink>
              </Button>
            </li>
          </>
        ) : (
          <>
            <li className="close">
              <Button>
                <NavLink to={"/create"}>Post Create</NavLink>
              </Button>
            </li>
            <li className="close">
              <Button variant={"secondary"}>
                <NavLink to={"/profile"}>Profile</NavLink>
              </Button>
            </li>
            <li className="close">
              <Button onClick={logOut} variant={"destructive"}>
                Log Out
              </Button>
            </li>
          </>
        )}
        <li className="menuOpen">
          <CustomMenu />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

import React, { useState } from "react";
import Loginpage from "../Login/Loginpage";
import Registerpage from "../Login/Registerpage";
import SearchIcon from "@mui/icons-material/Search";
import LogoIcon from "../../assests/Image 109.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);

  const openLoginPopup = () => {
    setLoginPopup(true);
    setRegisterPopup(false); // Close register popup if open
  };

  const openRegisterPopup = () => {
    setRegisterPopup(true);
    setLoginPopup(false); // Close login popup if open
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 h-20 w-full bg-white border-b flex items-center justify-between"
      style={{ zIndex: "99999" }}
    >
      {/* Logo */}
      <Link className="flex flex-row justify-center items-center w-[15%] h-full"  to="/">
        <div className="flex flex-row justify-center items-center w-full h-full">
          <img src={LogoIcon} alt="Logo" className="h-12 w-22 mr-2" />
          <div className="font-bold text-3xl text-black">ITEC</div>
        </div>
      </Link>

      {/* Navbar */}
      <nav className="w-[40%] h-full flex bg-[F3F4F6] items-center">
        <form className="relative">
          <input
            type="text"
            className="w-[399px] h-[50px] pl-12 pr-14 py-3 ml-[2%] rounded-3xl bg-gray-100 border border-transparent focus:outline-none focus:border-black"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-3 py-3"
          >
            <SearchIcon className="h-6 w-6 text-gray-400 hover:text-gray-700 cursor-pointer" />
          </button>
        </form>
      </nav>

      <div className="flex items-center justify-end w-[25%] h-full px-3">
        <button
          className="flex-grow-0 flex-shrink-0 bg-black text-white w-32 h-[42px] border border-zinc-900 px-4 py-2 rounded-[18px] mr-4 transition duration-300 ease-in-out hover:bg-gray-800 hover:border-gray-800"
          style={{ lineHeight: "1" }}
          onClick={openLoginPopup}
        >
          Login
        </button>
        <Loginpage trigger={loginPopup} setTrigger={setLoginPopup}></Loginpage>
        <button
          className="flex-grow-0 flex-shrink-0 bg-white w-32 h-[42px] border border-black px-4 py-2 rounded-[18px] text-zinc-900 transition duration-300 ease-in-out hover:bg-gray-200 hover:border-gray-800"
          style={{ lineHeight: "1" }}
          onClick={openRegisterPopup}
        >
          Sign Up
        </button>
        <Registerpage
          trigger={registerPopup}
          setTrigger={setRegisterPopup}
        ></Registerpage>
      </div>
    </header>
  );
};

export default Header;

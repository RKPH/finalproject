import React, { useState } from "react";
import Loginpage from "../Login/Loginpage";
import Registerpage from "../Login/Registerpage";
import User from "../API/User";
import { useNavigate } from "react-router-dom";
//icon
import SearchIcon from "@mui/icons-material/Search";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import "@fontsource/raleway";

import SettingsIcon from "@mui/icons-material/Settings";
//libray

import Tippy from "@tippyjs/react/headless";
import "tippy.js/themes/light.css";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../Hooks/UserSlice"; // Import the logoutSuccess action

const Header = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [inputValue, setInputValue] = useState("");
  const [results, setResult] = useState([]);
  const user = User(); // Fetching user data
  const fetchResult = async (value) => {
    try {
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/posts/search?keyword=${value}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      // Handle the data, e.g., set it to state or process it further
      setResult(data);
      console.log("result", data);
    } catch (error) {
      console.error("Error fetching result:", error);
      // Handle the error appropriately, e.g., show an error message
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        fetchResult(inputValue);
      }, 800)
    ); // Ghi log sau khi người dùng dừng gõ trong 1 giây
  };

  const handleInputBlur = () => {
    console.log(inputValue);
  };
  const openLoginPopup = () => {
    setLoginPopup(true);
    setRegisterPopup(false); // Close register popup if open
  };

  const openRegisterPopup = () => {
    setRegisterPopup(true);
    setLoginPopup(false); // Close login popup if open
  };

  const handleLogout = () => {
    dispatch(logoutSuccess()); // Dispatch the logoutSuccess action when the Logout button is clicked
    navigate("/");
  };
  return (
    <header
      className="fixed top-0 left-0 right-0 h-20 w-full bg-white border-b flex items-center justify-between shadow-lg border border-gray-300"
      style={{ zIndex: "99999" }}
    >
      {/* Logo */}
      <Link
        className="flex flex-row justify-center items-center w-[15%] h-full "
        to="/"
      >
        <div className="flex flex-row justify-center items-center w-full h-full">
          <div
            className="font-bold text-3xl text-blue-950 font-[Raleway]"
            style={{ fontFamily: "Raleway" }}
          >
            ITEC
          </div>
        </div>
      </Link>

      {/* Navbar */}

      <nav className="w-[40%] h-full flex bg-[F3F4F6] items-center ">
        <Tippy
          interactive
          arrow={true}
          placement="bottom-end"
          visible={isOpenSearch}
          onClickOutside={() => setIsOpenSearch(false)}
          render={(attrs) => (
            <div
              className="box min-h-[300px] w-[399px] overflow-y-auto justify-center flex px-2 py-2 bg-[whitesmoke] rounded-lg shadow-lg border border-gray-300 z-10"
              tabIndex="-1"
              {...attrs}
            >
              <div
                className="py-1 w-full h-full "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {results.length === 0 ? (
                  <div className="flex items-center justify-center h-fit">
                    <p className="text-gray-500">No results found.</p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between m-1 cursor-pointer">
                    {results.map((result, index) => (
                      <div
                        className="flex w-full hover:bg-white items-center py-1 px-2 mb-2 h-fit"
                        key={index}
                      >
                        <h1 className="font-semibold text-[18px] font-[monsterat] break-words whitespace-normal">
                          <Link to={`/post/${result.id}`}>
                            {" "}
                            <h1 className="text-black">{result.title}</h1>{" "}
                          </Link>
                        </h1>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        >
          <form className="relative">
            <input
              on
              onClickOutside={() => setIsOpenSearch(false)}
              onFocus={() => setIsOpenSearch(true)} // Hiển thị Tippy khi con trỏ chuột vào
              onChange={handleInputChange}
              value={inputValue}
              onBlur={handleInputBlur}
              type="text"
              className="w-[399px]  h-[50px] pl-12 pr-14 py-3 ml-[2%] rounded-3xl bg-gray-100 border border-transparent focus:outline-none focus:border-black"
              placeholder="Search..."
            />
            <button
              type="submit"
              onClick={()=>{ setIsOpenSearch(false)}}
              className="absolute right-0 top-0 h-full px-3 py-3"
            >
              <Link to={`/search?q=${inputValue}`}>
                <SearchIcon  className="h-6 w-6 text-gray-400 hover:text-gray-700 cursor-pointer" />
              </Link>
            </button>
          </form>
        </Tippy>
      </nav>

      <div className="flex items-center justify-end w-[25%] h-full px-3 ">
        {!isAuthenticated ? (
          <>
            <button
              className="flex-grow-0 flex-shrink-0 bg-blue-800 font-semibold text-white w-32 h-[42px]  px-4 py-2 rounded-[18px] mr-4 transition duration-300 ease-in-out hover:bg-blue-700"
              style={{ lineHeight: "1" }}
              onClick={openLoginPopup}
            >
              Login
            </button>
            <Loginpage
              trigger={loginPopup}
              setTrigger={setLoginPopup}
            ></Loginpage>
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
          </>
        ) : (
          <div className="flex flex-row items-center">
            <NotificationsNoneIcon
              className="h-8 w-8 text-black mr-4"
              style={{ height: "32px", width: "32px" }}
            />
            <Tippy
              interactive
              arrow={true}
              placement="bottom-end"
              visible={isOpen}
              onClickOutside={() => setIsOpen(false)}
              render={(attrs) => (
                <div
                  className="box h-[210px] w-[300px] overflow-y-auto justify-center flex px-2 py-2 bg-[whitesmoke] rounded-lg shadow-lg border border-gray-300 z-10"
                  tabIndex="-1"
                  {...attrs}
                >
                  <div
                    className="py-1 w-full "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center flex-col justify-start "
                    >
                      <div className="w-full h-[50px] px-4 border-b-2 border-black flex flex-row items-center justify-start m-1 cursor-pointer hover:bg-white">
                        {/* Replace div with Link */}
                        <Link
                          to={`/user/${user.id}`}
                          className="w-full h-full flex items-center text-black"
                        >
                          <div className="flex items-center">
                            <img
                              src={user.avatar}
                              alt="User Avatar"
                              className="h-10 w-10 rounded-full mr-2 border border-black"
                            />
                            <h1 className="font-semibold text-[18px] font-[monsterat]">
                              {user.username}
                            </h1>
                          </div>
                        </Link>
                      </div>
                      {/* <div
                        className="w-full h-[40px]  px-4  rounded-lg   cursor-pointer  hover:bg-white"
                        onClick={handleLogout}
                      >
                        <div className="flex h-full items-center">
                          <PeopleAltIcon className="h-4 w-4 mr-4" />
                          <span className="font-bold font-[monsterat]  text-[16px]">
                            {" "}
                            Manage your friend lists
                          </span>
                        </div>
                      </div> */}
                      <div
                        className="w-full h-[40px]  px-4  rounded-lg   cursor-pointer  hover:bg-white"
                        onClick={handleLogout}
                      >
                        <div className="flex h-full items-center">
                          <SettingsIcon className="h-4 w-4 mr-4" />
                          <span className="font-medium font-[monsterat]  text-[16px]">
                            {" "}
                            Manage your account
                          </span>
                        </div>
                      </div>
                      <div
                        className="w-full h-[40px]  px-4  rounded-lg   cursor-pointer m-1 hover:bg-white"
                        onClick={handleLogout}
                      >
                        <div className="flex h-full items-center">
                          <LogoutIcon className="h-4 w-4 mr-4" />
                          <span className="font-bold font-[monsterat]  text-[16px]">
                            Logout
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            >
              <img
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 rounded-full mr-4 cursor-pointer border border-black hover:fill-transparent"
                src={user.avatar}
                alt="User Avatar"
              />
            </Tippy>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
const Homepage = () => {
  const [selectedItem, setSelectedItem] = useState("For You");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <main className="min-h-[1000px] bg-white flex items-center justify-center">
      <div className="w-[95%] h-full  flex flex-row">
        <section
          className="w-[70%] h-full flex  flex-col  text-white overflow-y-auto border-r py-5 bg-white"
          style={{ zIndex: "0" }}
        >
          {/* menu */}

          <div className="w-full h-16  flex items-center justify-center  bg-white">
            <div className="w-[820px]  relative z-0  flex justify-evenly justify-items-center">
              <div
                className={`h-16 cursor-pointer ${
                  selectedItem === "For You" ? "selected font-bold" : ""
                }`}
                onClick={() => handleItemClick("For You")}
              >
                <div
                  className={`text-gray-500 text-lg leading-7 hover:text-black ${
                    selectedItem === "For You" ? "selected font-bold" : ""
                  }`}
                >
                  For You
                </div>
                {selectedItem === "For You" && (
                  <div className="w-full h-1 bg-zinc-900 transition-all duration-300 ease-in-out" />
                )}
              </div>
              <div
                className={`h-16 cursor-pointer ${
                  selectedItem === "Technology" ? "selected font-bold" : ""
                }`}
                onClick={() => handleItemClick("Technology")}
              >
                <div
                  className={`text-gray-500 text-lg  leading-7 hover:text-black ${
                    selectedItem === "Technology" ? "selected font-bold" : ""
                  }`}
                >
                  Technology
                </div>
                {selectedItem === "Technology" && (
                  <div className="w-full h-1 bg-zinc-900 transition-all duration-300 ease-in-out" />
                )}
              </div>
              <div
                className={`h-16 cursor-pointer ${
                  selectedItem === "Subscribed" ? "selected font-bold" : ""
                }`}
                onClick={() => handleItemClick("Subscribed")}
              >
                <div
                  className={`text-gray-500 text-lg  leading-7 hover:text-black ${
                    selectedItem === "Subscribed" ? "selected font-bold" : ""
                  }`}
                >
                  Subscribed
                </div>
                {selectedItem === "Subscribed" && (
                  <div className="w-full h-1 bg-zinc-900 transition-all duration-300 ease-in-out" />
                )}
              </div>

              <div
                className={`h-16 cursor-pointer ${
                  selectedItem === "Productivity" ? "selected font-bold" : ""
                }`}
                onClick={() => handleItemClick("Productivity")}
              >
                <div
                  className={`text-gray-500 text-lg   leading-7 hover:text-black ${
                    selectedItem === "Productivity" ? "selected font-bold" : ""
                  }`}
                >
                  Productivity
                </div>
                {selectedItem === "Productivity" && (
                  <div className="w-full h-1 bg-zinc-900 transition-all duration-3000 ease-in-out" />
                )}
              </div>
              <div
                className={`h-16 cursor-pointer ${
                  selectedItem === "Cinema" ? "selected font-bold" : ""
                }`}
                onClick={() => handleItemClick("Cinema")}
              >
                <div
                  className={`text-gray-500 text-lg  leading-7 hover:text-black ${
                    selectedItem === "Cinema" ? "selected font-bold" : ""
                  }`}
                >
                  Cinema
                </div>
                {selectedItem === "Cinema" && (
                  <div className="w-full h-1 bg-zinc-900 transition-all duration-300 ease-in-out" />
                )}
              </div>
              <TuneRoundedIcon
                className="cursor-pointer hover: hover:scale-110"
                style={{
                  color: "black",
                  backgroundColor: "lightgray",
                  borderRadius: "18px",
                }}
              />
            </div>
          </div>

          {/* Menu */}

          {/* MAIN POSTS      */}
          <div className="w-full h-[642px] bg-white flex justify-center mb-8">
            <div className="w-[800px] h-full  flex flex-col justify-evenly border border-[lightGray] rounded-[18px] px-1">
              <img
                src="https://media.istockphoto.com/id/499808819/vi/anh/nh%C3%ACn-t%E1%BB%AB-tr%C3%AAn-kh%C3%B4ng-khi-%E1%BB%9F-tr%C3%AAn-m%C3%A1y-bay.jpg?s=2048x2048&w=is&k=20&c=e46VwISQwxho9bvK_2-IMng0u9kdRYJWLA3by5sjLKk="
                alt=""
                style={{ height: "380px", width: "100%" }}
                className="rounded-tl-[18px] rounded-tr-[18px]"
              />
              <div>
                <h1 className="font-extrabold text-[32px]  font-['Bitter'] leading-[48px] text-black text-left hover:underline">
                  {" "}
                  NARUTO, A HERO OR A MONSTER ??
                </h1>
              </div>
              <div>
                <p className="text-zinc-900 w-[700px] text-sm font-normal font-['Raleway'] leading-snug text-justify h-[66px] text-wrap">
                  For many, the concept of blockchain can seem perplexing and
                  shrouded in mystery. Its intricate technical aspects, complex
                  terminologies, and abstract explanations have left even the
                  most seasoned individuals scratching their heads. It's as if
                  the creators of blockchain...
                </p>
              </div>
              <div className="w-full h-7 flex flex-row">
                <section className="w-[50%] h-full flex flex-row items-center ">
                  <button className="text-gray-600 w-[44px] h-full text-xs font-normal font-['Raleway'] leading-tight rounded-xl border border-black mr-[12px]">
                    popular
                  </button>
                  <div className="text-gray-600 w-[76px] h-full text-xs font-normal font-['Raleway'] leading-tight rounded-xl text-center flex justify-center items-center bg-gray-100 mr-[12px] ">
                    8 min read
                  </div>
                  <div className="text-zinc-700 text-xs font-light font-['Raleway'] leading-tight flex flex-row items-center mr-[12px]">
                    <i>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.99998 6.3C6.49703 6.3 6.89998 5.89706 6.89998 5.4C6.89998 4.90294 6.49703 4.5 5.99998 4.5C5.50292 4.5 5.09998 4.90294 5.09998 5.4C5.09998 5.89706 5.50292 6.3 5.99998 6.3Z"
                          fill="#323842"
                        />
                        <path
                          d="M1.62271 6.3546C1.5436 6.2531 1.50044 6.1282 1.5 5.99951C1.49957 5.87082 1.54189 5.74563 1.62031 5.6436C2.22661 4.8486 3.86581 3 6.00001 3C8.10601 3 9.76081 4.8474 10.3755 5.643C10.455 5.74504 10.4981 5.87067 10.4981 6C10.4981 6.12933 10.455 6.25496 10.3755 6.357C9.76081 7.1526 8.10601 9 6.00001 9C3.89401 9 2.23591 7.1484 1.62271 6.3546Z"
                          stroke="#323842"
                          stroke-width="0.72"
                          stroke-miterlimit="10"
                          stroke-linecap="square"
                        />
                        <path
                          d="M5.99998 7.8C7.32546 7.8 8.39998 6.72548 8.39998 5.4C8.39998 4.07452 7.32546 3 5.99998 3C4.67449 3 3.59998 4.07452 3.59998 5.4C3.59998 6.72548 4.67449 7.8 5.99998 7.8Z"
                          stroke="#323842"
                          stroke-width="0.72"
                          stroke-miterlimit="10"
                          stroke-linecap="square"
                        />
                        <path
                          d="M5.99998 6.3C6.49703 6.3 6.89998 5.89706 6.89998 5.4C6.89998 4.90294 6.49703 4.5 5.99998 4.5C5.50292 4.5 5.09998 4.90294 5.09998 5.4C5.09998 5.89706 5.50292 6.3 5.99998 6.3Z"
                          stroke="#323842"
                          stroke-width="0.72"
                          stroke-miterlimit="10"
                          stroke-linecap="square"
                        />
                      </svg>
                    </i>{" "}
                    1.8M
                  </div>
                  <div className="text-zinc-700 text-xs font-light font-['Raleway'] leading-tight flex flex-row items-center">
                    <i>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.90002 3.90002C10.0592 3.90002 10.2118 3.96324 10.3243 4.07576C10.4368 4.18828 10.5 4.34089 10.5 4.50002V7.80002C10.5 7.95915 10.4368 8.11177 10.3243 8.22429C10.2118 8.33681 10.0592 8.40002 9.90002 8.40002H9.30002L9.30002 9.90002L7.20002 8.40002H5.40002"
                          stroke="#323842"
                          stroke-width="0.72"
                          stroke-miterlimit="10"
                          stroke-linecap="square"
                        />
                        <path
                          d="M8.1 1.80005L2.1 1.80005C1.94087 1.80005 1.78826 1.86326 1.67574 1.97578C1.56321 2.08831 1.5 2.24092 1.5 2.40005L1.5 6.30005C1.5 6.45918 1.56321 6.61179 1.67574 6.72431C1.78826 6.83683 1.94087 6.90005 2.1 6.90005H3L3 9.00005L5.4 6.90005L8.1 6.90005C8.25913 6.90005 8.41174 6.83683 8.52426 6.72431C8.63679 6.61179 8.7 6.45918 8.7 6.30005V2.40005C8.7 2.24092 8.63679 2.08831 8.52426 1.97578C8.41174 1.86326 8.25913 1.80005 8.1 1.80005Z"
                          stroke="#323842"
                          stroke-width="0.72"
                          stroke-miterlimit="10"
                          stroke-linecap="square"
                        />
                      </svg>
                    </i>{" "}
                    4k
                  </div>
                </section>
                <section className="w-[50%] h-full flex flex-row justify-end items-center mr-1">
                  <BookmarkBorderRoundedIcon
                    style={{ color: "black" }}
                    className="mr-1 hover:scale-110"
                  />
                  <div className="w-6 h-6 bg-zinc-300 rounded-xl mr-1" />
                  <div className="text-gray-700 text-sm font-semibold font-['Raleway'] leading-snug">
                    Benjamin Foster
                  </div>
                </section>
              </div>
            </div>
          </div>
          {/* MAIN POSTS      */}
          {[1, 1, 1, 1, 1].map(() => {
            return (
              <div className="w-full h-[212px]  flex justify-center mb-8">
                <div className="w-[800px] h-full  flex flex-row px-[12px] py-[12px]  border border-[lightGray]">
                  <section className="w-[65%] h-full  flex  flex-col justify-between">
                    <div className="w-[324px]  text-zinc-900 text-2xl font-normal font-['Bitter'] leading-9 text-wrap text-justify hover:underline">
                      The economics behind unpaid internship
                    </div>
                    <div className="w-[396px] text-zinc-900 text-base font-normal font-['Raleway'] leading-tight text-justify">
                      Corporates contend that unpaid internships serve as a
                      stepping stone towards future employment, offering
                      invaluable industry exposure...
                    </div>
                    <div className="w-full h-7 flex flex-row items-center">
                      <button className="text-gray-600 w-[44px] h-full text-xs font-normal font-['Raleway'] leading-tight rounded-xl  border border-black mr-[12px]">
                        popular
                      </button>
                      <div className="text-gray-600 w-[76px] h-full text-xs font-normal font-['Raleway'] leading-tight rounded-xl text-center flex justify-center items-center bg-gray-100 mr-[12px] ">
                        8 min read
                      </div>
                      <div className="text-zinc-700 text-xs font-light font-['Raleway'] leading-tight flex flex-row items-center mr-[12px]">
                        <i>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.99998 6.3C6.49703 6.3 6.89998 5.89706 6.89998 5.4C6.89998 4.90294 6.49703 4.5 5.99998 4.5C5.50292 4.5 5.09998 4.90294 5.09998 5.4C5.09998 5.89706 5.50292 6.3 5.99998 6.3Z"
                              fill="#323842"
                            />
                            <path
                              d="M1.62271 6.3546C1.5436 6.2531 1.50044 6.1282 1.5 5.99951C1.49957 5.87082 1.54189 5.74563 1.62031 5.6436C2.22661 4.8486 3.86581 3 6.00001 3C8.10601 3 9.76081 4.8474 10.3755 5.643C10.455 5.74504 10.4981 5.87067 10.4981 6C10.4981 6.12933 10.455 6.25496 10.3755 6.357C9.76081 7.1526 8.10601 9 6.00001 9C3.89401 9 2.23591 7.1484 1.62271 6.3546Z"
                              stroke="#323842"
                              stroke-width="0.72"
                              stroke-miterlimit="10"
                              stroke-linecap="square"
                            />
                            <path
                              d="M5.99998 7.8C7.32546 7.8 8.39998 6.72548 8.39998 5.4C8.39998 4.07452 7.32546 3 5.99998 3C4.67449 3 3.59998 4.07452 3.59998 5.4C3.59998 6.72548 4.67449 7.8 5.99998 7.8Z"
                              stroke="#323842"
                              stroke-width="0.72"
                              stroke-miterlimit="10"
                              stroke-linecap="square"
                            />
                            <path
                              d="M5.99998 6.3C6.49703 6.3 6.89998 5.89706 6.89998 5.4C6.89998 4.90294 6.49703 4.5 5.99998 4.5C5.50292 4.5 5.09998 4.90294 5.09998 5.4C5.09998 5.89706 5.50292 6.3 5.99998 6.3Z"
                              stroke="#323842"
                              stroke-width="0.72"
                              stroke-miterlimit="10"
                              stroke-linecap="square"
                            />
                          </svg>
                        </i>{" "}
                        1.8M
                      </div>
                      <div className="text-zinc-700 text-xs font-light font-['Raleway'] leading-tight flex flex-row items-center">
                        <i>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.90002 3.90002C10.0592 3.90002 10.2118 3.96324 10.3243 4.07576C10.4368 4.18828 10.5 4.34089 10.5 4.50002V7.80002C10.5 7.95915 10.4368 8.11177 10.3243 8.22429C10.2118 8.33681 10.0592 8.40002 9.90002 8.40002H9.30002L9.30002 9.90002L7.20002 8.40002H5.40002"
                              stroke="#323842"
                              stroke-width="0.72"
                              stroke-miterlimit="10"
                              stroke-linecap="square"
                            />
                            <path
                              d="M8.1 1.80005L2.1 1.80005C1.94087 1.80005 1.78826 1.86326 1.67574 1.97578C1.56321 2.08831 1.5 2.24092 1.5 2.40005L1.5 6.30005C1.5 6.45918 1.56321 6.61179 1.67574 6.72431C1.78826 6.83683 1.94087 6.90005 2.1 6.90005H3L3 9.00005L5.4 6.90005L8.1 6.90005C8.25913 6.90005 8.41174 6.83683 8.52426 6.72431C8.63679 6.61179 8.7 6.45918 8.7 6.30005V2.40005C8.7 2.24092 8.63679 2.08831 8.52426 1.97578C8.41174 1.86326 8.25913 1.80005 8.1 1.80005Z"
                              stroke="#323842"
                              stroke-width="0.72"
                              stroke-miterlimit="10"
                              stroke-linecap="square"
                            />
                          </svg>
                        </i>{" "}
                        4k
                      </div>
                      <i className="mr-1 cursor-pointer hover:scale-110">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 8.33337C9.08337 8.33337 8.33337 9.08337 8.33337 10C8.33337 10.9167 9.08337 11.6667 10 11.6667C10.9167 11.6667 11.6667 10.9167 11.6667 10C11.6667 9.08337 10.9167 8.33337 10 8.33337ZM10 3.33337C9.08337 3.33337 8.33337 4.08337 8.33337 5.00004C8.33337 5.91671 9.08337 6.66671 10 6.66671C10.9167 6.66671 11.6667 5.91671 11.6667 5.00004C11.6667 4.08337 10.9167 3.33337 10 3.33337ZM10 13.3334C9.08337 13.3334 8.33337 14.0834 8.33337 15C8.33337 15.9167 9.08337 16.6667 10 16.6667C10.9167 16.6667 11.6667 15.9167 11.6667 15C11.6667 14.0834 10.9167 13.3334 10 13.3334Z"
                            fill="#323842"
                          />
                        </svg>
                      </i>
                      <BookmarkBorderRoundedIcon
                        style={{ color: "black" }}
                        className="mr-1 hover:scale-110"
                      />
                      <div className="w-6 h-6 bg-zinc-300 rounded-xl mr-1" />
                      <div className="text-gray-700 text-sm font-semibold font-['Raleway'] leading-snug">
                        Benjamin Foster
                      </div>
                    </div>
                  </section>
                  <section className="w-[45%] h-full  flex ">
                    <img
                      src="https://media.istockphoto.com/id/1131272545/vi/anh/ng%C6%B0%E1%BB%9Di-kh%E1%BB%95ng-l%E1%BB%93-hi%E1%BB%81n-l%C3%A0nh.jpg?s=2048x2048&w=is&k=20&c=4gatUTAdzPSwIiFSHT_-Tj7xNrJuJqjehU4FKA1eVT8="
                      alt=""
                      style={{ height: "80%", width: "100%" }}
                      className="rounded-tl-[18px] rounded-tr-[18px]"
                    />
                  </section>
                </div>
              </div>
            );
          })}
        </section>

        <section className="w-[30%] h-full bg-yellow-100 sticky py-5 px-2 flex justify-start">
          <button className="w-[166px] h-11 relative bg-indigo-500 rounded-[22px] flex justify-evenly  hover:bg-indigo-600 focus:outline-none">
            <div className="left-[16px] top-[9px]  absolute text-white text-base font-normal font-['Raleway'] leading-relaxed flex flex-row items-center ">
              <p className="mr-2">Draft an article</p>
              <span>
                <i>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5L15 8"
                      stroke="white"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 3L17 6L7 16L3 17L4 13L14 3Z"
                      stroke="white"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </i>
              </span>
            </div>
          </button>
        </section>
      </div>
    </main>
  );
};

export default Homepage;

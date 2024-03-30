import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Loading from "../../assests/Loading_icon.gif";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";
import { fetchAPI } from "../../Components/API/fetchAPI";
import Cateogry from "../../Components/API/Cateogry";
const Homepage = () => {
  // const Category = Cateogry();
  // Assume Cateogry is a custom hook that fetches data and uses hooks
  const Category = Cateogry(); // Call it at the top level of your component

  const [selectedItem, setSelectedItem] = useState(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (Category.length > 0) {
      setSelectedItem(Category[0].name);
    }
  }, [Category]); // Add Category as a dependency so the effect runs whenever Category changes

  const handleItemClick = (item) => {
    setSelectedItem(item);
    const randomIndex = Math.floor(Math.random() * data.content.length);
    setIndex(randomIndex);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAPI();

        setData(result);

        console.log("Data fetched at home:", data);
        if (result.content) {
          const randomIndex = Math.floor(Math.random() * result.content.length);
          setIndex(randomIndex);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // const randomIndex = Math.floor(Math.random() * data.content.length);
    // setIndex(randomIndex)
  }, []);

  if (isLoading) {
    return (
      <div className="w-full  min-h-screen flex items-center justify-center">
        <img className="w-[300px] h-[300px]" src={Loading} alt="load" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const extractFirstParagraph = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const firstParagraph = doc.querySelector("p");
    return firstParagraph ? firstParagraph.outerHTML : "";
  };

  // Extracting the first paragraph
  const firstParagraph = extractFirstParagraph(data.content[index].text);

  // Function to truncate the text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Truncate the first paragraph
  const truncatedFirstParagraph = truncateText(firstParagraph, 190);
  return (
    <main className="min-h-[1000px] bg-white flex items-center justify-center">
      <div className="w-[95%] h-full  flex flex-row">
        <section
          className="w-[70%]   overflow-auto  flex  flex-col  text-white border-r py-10 bg-white"
          style={{ zIndex: "0" }}
        >
          {/* menu */}

          <div className="w-full h-16  flex items-center justify-center  bg-white">
            <div className="w-[820px]  relative z-0  flex justify-evenly justify-items-center">
              {Category.map((item) => (
                <div
                  key={item.id}
                  className={`h-8 uppercase cursor-pointer ${
                    selectedItem === item.name ? "selected font-bold" : ""
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  <div
                    className={`text-gray-500 text-base leading-5 hover:text-black ${
                      selectedItem === item.name ? "selected font-bold" : ""
                    }`}
                  >
                    {item.name}
                  </div>
                  {selectedItem === item.name && (
                    <div className="w-full h-1 bg-zinc-900 transition-all duration-300 ease-in-out" />
                  )}
                </div>
              ))}

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
          <div className="w-full h-fit bg-white flex justify-center mb-8">
            <div className="w-[800px] h-full flex-col justify-evenly border px-3 py-3 shadow-lg border-[lightGray] rounded-[18px] flex items-start">
              <div
                className="w-full h-[300px] rounded-tl-[18px] rounded-tr-[18px] mb-4"
                style={{
                  backgroundImage: `url(${data.content[index].post_background_img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div>
                <Link
                  to="i"
                  className="font-bold text-xl font-['Bitter'] leading-[18px] text-black cursor-pointer text-left hover:underline"
                >
                  {data.content[index].title}
                </Link>
              </div>
              <div className="py-4">
                {/* Display only the first 100-150 characters of the text */}
                <p
                  className="text-zinc-900 w-[700px] text-base font-normal font-['Raleway'] leading-snug text-justify h-fit text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: truncatedFirstParagraph,
                  }}
                />
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
                        {/* SVG Path */}
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
                        {/* SVG Path */}
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
                  <img
                    src={data.content[index].user.avatar}
                    alt="user"
                    className="w-6 h-6 rounded-xl mr-2"
                  />
                  <div className="text-gray-700 text-sm font-semibold font-['Raleway'] leading-snug">
                    {data.content[index].user.username}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* MAIN POSTS      */}
          {data.content
            .filter((item) => item.category.name === selectedItem)
            .map((item) => {
              const extractFirstParagraph = (htmlString) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, "text/html");
                const firstParagraph = doc.querySelector("p");
                return firstParagraph ? firstParagraph.outerHTML : "";
              };

              // Extracting the first paragraph
              const firstParagraph = extractFirstParagraph(item.text);

              // Function to truncate the text
              const truncateText = (text, maxLength) => {
                if (text.length <= maxLength) return text;
                return text.substring(0, maxLength) + "...";
              };

              // Truncate the first paragraph
              const truncatedFirstParagraph = truncateText(firstParagraph, 190);

              return (
                <div
                  key={item.id}
                  className="w-full h-[290px]  flex justify-center mb-8"
                >
                  <div className="w-[800px] h-full  flex flex-row px-[11px] py-[12px]  shadow-lg rounded-3xl border border-[lightGray]">
                    <section className="w-[65%] h-full  flex  flex-col justify-between px-1">
                      <Link
                        to={`/post/${item.id}`}
                        className="w-full text-zinc-900 text-xl font-semibold font-['Bitter'] leading-9 text-wrap text-start hover:underline"
                      >
                        {item.title}
                      </Link>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncatedFirstParagraph,
                        }}
                        className="bg-red-50 w-[396px] text-zinc-900 text-sm font-normal font-['Raleway'] leading-tight text-justify whitespace-normal break-words "
                      />
                      <div className="w-full h-7 flex flex-row items-center">
                        <button className="text-gray-600 py-1 px-2 h-full text-xs font-normal font-['Raleway'] leading-tight rounded-xl border border-black mr-[12px] hover:bg-gray-100 inline-block">
                          {item.category.name}
                        </button>

                        <div className="text-gray-600 w-[76px] h-full text-xs font-normal font-['Raleway'] leading-tight rounded-xl text-center flex justify-center items-center bg-gray-100 mr-[12px] ">
                          8 min read
                        </div>
                        <div className="text-zinc-700 text-xs font-light font-['Raleway'] leading-tight flex flex-row items-center mr-[12px] cursor-pointer hover:underline">
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
                                strokeWidth="0.72"
                                strokeMiterlimit="10"
                                strokeLinecap="square"
                              />
                              <path
                                d="M5.99998 7.8C7.32546 7.8 8.39998 6.72548 8.39998 5.4C8.39998 4.07452 7.32546 3 5.99998 3C4.67449 3 3.59998 4.07452 3.59998 5.4C3.59998 6.72548 4.67449 7.8 5.99998 7.8Z"
                                stroke="#323842"
                                strokeWidth="0.72"
                                strokeMiterlimit="10"
                                strokeLinecap="square"
                              />
                              <path
                                d="M5.99998 6.3C6.49703 6.3 6.89998 5.89706 6.89998 5.4C6.89998 4.90294 6.49703 4.5 5.99998 4.5C5.50292 4.5 5.09998 4.90294 5.09998 5.4C5.09998 5.89706 5.50292 6.3 5.99998 6.3Z"
                                stroke="#323842"
                                strokeWidth="0.72"
                                strokeMiterlimit="10"
                                strokeLinecap="square"
                              />
                            </svg>
                          </i>{" "}
                          1.8M
                        </div>
                        <div className="text-zinc-700 text-xs font-light font-['Raleway'] leading-tight flex flex-row items-center cursor-pointer hover:underline">
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
                                strokeWidth="0.72"
                                strokeMiterlimit="10"
                                strokeLinecap="square"
                              />
                              <path
                                d="M8.1 1.80005L2.1 1.80005C1.94087 1.80005 1.78826 1.86326 1.67574 1.97578C1.56321 2.08831 1.5 2.24092 1.5 2.40005L1.5 6.30005C1.5 6.45918 1.56321 6.61179 1.67574 6.72431C1.78826 6.83683 1.94087 6.90005 2.1 6.90005H3L3 9.00005L5.4 6.90005L8.1 6.90005C8.25913 6.90005 8.41174 6.83683 8.52426 6.72431C8.63679 6.61179 8.7 6.45918 8.7 6.30005V2.40005C8.7 2.24092 8.63679 2.08831 8.52426 1.97578C8.41174 1.86326 8.25913 1.80005 8.1 1.80005Z"
                                stroke="#323842"
                                strokeWidth="0.72"
                                strokeMiterlimit="10"
                                strokeLinecap="square"
                              />
                            </svg>
                          </i>{" "}
                          {item.comments.length +
                            item.comments.reduce(
                              (totalReplies, comment) =>
                                totalReplies + comment.replyComments.length,
                              0
                            )}{" "}
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
                        <img
                          src={item.user.avatar}
                          alt="user"
                          className="w-6 h-6 bg-zinc-300 rounded-xl mr-1"
                        />
                        <div className="text-gray-700 text-sm font-semibold font-['Raleway'] leading-snug cursor-pointer hover:underline">
                          {item.user.username}
                        </div>
                      </div>
                    </section>
                    <section className="w-[45%] h-full  flex bg-blue-50  justify-center">
                      <img
                        src={item.post_background_img}
                        alt=""
                        // style={{ height: "80%", width: "70%" }}
                        className="rounded-tl-[18px] w-full h-full rounded-[18px]"
                      />
                    </section>
                  </div>
                </div>
              );
            })}
        </section>

        <section className="w-[30%] h-full  sticky top-0  py-5 px-5 flex justify-start flex-col">
          <Link to="/upload">
            <button className="w-[166px] h-11 relative bg-indigo-500 rounded-[22px] flex justify-evenly mb-4 hover:bg-indigo-600 focus:outline-none">
              <div className="left-[16px] top-[9px] absolute text-white text-base font-normal font-['Raleway'] leading-relaxed flex flex-row items-center">
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
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 3L17 6L7 16L3 17L4 13L14 3Z"
                        stroke="white"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </i>
                </span>
              </div>
            </button>
          </Link>

          <div className="w-full flex justify-between flex-col py-5  mb-4">
            <span className="w-full text-start text-zinc-900 text-2xl font-semibold font-['Raleway'] leading-9 flex flex-row items-center ">
              {" "}
              <i>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3333 13.8854L18.6666 19.2187L26.276 11.6094L29.3333 14.6667L29.3333 6.66675L21.3333 6.66675L24.3906 9.72408L18.6666 15.4481L13.3333 10.1147L3.05731 20.3907L4.94265 22.2761L13.3333 13.8854Z"
                    fill="#171A1F"
                  />
                </svg>
              </i>{" "}
              Popular{" "}
            </span>

            {/* baif viet top 1 */}
            {[1, 1, 1, 1].map(() => (
              <div
                key={uuidv4()}
                className="w-[310px] h-[118px] flex flex-col justify-evenly my-2"
              >
                <div className="w-[286px] text-zinc-900 text-lg font-medium font-['Bitter']  text-start  cursor-pointer hover:underline">
                  #1: So, exactly at which point does productivity turn toxic?{" "}
                </div>
                <div className="w-full flex items-center">
                  <div className="w-[50%]  flex flex-row">
                    <div className="text-zinc-700 text-xs font-light font-['Raleway'] leading-tight flex flex-row items-center mr-[12px] cursor-pointer hover:underline">
                      <i>
                        <svg
                          width="15"
                          height="15"
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
                            strokeWidth="0.92"
                            strokeLinecap="square"
                          />
                          <path
                            d="M5.99998 7.8C7.32546 7.8 8.39998 6.72548 8.39998 5.4C8.39998 4.07452 7.32546 3 5.99998 3C4.67449 3 3.59998 4.07452 3.59998 5.4C3.59998 6.72548 4.67449 7.8 5.99998 7.8Z"
                            stroke="#323842"
                            strokeWidth="0.92"
                            strokeLinecap="square"
                          />
                          <path
                            d="M5.99998 6.3C6.49703 6.3 6.89998 5.89706 6.89998 5.4C6.89998 4.90294 6.49703 4.5 5.99998 4.5C5.50292 4.5 5.09998 4.90294 5.09998 5.4C5.09998 5.89706 5.50292 6.3 5.99998 6.3Z"
                            stroke="#323842"
                            strokeWidth="0.92"
                            strokeLinecap="square"
                          />
                        </svg>
                      </i>{" "}
                      21.8M
                    </div>
                    <div className="text-zinc-700 text-xs font-light font-['Raleway'] leading-tight flex flex-row items-center cursor-pointer hover:underline">
                      <i>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.90002 3.90002C10.0592 3.90002 10.2118 3.96324 10.3243 4.07576C10.4368 4.18828 10.5 4.34089 10.5 4.50002V7.80002C10.5 7.95915 10.4368 8.11177 10.3243 8.22429C10.2118 8.33681 10.0592 8.40002 9.90002 8.40002H9.30002L9.30002 9.90002L7.20002 8.40002H5.40002"
                            stroke="#323842"
                            strokeWidth="0.72"
                            strokeLinecap="square"
                          />
                          <path
                            d="M8.1 1.80005L2.1 1.80005C1.94087 1.80005 1.78826 1.86326 1.67574 1.97578C1.56321 2.08831 1.5 2.24092 1.5 2.40005L1.5 6.30005C1.5 6.45918 1.56321 6.61179 1.67574 6.72431C1.78826 6.83683 1.94087 6.90005 2.1 6.90005H3L3 9.00005L5.4 6.90005L8.1 6.90005C8.25913 6.90005 8.41174 6.83683 8.52426 6.72431C8.63679 6.61179 8.7 6.45918 8.7 6.30005V2.40005C8.7 2.24092 8.63679 2.08831 8.52426 1.97578C8.41174 1.86326 8.25913 1.80005 8.1 1.80005Z"
                            stroke="#323842"
                            strokeWidth="0.72"
                            strokeLinecap="square"
                          />
                        </svg>
                      </i>{" "}
                      44k
                    </div>
                  </div>
                  <div className="w-50%   flex flex-row items-center">
                    <BookmarkBorderRoundedIcon
                      style={{ color: "black", height: "14px", width: "14px" }}
                      className="mr-1 hover:scale-110"
                    />
                    <div className="w-6 h-6 bg-zinc-300 rounded-xl mr-1" />
                    <div className="text-gray-700 text-xs font-semibold font-['Raleway'] leading-snug cursor-pointer hover:underline">
                      Benjamin Foster
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* baif viet top 1 */}

            <div className="text-indigo-500 text-sm font-normal font-['Raleway'] leading-snug text-start mb-5">
              See all
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px #DEE1E6 solid",
              }}
            ></div>
          </div>

          <div className="w-full flex justify-between flex-col py-5 px-2 bg-red-50 mb-4">
            <span className="w-full text-start text-zinc-900 text-2xl font-semibold font-['Raleway'] leading-9 flex flex-row items-center mb-5">
              {" "}
              <i>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 26.4L5.59998 12"
                    stroke="#171A1F"
                    strokeWidth="1.92"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M19.2 4.80005L27.2 12.8"
                    stroke="#171A1F"
                    strokeWidth="1.92"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M10.8 21.2L4.79999 27.2"
                    stroke="#171A1F"
                    strokeWidth="1.92"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M25.6 11.2L17.6 24"
                    stroke="#171A1F"
                    strokeWidth="1.92"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M8 14.4L20.8 6.40002"
                    stroke="#171A1F"
                    strokeWidth="1.92"
                    strokeMiterlimit="10"
                  />
                </svg>
              </i>{" "}
              People to follow
            </span>

            {/* baif viet top 1 */}

            {/* baif viet top 1 */}

            {/* baif viet top 2 */}

            {/* baif viet top 3*/}

            {/* Bài viet top 4 */}

            <div className="text-indigo-500 text-sm font-normal font-['Raleway'] leading-snug text-start mb-5">
              See all
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px #DEE1E6 solid",
              }}
            ></div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Homepage;

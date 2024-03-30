import React, { Fragment, useState, useEffect } from "react";
import User from "../../Components/API/User";
import { Link } from "react-router-dom";
import { fetchAPI } from "../../Components/API/fetchAPI";
import { useSelector } from "react-redux";
import axios from "axios";

// Material UI Icons
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import CreateIcon from "@mui/icons-material/Create";
import LaunchIcon from "@mui/icons-material/Launch";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//Mui Components
import Tippy from "@tippyjs/react/headless";
import "tippy.js/themes/light.css";


// Custom Components
import PostTransition from "./PostTransittion";
import UserTransition from "./UserTransittion";

//css
import "./index.css";

const Index = () => {
  const user = User();
  const token = useSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] = useState({}); // State to store selected post [Optional
  const [userPosts, setUserPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to manage modal of post visibility
  const [UserModal, setUserModal] = useState(false); // State to manage editing of post [Optional
  const [isOpenMap, setIsOpenMap] = useState({});
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAPI();
        setData(result.content);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data received:", data);
    if (data.length > 0 && user && user.id) {
      const filteredPosts = data.filter(
        (post) => post.user && post.user.id === user.id
      );
      console.log("Filtered posts:", filteredPosts);
      setUserPosts(filteredPosts);
      setIsLoading(false)
    }
  }, [data, user]);
  const toggleTippy = (postId) => {
    setIsOpenMap((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle visibility
    }));
  };

  const deletePost = async (postId) => {
    try {
      // Make API call to delete the post
      await fetch(`https://englishforum.zeabur.app/api/v1/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Update userPosts state after successful deletion
      setUserPosts(userPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error if any
    }
  };

  const getSeclectedPost = (postId) => {
    const selectedPost = userPosts.find((post) => post.id === postId);
    setSelectedPost(selectedPost);
    console.log("Selected post:", selectedPost);
  };
  const [editedContent, setEditedContent] = useState(selectedPost.text);
  const updatePost = async () => {
    try {
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/posts/${selectedPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...selectedPost,
            title: editedTitle,
            text: editedContent ? editedContent : selectedPost.text,
          }),
        }
      );
      // Handle response accordingly
      if (response.ok) {
        // Post successfully updated
        closeModal();
        window.location.reload();
      } else {
        // Handle error
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(id) {
    setIsOpen(true);
    getSeclectedPost(id);
  }
  function closeUserModal() {
    setUserModal(false);
  }
  function openUserModal() {
    setUserModal(true);
  }

  const updateUser = async (name, avatar) => {
    try {
      const response = await axios.put(
        `https://englishforum.zeabur.app/api/v1/users/${user.id}`,
        {

          
          username: name, // Update the username here
          avatar: avatar, // Update the avatar here
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("User updated successfully!");
        closeUserModal();
        window.location.reload(); // Reload the page
      } else {
        console.error("Failed to update user:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Failed to update user:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error updating user:", error.message);
      }
    }
  };

  return (
    <div className="w-full h-[1000px] ">
      <div className="w-full h-full bg-white rounded-xl shadow-lg flex flex-row">
        <section className="w-[75%] h-full  py-4">
          {/* Menu */}
          <div
            name="menu"
            className="w-full h-[90px] bg-white flex items-center justify-between px-10  border-b border-gray-200"
          >
            <div className="list-none w-[240px] flex flex-row h-[50px] shadow-lg border-gray-400 border rounded-xl  justify-evenly">
              <div className="w-1/2 h-full flex justify-center items-center hover:bg-gray-100 cursor-pointer hover:underline">
                <div className=" text-gray-500 text-lg font-normal font-['Raleway'] leading-snug">
                  My articles
                </div>
              </div>
              <div className="w-1/2 h-full flex justify-center items-center hover:bg-gray-100 cursor-pointer hover:underline">
                <div className=" text-gray-500 text-lg font-normal font-['Raleway'] leading-snug">
                  Save articles
                </div>
              </div>
            </div>
            <div className="list-none w-[440px] flex flex-row h-[50px] shadow-lg border-gray-400 border rounded-xl  justify-evenly">
              <div className="w-1/2 h-full flex justify-center items-center  cursor-pointer">
                <div className=" text-gray-500 text-lg font-serif font-semibold  leading-snug">
                  My followings : 0
                </div>
              </div>
              <div className="w-1/2 h-full flex justify-center items-center  cursor-pointer ">
                <div className=" text-gray-500 text-lg font-semibold  font-serif leading-snug">
                  My followers :0{" "}
                </div>
              </div>
            </div>
          </div>
          {/* Menu */}
          {/* row of posts */}
          <div className=" w-full h-fit flex items-center justify-between px-10 mt-2 border-b bg-red-200 border-gray-200">
            <div className="w-full h-full flex flex-row  justify-evenly bg-blue-100 items-center cursor-pointer py-2 px-4">
              <div className="grid grid-cols-3 gap-4">
                {userPosts.map((post) => {
                  // Convert post.time_created to a Date object
                  let date = new Date(post.time_created);

                  // Format date to display month abbreviation and day
                  let formattedDate = date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={post.id}
                      className="post w-[285px] flex flex-col rounded-3xl bg-gray-200 shadow-lg py-4 break-words whitespace-normal hover:border border-gray-600"
                    >
                      <div className="w-full flex justify-between mb-2 items-end px-4">
                        <h2>{formattedDate}</h2> {/* Display formatted date */}
                        <Tippy
                          interactive
                          arrow={true}
                          placement="bottom-end"
                          visible={isOpenMap[post.id]} // Use state for visibility
                          onClickOutside={() => toggleTippy(post.id)}
                          render={(attrs) => (
                            <div
                              className="box h-[150px] w-[200px] overflow-y-auto justify-center flex px-2 py-2 bg-[whitesmoke] rounded-2xl shadow-lg border border-gray-300 z-10"
                              tabIndex="-1"
                              {...attrs}
                            >
                              <div
                                className="py-1 w-full"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <div
                                  onClick={() => toggleTippy(post.id)}
                                  className="flex items-center flex-col justify-start"
                                >
                                  <div
                                    onClick={() => deletePost(post.id)}
                                    className="w-full h-[50px] px-4 border-b-2 border-gray-300 flex flex-row items-center justify-start m-1 cursor-pointer hover:bg-white"
                                  >
                                    Delete posts
                                  </div>
                                  <div
                                    onClick={() => openModal(post.id)}
                                    className="w-full h-[50px] px-4 border-b-2 border-gray-300 flex flex-row items-center justify-start m-1 cursor-pointer hover:bg-white"
                                  >
                                    Edit posts
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        >
                          <MoreVertIcon onClick={() => toggleTippy(post.id)} />
                        </Tippy>
                      </div>

                      <div className="w-full flex items-center justify-between mb-2 px-4">
                        <img
                          src={post.user.avatar}
                          alt=""
                          className="h-10 w-10 rounded-full border border-black"
                        />
                        <Link to={`/post/${post.id}`}>
                          <button className="w-[100px] h-9 relative bg-indigo-500 rounded-[18px] hidden items-center hover:bg-indigo-600 focus:outline-none">
                            Read posts{" "}
                            <LaunchIcon
                              className="w-4 h-2 ml-1"
                              style={{ height: "16px", fontSize: "14px" }}
                            />
                          </button>
                        </Link>
                      </div>

                      <div
                        className="w-full mb-2 px-4 overflow-hidden"
                        style={{ minHeight: "50px" }}
                      >
                        <h1 className="text-base font-bold">{post.title}</h1>{" "}
                        {/* Title with overflow handling */}
                      </div>

                      <div className="w-full overflow-hidden mb-2">
                        <img
                          src={post.post_background_img}
                          alt="img"
                          className="px-2 rounded-3xl w-full h-[200px] object-cover" // Adjusted image style
                        />
                      </div>

                      <div className="w-full mb-2 flex justify-start items-center px-4">
                        <InsertCommentIcon className="w-6 h-6 mr-2" />
                        <p>
                          {post.comments.length +
                            post.comments.reduce(
                              (totalReplies, comment) =>
                                totalReplies + comment.replyComments.length,
                              0
                            )}{" "}
                        
                        </p>
                        {/* Assuming 'comments' is an array in 'post' */}
                      </div>
                    </div>
                  );
                })}

                {/* posts 2 */}

                {/* posts 3 */}

                {/* post 4 */}
              </div>
            </div>
          </div>
          {/* Row of posts */}

          {/* modal of edit post */}
          <PostTransition
            isOpen={isOpen}
            closeModal={closeModal}
            selectedPost={selectedPost}
            updatePost={updatePost}
            setEditedTitle={setEditedTitle}
            setEditedContent={setEditedContent}
          />
          {/* Modal of edit post */}
        </section>
        <section className="w-[25%] h-full flex justify-center border-l border-black">
          <div className="bg-[whitesmoke] rounded-3xl border border-gray-300 z-10 shadow-xl h-[600px] w-[90%] mt-10 ">
            <div className="w-1/2 h-[200px]">
              <div className="w-full h-[150px] flex flex-col justify-start items-start py-5 px-5">
                <div className="h-20 w-20  rounded-full mr-4 border border-black">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="h-20 rounded-full mr-4 border border-black"
                  />
                </div>
                <h1 className="font-bold text-[22px] font-[monsterat] m-1">
                  {user.username}
                </h1>
                <div>
                  <Link to="/upload">
                    <button className="w-[131px] h-9 mt-6 relative bg-indigo-500 rounded-[18px] hover:bg-indigo-600 focus:outline-none">
                      <div className="left-[12px] top-[7px] items-center flex justify-center text-white text-sm font-normal font-['Raleway'] leading-snug">
                        Draft an article{" "}
                        <CreateIcon
                          className="w-4 h-2 ml-2"
                          style={{ height: "16px", fontSize: "14px" }}
                        />
                      </div>
                    </button>
                  </Link>
                  <button
                    onClick={openUserModal}
                    className="w-[131px] h-9 mt-2 relative bg-gray-500 rounded-[18px] hover:bg-gray-600 focus:outline-none"
                  >
                    <div className="left-[12px] top-[7px] items-center flex justify-center text-white text-sm font-normal font-['Raleway'] leading-snug">
                      Edit profile{" "}
                      <CreateIcon
                        className="w-4 h-2 ml-2"
                        style={{ height: "16px", fontSize: "14px" }}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* User Modal */}
          <UserTransition
            isOpen={UserModal}
            closeUserModal={closeUserModal}
            user={user}
            updateUser={updateUser}
            editedTitle={editedTitle}
          />
          {/* User Modal */}
        </section>
      </div>
    </div>
  );
};

export default Index;

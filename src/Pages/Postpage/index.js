import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { Drawer } from "@mui/material";
import User from "../../Components/API/User";
import "./Postpage.css";
import CloseIcon from "@mui/icons-material/Close";

import Loading from "../../assests/Loading_icon.gif";

const Postpage = () => {
  const user = JSON.parse(localStorage.getItem("auth")) || {};
  const [replies, setReplies] = useState(0);
  const user1 = User();
  const postID = useParams();
  // commment
   
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [commentId, setCommentId] = useState(null);
  // State to store the comment ID to which the user is replying
  const [commentInput, setCommentInput] = useState("");
  const commentInputRef = useRef(null);
  const [comments, setComments] = useState([]); // State to store comments
  const [totalComments, setTotalComments] = useState(comments.length); // State to store the total number of comments
  const [replyComment, setReplyComment] = useState(null); // State to store the comment to which the user is replying
  const [isReplyOpen, setIsReplyOpen] = useState(null); // State to manage the reply input field
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsReplyOpen(null);
    setReplyIndex(null);
  };

  const token = user.token;
  const submitComment = async (userId, commentBody) => {
    if (!commentBody.trim()) {
      console.error("Comment cannot be empty");
      return;
    }

    const commentData = {
      body: commentBody,
      userDto: {
        id: userId,
      },
    };
    console.log("token:", token);
    try {
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/comments/${postId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setComments([...comments, responseData]);
        console.log("Comment submitted successfully!");
        setCommentInput("");
        commentInputRef.current.value = "";
      } else {
        console.error("Failed to submit comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // reply cooment
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyInput, setReplyInput] = useState("");
  const replyInputRef = useRef(null);

  // Function to handle clicking on the " Reply" button
  const handleonpenReplyField = (index, id) => {
    setCommentId(id);
    // If the replyIndex is already set to the current index, it means the reply section is open, so we close it
    if (isReplyOpen === index) {
      setIsReplyOpen(null); // Close the reply section
    } else {
      console.log("commentId: ", id);
      setIsReplyOpen(index); // Open the reply section for the clicked comment
    }
    // Focus on the reply input field when it is displayed
  };
  //show reply  input field
  const handleReplyCommentsField = (index, id) => {
    if (replyIndex === index) {
      setReplyIndex(null); // Close the reply section
    } else {
      setCommentId(id);
      console.log("commentId: ", id);
      setReplyIndex(index); // Open the reply section for the clicked comment
    }
  };
  // Function to handle typing and submitting a reply
  const handleReplyKeyPress = (e, index) => {
    if (e.key === "Enter") {
      // Call the function to submit the reply with the reply input and index of the comment
      submitReply(replyInput, index);
      // Clear the reply input field after submitting
      setReplyInput("");
      // Reset the replyIndex to null to hide the reply input field
      setReplyIndex(null);
    }
  };
  
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/comments/post/${postID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      // Handle the data, e.g., set it to state or process it further
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Handle the error appropriately, e.g., show an error message
    }
  };
  useEffect(() => {
    if (replyComment !== null) {
      // Gọi hàm fetchComments để cập nhật lại số lượng reply
      fetchComments();
      
    }
  }, [replyComment]);
  

  // Function to submit a reply
  const submitReply = async (replyInput, userID, commentID) => {
    if (!replyInput.trim()) {
      console.error("Comment cannot be empty");
      return;
    }
    const commentData = {
      body: replyInput,
      userDto: {
        id: userID,
      },
    };
    console.log("token:", token);
    try {
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/replyComments/${commentID}/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setReplyComment((prevReplyComment) => [
          ...prevReplyComment,
          responseData,
        ]);
        console.log("Comment submitted successfully!");
        setTotalComments(totalComments + 1);
        setReplyInput("");
        fetchComments();
        console.log("rely Comment:", replyComment.length);
        replyInputRef.current.value = "";
      } else {
        console.error("Failed to submit replycomment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const { id: postId } = useParams(); // Getting postId from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [error, setError] = useState(null);

  // get posts
  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/posts/${postId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      setComments(data.comments);
      setLoading(false);
      setPost(data); // Set the entire post object
      console.log("Post data fetched:", data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  //get posts
  useEffect(() => {
    if (!postId) {
      // Handle case where postId is undefined
      setError("Post ID is missing");
      setLoading(false);
      return;
    }

    fetchPost();
  }, []);

  

  //  get replyComment
  const fetchReplyComment = async (id) => {
    setLoading1(true);
    try {
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/replyComments/comments/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reply comments");
      }
      const data = await response.json();
      // Handle the data, e.g., set it to state or process it further
      setLoading1(false);
      setReplyComment(data);
      console.log("Reply comments fetched:", data);
    } catch (error) {
      console.error("Error fetching reply comments:", error);
      // Handle the error appropriately, e.g., show an error message
    }
  };

  useEffect(() => {
    fetchReplyComment(commentId);
   
  }, [commentId]);

  //  Define a variable to store the total count of comments and their replies
  let totalCommentsAndReplies = 0;
  const [allComments, setAllComments] = useState(totalCommentsAndReplies); // State to store all comments
  // Iterate through each comment
  comments.forEach((comment) => {
    // Increment the total count by 1 for the comment itself
    totalCommentsAndReplies++;

    // Check if the comment has any reply comments
    if (comment.replyComments && comment.replyComments.length > 0) {
      // Increment the total count by the number of reply comments
      totalCommentsAndReplies += comment.replyComments.length;
    }
  });

  // Now, totalCommentsAndReplies contains the total count of comments and their replies

  let date;
  let formattedDate;

  if (post && post.time_created) {
    date = new Date(post.time_created);
    formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else {
    formattedDate = "Date not available";
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const userId = user1.id; // Example userId
      submitComment(userId, commentInput);
    }
  };

  if (loading) {
    return (
      <div className="w-full  min-h-screen flex items-center justify-center">
        <img className="w-[300px] h-[300px]" src={Loading} alt="load" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render paragraphs
  const renderParagraphs = () => {
    const paragraphs = post.text.split("</p>").map((paragraph, index) => {
      if (paragraph.trim() !== "") {
        return (
          <p
            className="text-wrap whitespace-normal  "
            key={index}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        );
      }
      return null;
    });
    return paragraphs;
  };

  return (
    <main
      name="main_postPage"
      className="  py-[32px] min-h-[1000px]  w-full flex  flex-col "
    >
      <div
        name="main-header"
        className="flex flex-row items-center w-full gap-[12px] py-4"
      >
        <button
          name="header-popular"
          className="w-[60px] h-7 px-2 py-1 bg-green-200 rounded-[14px]  justify-center items-center inline-flex"
        >
          Popular
        </button>
        <button
          name="header-blockchain"
          className="w-[auto] h-7 px-2 py-1 bg-red-200 rounded-[14px]  justify-center items-center inline-flex"
        >
          {post.category.name}
        </button>
        <div
          name="header-date"
          className="text-zinc-700 text-[11px] font-medium font-['Raleway'] leading-[18px]"
        >
          {formattedDate}
        </div>
      </div>

      <div name="main-post" className="mt-[28px] w-full">
        <div name="post-title">
          <div>
            <img
              src={post.post_background_img}
              alt="post_background_img"
              className="w-full py-1"
            />
          </div>
          <h1 className=" text-zinc-900 text-[32px] text-center font-bold font-['Bitter'] leading-[48px]">
            {post.title}
          </h1>
        </div>
        <div
          name="post-user"
          className="flex flex-row w-[636px] gap-[11px] items-center mt-[24px]"
        >
          <img
            src={post.user.avatar}
            alt="user_avatar"
            className="w-[42px] h-[42px] rounded-full"
          />
          <div name="user-information">
            <h1 className="text-gray-700 text-sm font-semibold font-['Raleway'] leading-snug">
              {post.user.username}
            </h1>
            <p className="text-zinc-400 text-[11px] font-normal font-['Raleway'] leading-[18px]">
              4 min read
            </p>
          </div>
          <button className="w-[50px] h-7 px-2 py-[5px] bg-red-50 rounded-[14px] justify-center items-center inline-flex text-sm">
            Follow
          </button>
        </div>
        {/* Post - Information */}
        <div
          name="post-information"
          className="mt-[24px] pt-[13px] pb-[13px] flex flex-row justify-between"
        >
          <div className="flex flex-row gap-[16px]">
            <div className="gap-[4px] flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="gray"
                className="w-[24px] h-[24px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <p className="text-zinc-700 text-base font-light font-['Raleway'] leading-relaxed">
                1.8M
              </p>
            </div>

            <div className="gap-[4px] flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="gray"
                className="w-[24px] h-[24px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <p
                onClick={toggleDrawer}
                className="text-zinc-700 text-base font-light font-['Raleway'] leading-relaxed cursor-pointer hover:scale-110"
              >
                {comments.length}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-[24px] h-[24px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-[24px] h-[24px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-[24px] h-[24px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </div>
        </div>

        <div
          name="content"
          className="mt-[55px] text-left flex flex-col flex-wrap whitespace-normal text-wrap break-words"
          // style={{ wordBreak: "break-all" }}
        >
          {renderParagraphs()}
        </div>
      </div>

      {/* Drawer Component */}
      <Drawer
        anchor="right"
        className="h-fit"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <div className="flex flex-col w-[800px] justify-between items-center px-5 py-5 mt-20">
          <div className="flex flex-row justify-between w-[700px] mb-5">
            <div className="text-zinc-900 text-[32px] font-normal font-['Bitter'] leading-[48px]">
              Comment (
              {allComments === 0 ? totalCommentsAndReplies : allComments})
            </div>
            <CloseIcon onClick={toggleDrawer} />
          </div>

          {/* comments input */}
          <div className="flex flex-col justify-between w-[700px] h-[130px]  mb-5 ">
            <div className="flex items-center  w-full h-full px-4">
              <img
                className="rounded-full h-14 w-14"
                src={user1.avatar}
                alt=""
              />
              <input
                ref={commentInputRef}
                type="text"
                placeholder="Write your comment here..."
                value={commentInput}
                onKeyPress={handleKeyPress} // Call handleKeyPress on key press
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-[90%] h-14 px-4 py-2 bg-gray-100  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ml-4"
              />
            </div>
            <button
              className="w-[120px] h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none self-end mr-4"
              onClick={() => {
                // Replace 'userId' with actual value from your application
                const userId = user1.id; // Example userId

                submitComment(userId, commentInput);
              }}
            >
              Post
            </button>
          </div>

          <div className="w-[700px] h-[650px] overflow-y-auto flex pb-20 items-center flex-col">
            {comments.length > 0 ? (
              comments
                .slice(0)
                .reverse()
                .map((comment, index) => 
              
                (
                  <div
                    key={index}
                    className="w-full px-4 py-4 bg-gray-100 mb-2 border rounded-s-md flex flex-col justify-between"
                  >
                    <div className="flex flex-row items-center">
                      <img
                        className="rounded-full h-10 w-10 mr-2 border-2 border-gray-300"
                        src={comment.user.avatar}
                        alt=""
                      />
                      <h1 className="text-zinc-900 text-sm font-bold font-['Raleway'] leading-snug cursor-pointer hover:underline">
                        {comment.user.username}
                      </h1>
                    </div>
                    <div className="w-full pl-12 py-3 mb-1 flex text-zinc-700 text-sm font-normal font-['Raleway'] leading-snug break-all whitespace-normal">
                      {comment.body}
                    </div>

                    <div className="w-full pl-12 flex justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-8"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                        />
                      </svg>

                      <button
                        className="mr-4 hover:underline"
                        onClick={() =>
                          handleReplyCommentsField(index, comment.id)
                        }
                      >
                        reply
                      </button>
                      <button
                        className="mr-2 hover:underline"
                        onClick={() => {
                          console.log("commentId: ", comment.replyComments.length);
                          handleonpenReplyField(index, comment.id);
                        }}
                      >
                        Show{" "}
                        {comment.replyComments
                          ? comment.replyComments.length
                          : 0}{" "}
                        reply
                      </button>
                    </div>

                    {isReplyOpen === index &&
                      (loading1 ? (
                        <div className="flex items-center w-full h-full mt-1 px-4 py-4">
                          {/* Render loading indicator */}
                          <p>Loading replies...</p>
                        </div>
                      ) : (
                        replyComment &&
                        replyComment.map((reply, replyIndex) => (
                          <div
                            key={replyIndex}
                            className="flex flex-row items-center w-full h-full mt-1 px-4 py-4"
                          >
                            <img
                              className="rounded-full h-10 w-10 mr-4 justify-items-start"
                              src={reply.user.avatar}
                              alt=""
                            />
                            <div className="h-[100px] flex flex-col justify-center border border-gray-300 w-full rounded-xl px-2">
                              <p className="text-zinc-900 h-1/5 text-sm font-bold font-['Raleway'] justify-start pb-2 py-2 leading-snug cursor-pointer hover:underline">
                                {reply.user.username}
                              </p>
                              <p className="text-zinc-700 h-4/5 flex justify-start items-center text-sm font-normal font-['Raleway'] leading-snug">
                                {reply.body}
                              </p>
                            </div>
                          </div>
                        ))
                      ))}

                    {replyIndex === index && (
                      <div className="flex items-center w-full h-full mt-1 px-4">
                        <img
                          className="rounded-full h-10 w-10 border border-gray-300"
                          src={user1.avatar}
                          alt=""
                        />
                        <input
                          ref={replyInputRef}
                          type="text"
                          placeholder="Write your reply here..."
                          value={replyInput}
                          onKeyPress={(e) => handleReplyKeyPress(e, index)} // Call handleReplyKeyPress on key press
                          onChange={(e) => setReplyInput(e.target.value)}
                          className="w-[70%] h-9 px-4 py-2 bg-gray-100 mr-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ml-4"
                        />
                        <button
                          onClick={() => {
                            const userId = user1.id; // Example userId

                            submitReply(replyInput, userId, comment.id);
                            setAllComments(totalCommentsAndReplies + 1);
                          }}
                          className="h-9 w-[20%]  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none self-end mr-4"
                        >
                          Send
                        </button>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </div>
      </Drawer>
    </main>
  );
};

export default Postpage;

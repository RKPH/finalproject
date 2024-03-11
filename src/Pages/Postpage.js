import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { Drawer, Button } from "@mui/material";
import "./Postpage.css";
import CloseIcon from "@mui/icons-material/Close";

const Postpage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const commentInputRef = useRef(null);
  const [comments, setComments] = useState([]); // State to store comments
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const submitComment = async (userId, commentBody) => {
    const commentData = {
      body: commentBody,
      userDto: {
        id: 1,
        // Assuming other user data is available in your application state
      },
    };

    try {
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/comments/${postId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (response.ok) {
        setComments([...comments, commentData]);
        // Comment submitted successfully
        console.log("Comment submitted successfully!");
        setCommentInput("");

        // Clear input field using useRef
        commentInputRef.current.value = "";
        // Optionally, you can close the drawer after successful submission
        // toggleDrawer();
      } else {
        // Handle error response
        console.error("Failed to submit comment:", response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error("Error submitting comment:", error);
    }
  };

  const { id: postId } = useParams(); // Getting postId from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      // Handle case where postId is undefined
      setError("Post ID is missing");
      setLoading(false);
      return;
    }
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://englishforum.zeabur.app/api/v1/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setComments(data.comments)
        setPost(data); // Set the entire post object
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render paragraphs
  const renderParagraphs = () => {
    const paragraphs = post.text.split("</p>").map((paragraph, index) => {
      if (paragraph.trim() !== "") {
        return (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        );
      }
      return null;
    });
    return paragraphs;
  };

  return (
    <main
      name="main_postPage"
      className="  py-[32px] min-h-[1000px] bg-white flex  flex-col  "
    >
      <div
        name="main-header"
        className="flex flex-row items-center w-[85%] gap-[12px]"
      >
        <button
          name="header-popular"
          className="w-[60px] h-7 px-2 py-1 bg-white rounded-[14px] border border-zinc-900 justify-center items-center inline-flex"
        >
          Popular
        </button>
        <button
          name="header-blockchain"
          className="w-[auto] h-7 px-2 py-1 bg-white rounded-[14px] border border-zinc-900 justify-center items-center inline-flex"
        >
          Blockchain
        </button>
        <div
          name="header-date"
          className="text-zinc-700 text-[11px] font-medium font-['Raleway'] leading-[18px]"
        >
          Jun 27, 2023
        </div>
      </div>

      <div name="main-post" className="mt-[28px] w-[95%]">
        <div name="post-title">
          <h1 className="w-[636px] text-zinc-900 text-[32px] font-normal font-['Bitter'] leading-[48px]">
            {post.title}
          </h1>
        </div>
        <div
          name="post-user"
          className="flex flex-row w-[636px] gap-[11px] items-center mt-[24px]"
        >
          <div className="w-[42px] h-[42px] bg-zinc-300 rounded-[21px]" />
          <div name="user-information">
            <h1 className="text-gray-700 text-sm font-semibold font-['Raleway'] leading-snug">
              Benjamin Foster
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
                stroke="currentColor"
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
                stroke="currentColor"
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
                4K
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
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
              stroke="currentColor"
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
              stroke="currentColor"
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

        <div name="content" className="mt-[55px] text-left flex flex-col">
          {renderParagraphs()}
        </div>
      </div>

      {/* Drawer Component */}
      <Drawer
        anchor="right"
        className="h-full mt-20"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        style={{ height: "100%" }}
      >
        <div className="flex flex-col justify-between w-[800px] items-center px-5 py-5">
          <div className="flex flex-row justify-between w-[700px] mb-5">
            <div className="text-zinc-900 text-[32px] font-normal font-['Bitter'] leading-[48px]">
              Comment (4,532)
            </div>
            <CloseIcon onClick={toggleDrawer} />
          </div>
          <div className="flex flex-col justify-between w-[700px] h-[130px]  mb-5 ">
            <div className="flex items-center  w-full h-full px-4">
              <img
                className="rounded-full h-20 w-20"
                src="https://images.unsplash.com/photo-1710065574725-21d435fc8fff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
                alt=""
              />
              <input
                ref={commentInputRef}
                type="text"
                placeholder="Write your comment here..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-[90%] h-20 px-4 py-2 bg-gray-100  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ml-4"
              />
            </div>
            <button
              className="w-[120px] h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none self-end mr-4"
              onClick={() => {
                // Replace 'userId' with actual value from your application
                const userId = 1; // Example userId
                submitComment(userId, commentInput);
              }}
            >
              Post
            </button>
          </div>

          <div className="w-full">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id}>{comment.body}</div>
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

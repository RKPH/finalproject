import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";

import User from "../../Components/API/User";
import "./Postpage.css";

import CommentDrawer from "./Drawer";
import Loading from "../../assests/Loading_icon.gif";
import { Link } from "react-router-dom";
const Postpage = () => {
  const user = JSON.parse(localStorage.getItem("auth")) || {};

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
                {totalCommentsAndReplies}
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
        <Link to="/">
        <div className="mt-6 text-center w-full items-center justify-center flex h-[100px]  bg-white shadow-lg">
          <p className="text-zinc-700 text-xl font-medium font-['Raleway'] leading-relaxed">
            You have finished reading (back to home page)
          </p>
        </div>
        </Link>
      </div>

      {/* Drawer Component */}
      <CommentDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        comments={comments}
        loading1={loading1}
        allComments={allComments}
        replyComment={replyComment}
        handleReplyCommentsField={handleReplyCommentsField}
        isReplyOpen={isReplyOpen}
        replyInput={replyInput}
        handleReplyKeyPress={handleReplyKeyPress}
        setReplyInput={setReplyInput}
        submitReply={submitReply}
        user1={user1}
        commentId={commentId}
        setAllComments={setAllComments}
        setCommentInput={setCommentInput}
        commentInputRef={commentInputRef}
        submitComment={submitComment}
        handleonpenReplyField={handleonpenReplyField}
        replyIndex={replyIndex}
        totalCommentsAndReplies={totalCommentsAndReplies}
      />
    </main>
  );
};

export default Postpage;

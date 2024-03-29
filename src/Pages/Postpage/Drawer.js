import React , {useState}from "react";
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CommentDrawer = ({
  isDrawerOpen,
  toggleDrawer,
  comments,
  loading1,
  replyComment,
  handleReplyCommentsField,
  isReplyOpen,
  replyInput,
  handleReplyKeyPress,
  setReplyInput,
  submitReply,
  user1,
  commentInputRef,  
  submitComment,
  handleonpenReplyField,
  replyInputRef,
  replyIndex ,
  
}) => {
const [commentInput, setCommentInput] = useState("");
const user = JSON.parse(localStorage.getItem("auth")) || {};
const token =user.token
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
  return (
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
                // onKeyPress={handleKeyPress} // Call handleKeyPress on key press
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
                setCommentInput("")
                commentInputRef.current.value=""
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
                      
                      {
                        token && (

                      <button
                        className="mr-4 hover:underline"
                        onClick={() =>
                          handleReplyCommentsField(index, comment.id)
                        }
                      >
                        reply
                      </button>
                        )
                      }
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
                            setAllComments( totalCommentsAndReplies+ 1);
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
  );
};

export default CommentDrawer;

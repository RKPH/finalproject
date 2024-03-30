import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import CreateIcon from "@mui/icons-material/Create";
import LaunchIcon from "@mui/icons-material/Launch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotFound from "../../assests/404.jpg";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Search = () => {
  let query = useQuery();
  const [posts, setPosts] = useState([]);
  let searchQuery = query.get("q"); // 'q' is the query parameter
  const [isLoading, setIsLoading] = useState(true);

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
      setPosts(data);
      console.log("result", data);
    } catch (error) {
      console.error("Error fetching result:", error);
      // Handle the error appropriately, e.g., show an error message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResult(searchQuery);
  }, [searchQuery]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="h-full w-full bg-white flex justify-center">
      <div className=" w-full h-fit flex justify-between px-10 mt-2 items-center">
        <div className="w-full h-fit flex flex-row  justify-evenly  cursor-pointer py-4 px-4">
          {posts.length === 0 ? (
            // If no posts are found, display the 404 picture
            <img src={NotFound} alt="404" className="object-contain w-1/3" />
          
          ) : (
            // If posts are found, display them
            <div className="grid grid-cols-5 gap-4">
              {posts.map((post) => {
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
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Search;

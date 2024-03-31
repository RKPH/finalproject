import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import CreateIcon from "@mui/icons-material/Create";
import LaunchIcon from "@mui/icons-material/Launch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotFound from "../../assests/404.jpg";
import DiscreteSliderValues from "./Slider";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  let query = useQuery();
  const [posts, setPosts] = useState([]);
  let searchQuery = query.get("q"); // 'q' is the query parameter
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
  const handleCategoryChange = (category) => {
    // Check if the category is already selected
    if (selectedCategories.includes(category)) {
      // If it is, remove it from the selected categories
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      // If it's not, add it to the selected categories
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen  w-full bg-white flex flex-rol justify-center overflow-hidden">
      <section className="w-[25%] h-[1000px] border-r border-gray-100 ">
        <div className="w-full h-full flex justify-center ">
          <div className="w-[95%] h-[500px] border border-black mt-9 px-2 rounded-[18px]">
            <div className="min-h-5 w-full py-2 border-b border-black">
              <h3 className="text-zinc-900 text-xl font-semibold font-['Bitter'] leading-9 text-wrap text-start ">
                Filter
              </h3>
            </div>
            <div className="py-2 h-[150px] w-full items-center flex flex-col border-b border-black justify-center">
              <h3 className="text-zinc-900 text-xl font-semibold w-full font-['Bitter'] leading-9 text-wrap text-start ">
                Popular
              </h3>
              <DiscreteSliderValues />
            </div>
            <div className="py-2 h-[200px] w-full  flex flex-col border-b border-black ">
              <h3 className="text-zinc-900 text-xl font-semibold w-full font-['Bitter'] leading-9 text-wrap text-start">
                Category
              </h3>
              <div className="w-full flex flex-col">
                <label
                  htmlFor="category1"
                  className="inline-flex items-center mb-1"
                >
                  <input type="checkbox" id="category1" name="category1" />
                  <span className="ml-2">Category 1</span>
                </label>
                <label
                  htmlFor="category2"
                  className="inline-flex items-center mb-1"
                >
                  <input type="checkbox" id="category2" name="category2" />
                  <span className="ml-2">Category 2</span>
                </label>
                <label
                  htmlFor="category3"
                  className="inline-flex items-center mb-1"
                >
                  <input type="checkbox" id="category3" name="category3" />
                  <span className="ml-2">Category 3</span>
                </label>
                <label
                  htmlFor="category4"
                  className="inline-flex items-center mb-1"
                >
                  <input type="checkbox" id="category4" name="category4" />
                  <span className="ml-2">Category 4</span>
                </label>
                <label
                  htmlFor="category5"
                  className="inline-flex items-center mb-1"
                >
                  <input type="checkbox" id="category5" name="category5" />
                  <span className="ml-2">Category 5</span>
                </label>
              </div>
            </div>
            <div className="py-2 h-[90px] w-full bg-blue-100 flex  items-center">
              <button className="bg-blue-800 w-full h-[60px] items-center  text-white py-2 rounded-md">
                view results
              </button>
             
            </div>
          </div>
        </div>
      </section>
      <section className="w-[75%] min-h-fit  py-1 flex justify-center items-center ">
        <div className="w-full h-full flex justify-center items-center ">
          <div className="w-full h-full max-w-4xl">
            <div className="text-start h-[100px] py-4 items-center mb-2 flex">
              <h1 className="text-3xl font-bold px-4">Search results for:</h1>
              <span className="text-blue-500 text-3xl font-bold px-4">
                "{searchQuery}"
              </span>
            </div>
            <div className="w-full flex flex-col justify-between items-center pb-10">
              <h1 className="text-base text-start w-full font-bold px-4">
                {posts.length ? posts.length : 0} result found
              </h1>
              <div className="w-full flex flex-row items-center justify-between cursor-pointer py-4 px-4">
                {posts.length === 0 ? (
                  // If no posts are found, display the 404 picture
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      src={NotFound}
                      alt="404"
                      className="object-contain max-w-[700px] max-h-[700px]"
                    />
                  </div>
                ) : (
                  // If posts are found, display them
                  <div className="grid grid-cols-3 gap-4">
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
                          className="post w-[285px] flex flex-col rounded-3xl bg-gray-200 shadow-lg py-4 break-words outline-none whitespace-normal hover:border border-gray-600"
                        >
                          <div className="w-full flex justify-between mb-2 items-end px-4">
                            <h2>{formattedDate}</h2>{" "}
                            {/* Display formatted date */}
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
                            <h1 className="text-base font-bold">
                              {post.title}
                            </h1>{" "}
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default Search;

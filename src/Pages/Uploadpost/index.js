import { Plus } from "lucide-react";
import { useDispatch, useSelector} from "react-redux";
import React, { useState } from "react";

import {
  setTitle,
  setBackGroundimg,
  setLoading,
  setError,
  setSuccess,
  resetState,
} from "../../Hooks/postslice";
import parse from "html-react-parser";
import CustomQuillEditor from "../../Components/TextEditor";
import User from "../../Components/API/User";
import Cateogry from "../../Components/API/Cateogry";
import { useNavigate } from "react-router-dom";
import "./uploadPost.css";

export default function Home() {
  const token = useSelector((state) => state.user.token);
  
  const user = User(); // Fetching user data
  const Category = Cateogry(); // Fetching category data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, backGroundimg, error, success } = useSelector(
    (state) => state.post
  );
    const [content, setContent] = useState("");
    // Handlers
    const [category, setCategory] = useState('');

    // Handle category change
    function handleCategoryChange(e) {
      setCategory(e.target.value);
    }
    function handleTitle(e) {
    dispatch(setTitle(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Validate form fields
    if (!title || !backGroundimg || !content) {
      dispatch(setError("Please complete all necessary fields."));
      setTimeout(() => {
        dispatch(setError(""));
      }, 3000);
      return;
    }
    // Dispatch action to set loading state
    dispatch(setLoading(true));
    dispatch(setError(""));
    // Create new blog object
    const newBlog = {
      title,
      post_background_img: backGroundimg,
      text: content,
    
    };
    try {
      // Make API call to submit blog post
      // This part remains unchanged
      const response = await fetch(
        `https://englishforum.zeabur.app/api/v1/posts/user/${user.id}?categoryId=${category}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify(newBlog),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("response: ", response);
        console.log("Blog post submitted successfully!");
        dispatch(setSuccess("submit successfully"));
        setTimeout(() => {
          dispatch(setSuccess(""));
          navigate(`/post/${data.id}`); // Redirect to the current post id
          dispatch(resetState());
          setContent("");
          setTimeout(() => {
            // Clear form fields or perform any other necessary actions
          }, 3000); // 3 seconds
        }, 3000); // 3 seconds
      } else {
        console.error("Failed to submit blog post:", response.status);
        dispatch(
          setError("Failed to submit blog post. Please try again later.")
        );
        setTimeout(() => {
          dispatch(setError(""));
        }, 3000); // 3 seconds
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  }

  function handleContentChange(html) {
    setContent(html); // Dispatch action to update content
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await fetch(
        "https://englishforum.zeabur.app/api/v1/file/upload",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: formData,
        }
      );
  
      if (response.ok) {
        const link = await response.text();
        dispatch(setBackGroundimg(link)); // Dispatch action to update background image link
        // Clear file input
        e.target.value = null;
      } else {
        console.error("Failed to upload image:", response.status);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold py-4">
        Amazing Rich Text Editor (WYSIWYG)
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-4">
        {/* Blog Editor */}
        <div className="w-full max-w-3xl p-5 my-6 bg-white border  rounded-lg shadow mx-auto border-black">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog Editor
          </h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500 shake">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <div className="grid gap-4 h-full sm:grid-cols-2 sm:gap-6">
              {/* Title */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-bold leading-6 text-gray-900 mb-2 "
                >
                  Blog Title
                </label>
                <div className="mt-2">
                  <input
                    required
                    onChange={handleTitle}
                    type="text"
                    value={title}
                    name="title"
                    id="title"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    placeholder="Type the Course title"
                  />
                </div>
              </div>
              {/* Background Image */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-bold leading-6 text-gray-900 mb-2"
                >
                  Background Image
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className=" w-full bottom-0 flex"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-bold leading-6 text-gray-900 mb-2"
                >
                  Select Category
                </label>
                <div className="mt-2">
                  <select
                    required
                    onChange={handleCategoryChange}
                    value={category}
                    name="category"
                    id="category"
                    className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Category</option>
                    {
                      Category.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))
                    }
                   
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              {/* Content */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm  text-gray-900 font-bold"
                >
                  Blog Content
                </label>
                <CustomQuillEditor
                  value={content}
                  onContentChange={handleContentChange}
                />
              </div>
            </div>
          </form>
          {/* Move button here */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center px-5 py-2.5 mt-2 mr-2 text-sm font-medium text-center absolute top-28 right-0 text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span>Create Blog Post</span>
          </button>
        </div>

        {/* Blog View */}
        <div className=" blog-view w-full max-w-3xl p-8 my-6 bg-white border border-black rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog View
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Title */}
            <div className="sm:col-span-2">
              <h2 className="block text-sm font-bold leading-6 text-gray-900 mb-2 ">
                Blog Title
              </h2>
              <div className="mt-2">
                <p className="text-2xl font-bold">{title}</p>
              </div>
            </div>
            {/* Background Image */}
            <div className="sm:col-span-2">
              <h2 className="block mb-2 text-sm font-bold text-gray-900 ">
                Background image
              </h2>
              <img src={backGroundimg} alt="" />
            </div>
            {/* Content */}
            <div className="sm:col-span-full">
              <h2 className="block mb-2 text-sm font-bold text-gray-900 ">
                Blog Content
              </h2>
              <div className="text-wrap break-words flex-wrap min-h-[350px] overflow-auto  border border-black ">
                {parse(content)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

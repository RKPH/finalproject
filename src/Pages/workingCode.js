import { generateSlug } from "../../Layout/libs/generateSlug";
import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import CustomQuillEditor from "../../Components/TextEditor";
import { useNavigate } from "react-router-dom";
import "./uploadPost.css";



export default function Home() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [backGroundimg, setBackGroundimg] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    console.log("LINK:", backGroundimg);
  }, [backGroundimg]);
  function handleTitle(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const autoSlug = generateSlug(newTitle);
    setSlug(autoSlug);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !backGroundimg || !content) {
      setError("Please complete all necessary fields.");
      setTimeout(() => {
        setError("");
      }, 3000); // 3 seconds
      return;
    }
    setLoading(true);
    setError("");
    setLoading(true);
    setError("");
    // Concatenate the content with the existing text field

    const newBlog = {
      title,
      post_background_img: backGroundimg,
      text: content,
    };

    try {
      const response = await fetch(
        "https://englishforum.zeabur.app/api/v1/posts/user/1?categoryId=1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
          body: JSON.stringify(newBlog),
        }
      );

      if (response.ok) {
        console.log("Blog post submitted successfully!");
        setSuccess("submit successfully");
        setTimeout(() => {
          setSuccess("");
          navigate("/"); // Redirect to homepage
        }, 3000); // 3 seconds
        // Clear form fields or perform any other necessary actions
      } else {
        console.error("Failed to submit blog post:", response.status);
        setError("Failed to submit blog post. Please try again later.");
        setTimeout(() => {
          setError("");
        
        }, 3000); // 3 seconds
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  }

  function handleContentChange(html) {
    setContent(html);
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
          body: formData,
        }
      );

      if (response.ok) {
        const link = await response.text();
        setBackGroundimg(link);
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

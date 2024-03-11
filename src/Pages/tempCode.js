

import { generateSlug } from "../Layout/libs/generateSlug";
import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import CustomQuillEditor from "../Components/TextEditor";

export default function Home() {
  const [title, setTitle] = useState("");
  const [backGroundimg, setBackGroundimg] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("LINK:", backGroundimg);
  }, [backGroundimg]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const newBlog = {
      title: title,
      post_background_img: backGroundimg,
      text: content,
      category: { id: 1 } // Assuming category id is 1
    };
  
    try {
      const response = await fetch(
        "https://englishforum.zeabur.app/api/v1/posts/user/1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBlog),
        }
      );
  
      if (response.ok) {
        console.log("Blog post submitted successfully!");
        setTitle("");
        setBackGroundimg("");
        setSlug("");
        setDescription("");
        setContent("");
      } else {
        setError("Failed to submit blog post. Please try again later.");
      }
    } catch (error) {
      setError("Error submitting blog post: " + error.message);
    } finally {
      setLoading(false);
    }
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
        e.target.value = "";
      } else {
        setError("Failed to upload image. Please try again later.");
      }
    } catch (error) {
      setError("Error uploading image: " + error.message);
    }
  }

  function handleContentChange(html) {
    setContent(html);
  }

  function handleTitle(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const autoSlug = generateSlug(newTitle);
    setSlug(autoSlug);
  }

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold py-4">
        Amazing Rich Text Editor (WYSIWYG)
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-4">
        {/* Blog Editor */}
        <div className="w-full max-w-3xl p-5 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog Editor
          </h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500">{error}</div>}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Title */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                >
                  Blog Title
                </label>
                <div className="mt-2">
                  <input
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
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Background Image
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full"
                  />
                </div>
              </div>
              {/* Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Blog Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 "
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              {/* Content */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Blog Content
                </label>
                <CustomQuillEditor
                  value={content}
                  onContentChange={handleContentChange}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-5 py-2.5 mt-10 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800 ${loading && 'opacity-50 cursor-not-allowed'}`}
            >
              {loading ? (
                <span className="mr-2">Submitting...</span>
              ) : (
                <Plus className="w-5 h-5 mr-2" />
              )}
              <span>Create Blog Post</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

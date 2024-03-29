import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
const UserTransition = ({ isOpen, closeUserModal, user, updateUser }) => {
  const [editedTitle, setEditedTitle] = useState(user.username);
  const ava = user.avatar;
  const [avatar, setAvatar] = useState(ava);

  const [selectedFile, setSelectedFile] = useState(null);
  const token = useSelector((state) => state.user.token);
  // Function to handle file selection

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
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: formData,
        }
      );

      if (response.ok) {
        const link = await response.text();
        // Update the avatar state with the received URL
        setAvatar(link);
        console.log("Uploaded avatar link:", link);
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 mt-20" onClose={closeUserModal}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        {/* Dialog Content */}
        <div className="fixed inset-0 mt-20 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Dialog Title */}
                <Dialog.Title
                  as="h2"
                  className="font-bold text-[20px] font-[monsterat] text-center leading-6 text-gray-900"
                >
                  <div className="mt-2 flex justify-center  ">
                    <img
                      src={avatar}
                      alt="User Avatar"
                      className="h-20 w-20 rounded-full mr-4 border border-black"
                    />
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div className="mt-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className=" w-full bottom-0 flex"
                      />
                    </div>

                    {/* Button */}
                  </div>
                </Dialog.Title>

                {/* Post Content */}
                <div className="mt-2 flex justify-center  ">
                  <h1
                    contentEditable
                    onBlur={(e) => setEditedTitle(e.target.innerText)}
                    className="font-bold text-lg"
                  >
                    {user.username}
                  </h1>
                </div>

                {/* Button */}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => updateUser(editedTitle, avatar)}
                  >
                    Save changes
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserTransition;

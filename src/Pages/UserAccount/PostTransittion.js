import React, { Fragment } from "react";
import CustomQuillEditor from "../../Components/TextEditor";
import { Dialog, Transition } from "@headlessui/react";

const PostTransition = ({ isOpen, closeModal, selectedPost, updatePost, setEditedTitle, setEditedContent }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 mt-20"
        onClose={closeModal}
      >
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
                  as="h3"
                  onBlur={(e) => setEditedTitle(e.target.innerText)}
                  contentEditable="true"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {selectedPost.title}
                </Dialog.Title>

                {/* Post Content */}
                <div className="mt-2">
                  <CustomQuillEditor
                    contentEditable="true"
                    onBlur={(e) => setEditedContent(e.target.innerText)}
                    className="text-sm text-gray-500"
                    value={selectedPost.text}
                    onContentChange={(content) =>
                      setEditedContent(content)
                    }
                    dangerouslySetInnerHTML={{
                      __html: selectedPost.text,
                    }}
                  ></CustomQuillEditor>
                </div>

                {/* Button */}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={updatePost}
                  >
                    Got it, thanks!
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

export default PostTransition;

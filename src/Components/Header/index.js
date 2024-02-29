import React from "react";

const Header = () => {
  return (
    <header className="h-20 w-full bg-red-500 border-b flex items-center justify-center">
      {/* Logo */}
      <div className="absolute left-4">
         logo
      </div>

      {/* Navbar */}
      <nav className="w-[70%] h-full flex bg-[F3F4F6] items-center">
        <form className="relative">
          <input
            type="text"
            className="w-[499px] h-[51px] pl-12 pr-14 py-3 rounded-3xl bg-gray-100 border border-transparent focus:outline-none focus:border-black"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-3 py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400 hover:text-gray-700 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 0a9 9 0 0 0-7.214 14.583L0 18l3.417-1.786A9 9 0 1 0 9 0zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
              />
            </svg>
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;

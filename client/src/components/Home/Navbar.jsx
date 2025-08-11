import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-500 py-6">
        <div className="w-full px-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-white to-green-700 bg-clip-text text-transparent animate-pulse">
              <a href="/">ARYAVARTA</a>
            </div>
            <ul className="hidden md:flex space-x-6 font-semibold text-white">
              <li>
                <a className="hover:border-b-2 border-orange-500" href="#">
                  Home
                </a>
              </li>
              <li>
                <a
                  className="hover:border-b-2 border-orange-500"
                  href="#slides_parent"
                >
                  Heritage Sites
                </a>
              </li>
              <li>
                <a
                  className="hover:border-b-2 border-orange-500"
                  href="#explore-fiji"
                >
                  Travel With us
                </a>
              </li>
              <li>
                <a
                  className="hover:border-b-2 border-orange-500"
                  href="#gallery"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  className="hover:border-b-2 border-orange-500"
                  href="#fiji-holyday"
                >
                  Our Pride
                </a>
              </li>
              <li>
                <a className="hover:border-b-2 border-orange-500" href="#blog">
                  Blog
                </a>
              </li>
            </ul>
            {/* Login / Signup Buttons */}
            <div className="hidden md:flex space-x-4">
              <a
                href="/login"
                className="text-white font-medium border border-white px-4 py-1 rounded hover:bg-white hover:text-green-700 transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-orange-500 text-white font-medium px-4 py-1 rounded hover:bg-white hover:text-orange-600 border border-orange-500 transition"
              >
                Signup
              </a>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden text-white text-xl">
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

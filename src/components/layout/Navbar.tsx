import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
      const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="antialiased bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <div className="w-full bg-white dark:bg-gray-800">
        <div className="flex py-3 flex-col  mx-auto md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          {/* Logo & Toggle */}
          <div className="flex items-center justify-between p-4">
            <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase dark:text-white">
              BookNest
            </a>
            <button
              className="rounded-lg md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                {menuOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2zm6 5h8a1 1 0 010 2H9a1 1 0 010-2z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav
            className={`flex-col md:flex md:flex-row md:justify-end md:items-center md:space-x-4 ${
              menuOpen ? 'flex' : 'hidden'
            } pb-4 md:pb-0`}
          >
            {[{link:'/',name:"Home"}, {name:"Books",link:'/books'},{name:"Add Book",link:"/create-book"}, {name:"Book Summary",link:"/book-summary"}].map((nav) => (
              <Link
                key={nav.link}
                to={nav.link}
                className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:shadow-outline dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600"
              >
                {nav.name}
              </Link>
            ))}

            <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-200 focus:outline-none dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600"
              >
                More
                <svg
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Items */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
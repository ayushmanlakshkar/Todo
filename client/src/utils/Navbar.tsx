import React from 'react'

function Navbar() {
  return (
    <div className="w-full bg-[#ECEDEE] shadow-custom p-5 rounded-2xl flex items-center md:justify-between flex-col md:flex-row gap-3 ">
      <div className="flex items-center bg-white rounded-full shadow-custom p-2 w-full md:w-96">
        <svg
          className="w-6 h-6 text-gray-500 mx-2"
          fill="#000000"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488.4 488.4"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g>
              {' '}
              <g>
                <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>
              </g>{' '}
            </g>{' '}
          </g>
        </svg>
        <input
          className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
          type="text"
          placeholder="Search Project"
        />
      </div>
      <button className="flex items-center bg-white border border-gray-400 rounded-md px-4 py-2 w-fit">
        <svg
          className="w-5 h-5 text-gray-500 mr-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.8a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707v3.172a1 1 0 0 1-.293.707l-2 2a1 1 0 0 1-1.707-.707v-3.172a1 1 0 0 0-.293-.707L3.293 7.507A1 1 0 0 1 3 6.8V4z"
          />
        </svg>
        <span className="text-gray-600">Filter</span>
        <svg
          className="w-4 h-4 text-gray-500 ml-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  )
}

export default Navbar

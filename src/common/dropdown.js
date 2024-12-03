import React from "react";

const Dropdown = ({
  options,
  onSelect,
  selectedValue,
  placeholder,
  dropdownOpen,
  setDropdownOpen,
  buttonStyle = "",
  selectBodyStyle = "",
  selectColumnStyle = "",
  icons = true,
}) => {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`block px-3 py-2 bg-transparent text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 ${buttonStyle}`}
      >
        {selectedValue || placeholder}
        {icons === true ? (
          <svg
            className={`w-4 h-4 text-white inline-block ml-2 transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 00-.707.293l-7 7a1 1 0 001.414 1.414L10 5.414l6.293 6.293a1 1 0 001.414-1.414l-7-7A1 1 0 0010 3z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <></>
        )}
      </button>

      {dropdownOpen && (
        <div
          className={`absolute w-full bg-transparent border border-gray-300 rounded-md mt-2 shadow-lg z-10 ${selectBodyStyle}`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-3 py-2 text-white cursor-pointer hover:bg-gray-500 ${selectColumnStyle}`}
              onClick={() => {
                onSelect(option);
                setDropdownOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

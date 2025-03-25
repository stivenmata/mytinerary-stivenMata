import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="flex flex-col items-center my-4">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={handleChange}
        className="px-4 py-2 w-full max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;

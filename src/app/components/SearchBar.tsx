// SearchBar Component
import { Search } from "lucide-react";
const SearchBar = () => (
  <div className="relative w-full mb-8">
    <input
      type="text"
      placeholder="Search for ideas here"
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
    />
    <Search
      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={20}
    />
  </div>
);

export default SearchBar;

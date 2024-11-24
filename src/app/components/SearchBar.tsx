// SearchBar Component
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search works..."
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
      />
      <Search
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};

export default SearchBar;

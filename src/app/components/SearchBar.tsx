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
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {/* Optional: Add search icon */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        🔍
      </div>
    </div>
  );
};

export default SearchBar;

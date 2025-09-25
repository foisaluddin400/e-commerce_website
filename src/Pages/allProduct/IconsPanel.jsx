import React, { useState } from "react";
import { Search, X } from "lucide-react";

// Sample categories and icons (using Lucide icons as placeholders; replace with actual icon data)
const categories = [
  { id: "emojis", name: "Emojis", icons: ["😊", "😂", "❤️", "⭐"] },
  { id: "shapes", name: "Shapes & Symbols", icons: ["★", "▲", "●", "♦"] },
  { id: "sports", name: "Sports & Games", icons: ["⚽", "🏀", "🎾", "🎯"] },
  { id: "animals", name: "Animals", icons: ["🐶", "🐱", "🐦", "🐘"] },
  { id: "nature", name: "Nature", icons: ["🌳", "🌸", "☀️", "🌙"] },
  { id: "parties", name: "Parties & Events", icons: ["🎉", "🎂", "🎁", "🎈"] },
  { id: "occupations", name: "Occupations", icons: ["👨‍💼", "👩‍🏫", "👮", "👨‍🍳"] },
];

export default function IconsPanel({ onAddIcon }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("emojis");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const filteredIcons = categories
    .flatMap((cat) => cat.icons.map((icon, index) => ({ ...cat, icon, index })))
    .filter((item) => item.icon.includes(searchTerm) || item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSearchResults(!!term);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Icons & Artwork</h3>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search for artwork"
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Categories or Search Results */}
      {!showSearchResults ? (
        <>
          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`p-2 rounded cursor-pointer ${
                  activeCategory === category.id ? "bg-blue-100 border-blue-500" : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="text-center">
                  <div className="mx-auto mb-1 text-2xl">{category.icons[0]}</div>
                  <span className="text-xs text-gray-600">{category.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Icons in Active Category */}
          <div className="grid grid-cols-4 gap-2">
            {categories.find((cat) => cat.id === activeCategory)?.icons.map((icon, index) => (
              <button
                key={index}
                onClick={() => onAddIcon(`${activeCategory}-${icon}`)}
                className="p-2 border rounded hover:bg-gray-100 flex items-center justify-center text-2xl"
              >
                {icon}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Search Results */}
          <div className="mb-2 text-sm text-gray-600">Search Results</div>
          <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {filteredIcons.map((item) => (
              <button
                key={`${item.id}-${item.index}`}
                onClick={() => onAddIcon(`${item.id}-${item.icon}`)}
                className="p-2 border rounded hover:bg-gray-100 flex items-center justify-center text-2xl"
              >
                {item.icon}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
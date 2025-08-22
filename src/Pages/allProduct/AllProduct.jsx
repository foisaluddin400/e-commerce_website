import React, { useState } from "react";
import { ChevronDown, ChevronUp, Star, Menu, X } from "lucide-react";
import img1 from "../../assets/Home/box.png";
import img2 from "../../assets/Home/shirt.png";
import img3 from "../../assets/Home/shirt1.png";
import { Link } from "react-router-dom";
// Dummy Data
const categories = [
  "T-Shirts & V-Necks",
  "Sweaters & Long Sleeves",
  "Zipper Hoodies",
  "Hoodies",
  "Sweatpants",
  "Dresses",
  "Hats & Beanies",
  "Blank Hats",
];

const colors = [
  { name: "Gray", class: "bg-gray-400" },
  { name: "Yellow", class: "bg-yellow-400" },
  { name: "Green", class: "bg-green-500" },
  { name: "Red", class: "bg-red-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Navy", class: "bg-blue-900" },
  { name: "Teal", class: "bg-teal-500" },
  { name: "Pink", class: "bg-pink-400" },
];

const sizes = ["XS", "S", "M", "L", "XL", "2X"];
const brands = Array.from({ length: 5 }, () => "Adidas");
const priceRanges = [
  "$50-$100",
  "$70-$150",
  "$100-$120",
  "$120-$200",
  "$90-$100",
  "$50-$100",
];

const products = [
  {
    id: 1,
    name: "Gildean Softstyle Jersey T shirt",
    price: 1160,
    originalPrice: 960,
    discount: 26,
    rating: 4.5,
    reviews: 75,
    size: "XL",
    image: img1,
    badge: "Best Sell",
  },
  {
    id: 2,
    name: "Gildean Softstyle Jersey T shirt",
    price: 1160,
    originalPrice: 960,
    discount: 26,
    rating: 4.5,
    reviews: 75,
    size: "XL",
    image: img2,
    badge: "Best Sell",
  },
  {
    id: 3,
    name: "Gildean Softstyle Jersey T shirt",
    price: 1160,
    originalPrice: 960,
    discount: 26,
    rating: 4.5,
    reviews: 75,
    size: "XL",
    image: img3,
    badge: "Best Sell",
  },
];

const AllProduct = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState("T-Shirts & V-Necks");
  const [sortBy, setSortBy] = useState("featured");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar Content Component
  const SidebarContent = () => (
    <div className="p-6 bg-white w-64 h-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-6">Filters</h2>

      {/* Categories */}
      <div className="mb-8">
        <ul className="space-y-3">
          {categories
            .slice(0, showMore ? categories.length : 8)
            .map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`text-left w-full text-sm hover:text-pink-500 transition-colors ${
                    selectedCategory === category
                      ? "text-pink-500 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
        </ul>
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-3 text-pink-500 hover:text-pink-600 text-sm flex items-center"
        >
          Show {showMore ? "Less" : "More"}
          {showMore ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )}
        </button>
      </div>

      {/* Color Family */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Color Family</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`w-8 h-8 rounded border border-gray-300 hover:border-pink-500 ${color.class}`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:border-pink-500 hover:bg-pink-500 hover:text-white transition"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.map((brand, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input type="checkbox" className="w-4 h-4 accent-pink-500" />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-medium mb-4">Price</h3>
        <div className="space-y-3">
          {priceRanges.map((range, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input type="checkbox" className="w-4 h-4 accent-pink-500" />
              <span className="text-sm">{range}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h1 className="text-xl font-bold">All Product</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 border rounded-md"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0 border rounded-lg shadow">
          <SidebarContent />
        </aside>

        {/* Sidebar Drawer for Mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative bg-white w-64 h-full shadow-lg z-50">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="text-gray-700">All Product</span>
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            <span>{selectedCategory}</span>
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">{selectedCategory}</h1>
           
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden border border-gray-200 rounded-lg  hover:shadow-lg transition"
              >
                <div className="relative bg-light py-7">
                  <div className="flex justify-center  mb-4">
                   <Link to={'/allProduct/productDetails'}> <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-32 h-32 object-contain"
                    /></Link>
                  </div>
                  {/* Badge */}
                  <span className="absolute bottom-0  bg-primary text-white text-xs px-2 py-1 ">
                     -{product.discount}%
                  </span>
                  <span className="absolute top-0 right-0 rounded-bl bg-primary text-white text-xs px-2 py-1 rounded-tr">
                     {product.badge}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-medium mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="text-sm text-gray-600">
                      {product.size}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllProduct;

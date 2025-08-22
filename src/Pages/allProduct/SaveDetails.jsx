import React, { useState } from "react";

const SaveDetails = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Black", "White", "Red", "Blue"];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-6">
        
        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src="https://via.placeholder.com/400"
            alt="product"
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">
            Custom T-Shirt Design
          </h1>
          <p className="text-gray-600">
            Save your favorite designs with perfect customization. Choose size,
            color, and quantity before saving.
          </p>

          {/* Sizes */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Size</h2>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Color</h2>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                    selectedColor === color
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Quantity</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-lg text-lg font-bold"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="px-3 py-1 border rounded-lg text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Save Design
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDetails;

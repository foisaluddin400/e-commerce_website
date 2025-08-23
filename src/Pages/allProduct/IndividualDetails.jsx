import React, { useState } from "react";
import { ZoomIn, Upload } from "lucide-react";
import img from '../../assets/Home/shirt1.png'
const IndividualDetails = () => {
      const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("XL");
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    img,
    img,
   img,
    img,
  ];

  const thumbnailLabels = ["Front", "Back", "Mid", "Rear"];

  const subtotal = 200;
  const shipping = 141.9;
  const total = subtotal + shipping;
  return (
   <div className=" ">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">CustomWear</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-red-500">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-red-500">
              Shop
            </a>
            <a href="#" className="text-gray-700 hover:text-red-500">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-red-500">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt="Product main view"
                className="w-full h-96 object-cover rounded-lg "
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow">
                <ZoomIn className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <div key={index} className="text-center">
                  <button
                    onClick={() => setSelectedImage(index)}
                    className={`w-full h-20 rounded-md border-2 overflow-hidden ${
                      selectedImage === index ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${thumbnailLabels[index]} view`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <span className="text-sm text-gray-500 mt-1 block">{thumbnailLabels[index]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mb-2">Best Sell</span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gildean Softstyle Jersey T shirt</h1>
              <p className="text-gray-600">
                These T-shirts are dominating the fashion scene with their unique designs and top-quality fabric. Pick your favorite now!
              </p>
            </div>

            {/* Product Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              >
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm font-medium ml-4">Price:</span>
              <span className="text-lg font-bold text-red-500">${subtotal}</span>
            </div>

  

            {/* Pricing Breakdown */}
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full py-2 bg-dark text-white ">
                Add to Cart
              </button>
              <button className="w-full py-2 bg-primary text-white rounded hover:bg-red-600">
                Submit Design
              </button>
            </div>

       
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualDetails
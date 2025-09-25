import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import bag from "../../assets/Home/bag.png";
import box from "../../assets/Home/box.png";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "B-Series Neklage",
    price: 375,
    oldPrice: 400,
    discount: "-25%",
    img: "https://via.placeholder.com/200x200?text=Neklage",
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 2,
    name: "AK-900 Ladies Beg",
    price: 960,
    oldPrice: 1160,
    discount: "-35%",
    img: bag,
    rating: 4,
    reviews: 75,
  },
  {
    id: 3,
    name: "S-Series Gift Box Birthday",
    price: 375,
    oldPrice: 400,
    discount: "-25%",
    img: box,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 4,
    name: "S-Series Gift Box Birthday",
    price: 375,
    oldPrice: 400,
    discount: "-25%",
    img: box,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 5,
    name: "B-Series Neklage",
    price: 375,
    oldPrice: 400,
    discount: "-25%",
    img: "https://via.placeholder.com/200x200?text=Neklage",
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 6,
    name: "AK-900 Ladies Beg",
    price: 960,
    oldPrice: 1160,
    discount: "-35%",
    img: bag,
    rating: 4,
    reviews: 75,
  },
  {
    id: 7,
    name: "S-Series Gift Box Birthday",
    price: 375,
    oldPrice: 400,
    discount: "-25%",
    img: box,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 8,
    name: "S-Series Gift Box Birthday",
    price: 375,
    oldPrice: 400,
    discount: "-25%",
    img: box,
    rating: 4.5,
    reviews: 99,
  },
];

const AccessoryGift = () => {
  return (
    <div className="">
      {/* Title */}
      <div className="flex justify-between items-center mt-20 mb-6">
        <div className="flex items-center ">
          <div className="w-[5px] h-12 rounded-r bg-primary mr-4 "></div>
          <div>
            <h2 className="text-2xl font-semibold ">Product</h2>
            <p className="text-gray-600 text-sm md:block hidden">
              Discover top opportunities curated for entrepreneurs.
            </p>
          </div>
        </div>
        <div>
          <Link to={"/all-category"}>
            <h1 className="text-primary">View All</h1>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="relative border bg-white rounded-lg p-4 hover:shadow-lg transition group"
          >
            {/* Discount Badge */}
            <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              {item.discount}
            </span>

            {/* Wishlist + Cart */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <button className="bg-white p-2 rounded-full shadow hover:text-red-500">
                <FaHeart />
              </button>
              <button className="bg-dark p-2 rounded-full shadow text-white">
                <FaShoppingCart />
              </button>
            </div>

            {/* Image */}
            <Link to={"/allProduct/productDetails"}>
              <div className="flex justify-center mb-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </Link>
            <button className="bg-red-500 text-white w-full py-2 mt-3 rounded hover:bg-red-600 opacity-0 group-hover:opacity-100 transition">
              Add To Cart
            </button>
            {/* Name */}
            <h3 className="text-gray-800 font-semibold text-sm mb-2">
              {item.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary font-bold">${item.price}</span>
              <span className="text-gray-400 line-through text-sm">
                ${item.oldPrice}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center text-yellow-400 text-sm">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(item.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-gray-500 ml-2">({item.reviews})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessoryGift;

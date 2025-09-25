import React from "react";
import { Link } from "react-router-dom";
import shirt from "../../assets/Home/shirt.png";
import tshirt from "../../assets/Home/shirt1.png";
import { useGetCategoryQuery } from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";

const AllCategory = () => {
     const { data: category } = useGetCategoryQuery();
  const categories = [
    {
      title: "Canvas Cotton Hoodie",
      img: tshirt,
      link: "/allProduct/productDetails",
    },
    {
      title: "Premium Cotton Shirt",
      img: shirt,
      link: "/allProduct/productDetails",
    },
    {
      title: "Classic Casual Shirt",
      img: shirt,
      link: "/allProduct/productDetails",
    },
    {
      title: "Trendy Cotton Hoodie",
      img: tshirt,
      link: "/allProduct/productDetails",
    },
    {
      title: "Summer Cotton Wear",
      img: shirt,
      link: "/allProduct/productDetails",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 lg:px-0  ">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Explore Our Categories
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {category?.data?.map((category, index) => (
          <Link
            to={`/allProduct?category=${category._id}`}
            key={index}
            className="group bg-white rounded-2xl border hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-56 flex justify-center items-center ">
              <img
                 src={`${imageUrl}${category?.imageUrl}`}
                alt={category.name}
                className="h-40 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Title */}
            <div className="p-5 text-center">
              <h3 className="text-xl text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                {category.name}
              </h3>
            
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, ChevronDown } from "lucide-react";
import img3 from "../../assets/Home/man.png";
import ReletedProduct from "./ReletedProduct";
import { ReviewDetails } from "./ReviewDetails";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("XS");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const splideRef = useRef(null);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];
  const colors = [
    "bg-teal-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-400",
    "bg-pink-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-orange-400",
    "bg-black",
  ];

  const slides = [
    {
      id: 1,

      img: img3,
    },
    {
      id: 2,

      img: img3,
    },
    {
      id: 3,

      img: img3,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <span className="text-primary">All Product</span> &gt;{" "}
        <span className="text-primary">T-Shirts & V-Necks</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Product Image */}

        <div className="relative">
          <div className="absolute top-1/2 left-4 z-20">
            <button
              onClick={() => splideRef.current?.go("<")}
              className="bg-white border rounded-full p-2 shadow hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 z-20">
            <button
              onClick={() => splideRef.current?.go(">")}
              className="bg-white border rounded-full p-2 shadow hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>

          <Splide
            ref={splideRef}
            options={{
              type: "loop",
              autoplay: true,
              interval: 3000,
              arrows: false,
              pagination: false,
            }}
          >
            {slides.map((slide) => (
              <SplideSlide key={slide.id}>
               <div className="border">
                 <img
                  src={slide.img}
                  alt="Product"
                  className="h-[400px] w-full object-contain"
                />
               </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>

        {/* <div>
         <div className="relative flex items-center justify-center border rounded-lg ">
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <img
            src={img3}
            alt="Product"
            className="h-[400px] w-full object-contain"
          />

          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
       </div> */}

        {/* Right: Product Info */}
        <div>
          {/* Badge + Title */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary text-white text-xs px-2 py-1 rounded">
              Best Sell
            </span>
            <span className="text-gray-600 text-sm">
              Gildean Softstyle Jersey T shirt
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-2">
            Gildean Softstyle Jersey T shirt
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 fill-yellow-400"
                />
              ))}
              <Star className="h-5 w-5 text-gray-300" />
            </div>
            <span className="text-sm text-gray-600">(75)</span>
            <span className="text-sm text-gray-500">(20,000+ratings)</span>
            <span className="text-sm text-gray-500">23,325 reviews</span>
          </div>

          {/* Color */}
          <div className="mb-4">
            <p className="font-medium mb-2">Color :</p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 36 }).map((_, i) => (
                <button
                  key={i}
                  className={`w-[30px] h-[30px] rounded ${
                    colors[i % colors.length]
                  } border hover:scale-110 transition`}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <p className="font-medium mb-2">Size</p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size
                      ? "bg-primary text-white border-pink-500"
                      : "hover:border-pink-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <Link to={"/allProduct/productDetails/design"}>
              {" "}
              <button className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded font-medium">
                START DESIGNING →
              </button>
            </Link>
          </div>

          {/* Product Details Dropdown */}
          <div className="border rounded">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="w-full flex justify-between items-center px-4 py-3 text-gray-700 font-medium"
            >
              Product Details
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isDetailsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDetailsOpen && (
              <div className="px-4 py-3 text-sm text-gray-600 border-t">
                <p>
                  This is a high-quality Gildean Softstyle Jersey T-shirt made
                  with premium cotton. Perfect for casual wear and
                  customization.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReletedProduct></ReletedProduct>
      <ReviewDetails></ReviewDetails>
    </div>
  );
};

export default ProductDetails;

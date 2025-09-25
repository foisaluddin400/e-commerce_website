import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import shirt from "../../assets/Home/shirt.png";
import tshirt from "../../assets/Home/shirt1.png";
import { useGetCategoryQuery } from "../../Pages/redux/api/categoryApi";
import { imageUrl } from "../../Pages/redux/api/baseApi";
import { Link } from "react-router-dom";

const Apparel = () => {
  const { data: category } = useGetCategoryQuery();
  const splideRef = useRef(null);

  const handlePrevClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };



  return (
    <div className="mb-11">
      <div className="">
        <div className="">
          <div className="flex justify-between items-center mt-20 mb-6">
            <div className="flex items-center ">
              <div className="w-[5px] h-12 rounded-r bg-primary mr-4 "></div>
              <div>
                <h2 className="text-2xl font-semibold ">Category</h2>
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
          <div className="flex justify-end gap-6  mb-4">
            <div onClick={handlePrevClick}>
              <div className="     text-black cursor-pointer">
                <FaArrowLeft />
              </div>
            </div>
            <div onClick={handleNextClick}>
              <div className="text-black cursor-pointer">
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>

        <Splide
          ref={splideRef}
          options={{
            type: "loop",
            perPage: 6,
            gap: "1rem",
            arrows: false,
            pagination: false,
            breakpoints: {
              1024: { perPage: 3 },
              768: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
          aria-label="Category Slide"
        >
          {category?.data?.slice(0, 8)?.map((item, index) => (
            <SplideSlide key={index}>
              <div className="">
                <Link to={`/allProduct?category=${item._id}`}>
                  <div className="flex justify-center">
                    <div className="bg-white border rounded-lg flex items-center justify-center w-[180px] h-[180px]">
                      <img
                        className="w-[110px] h-[110px]"
                        src={`${imageUrl}${item?.imageUrl}`}
                        alt={item.name}
                      />
                    </div>
                  </div>
                </Link>

                <h1 className="p-2 text-center text-xl ">
                  <h1>{item.name} </h1>
                </h1>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Apparel;

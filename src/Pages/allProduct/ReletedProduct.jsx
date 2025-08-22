import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import shirt from "../../assets/Home/shirt.png";
import tshirt from "../../assets/Home/shirt1.png";
const ReletedProduct = () => {
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
    
      // Static category object
      const categories = [
        {
          title: "Canvas Cotton Hudi",
          img: tshirt,
          price: 32000,
          discountPrice: 20000,
          percent:"50% Off",
          save: 10000,
          link: "/products/tshirts",
        },
          {
          title: "Canvas Cotton Hudi",
          img: shirt,
          price: 32000,
          discountPrice: 20000,
          percent:"50% Off",
          save: 10000,
          link: "/products/tshirts",
        },
          {
          title: "Canvas Cotton Hudi",
          img: shirt,
          price: 32000,
          discountPrice: 20000,
          percent:"50% Off",
          save: 10000,
          link: "/products/tshirts",
        },
         {
          title: "Canvas Cotton Hudi",
          img: tshirt,
          price: 32000,
          discountPrice: 20000,
          percent:"50% Off",
          save: 10000,
          link: "/products/tshirts",
        },
          {
          title: "Canvas Cotton Hudi",
          img: shirt,
          price: 32000,
          discountPrice: 20000,
          percent:"50% Off",
          save: 10000,
          link: "/products/tshirts",
        },
         {
          title: "Canvas Cotton Hudi",
          img: shirt,
          price: 32000,
          discountPrice: 20000,
          percent:"50% Off",
          save: 10000,
          link: "/products/tshirts",
        },
          {
          title: "Canvas Cotton Hudi",
          img: tshirt,
          price: 32000,
          discountPrice: 20000,
          percent:"50% Off",
          save: 10000,
          link: "/products/tshirts",
        },
      ];
  return (
    <div>
        <div className="mb-11">
      <div className="">
        <div className="">
          <h1 className="text-2xl font-semibold  pb-4 pt-20">
            Recommended for you
          </h1>
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
            perPage: 5,
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
          {categories.map((item, index) => (
            <SplideSlide key={index}>
              <div className="border rounded-3xl">
                <a href={item.link}>
                  <div className="bg-light flex items-center justify-center rounded-t-3xl w-full h-[250px]">
                    <img
                      className="w-[150px]"
                      height={120}
                      width={200}
                      src={item.img}
                      alt={item.title}
                    />
                  </div>
                  <button className="absolute top-0 right-0 bg-primary px-2 text-white rounded-tr-3xl rounded-bl-3xl text-xl py-4">{item?.percent}</button>
                </a>
                <div className="p-3">
                  <h1 className="pt-2 text-xl border-b pb-3">
                    <h1>{item.title} </h1>
                    <h1 className="pt-2">
                      ${item.price}{" "}
                      <span className="line-through text-lg pl-2">
                        ${item?.discountPrice}
                      </span>{" "}
                    </h1>
                  </h1>
                  <h1 className="pt-2 text-xl">Save - {item?.save}</h1>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
    </div>
  )
}

export default ReletedProduct
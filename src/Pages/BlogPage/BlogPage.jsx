import React from "react";
import cover from "../../assets/Home/cover.png";
import { useGetBlogsQuery } from "../redux/api/blogApi";
import { imageUrl } from "../redux/api/baseApi";
import { Link } from "react-router-dom";
import { EyeIcon } from "lucide-react";
const BlogPage = () => {
  const { data: blogData, refetch } = useGetBlogsQuery();
  console.log(blogData);
  return (
    <div>
      <div>
        <div
          className="relative bg-cover bg-center py-28 text-white"
          style={{ backgroundImage: `url(${cover})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-40"></div>

          <div className="relative z-10 container m-auto items-center h-full  ">
            <h1 className=" md:text-5xl text-3xl font-semibold leading-tight">
              The Custom Tee Blog
            </h1>
            <p className="pt-4 w-full md:w-1/2 ">
              We started as a small team of creatives and developers who were
              frustrated by the limitations of traditional online shopping. Why
              settle for generic products when you can design your own?
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4 md:px-0 ">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {blogData?.data?.map((blog) => (
            <div key={blog._id} className="border rounded p-2 flex flex-col">
              <img
                src={`${imageUrl}${blog.imageUrl}`}
                alt={blog.title}
                className="h-60 w-full object-cover rounded"
              />
              <h3 className="font-semibold mt-3 line-clamp-2">{blog.title}</h3>
              <div className="flex justify-end gap-2 mt-4">
                <Link to={`/blog/blog-details/${blog?._id}`}>
                  {" "}
                  <div className="bg-sky-500 cursor-pointer text-white py-1 px-3 rounded">
                    <button>
                      <EyeIcon></EyeIcon>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

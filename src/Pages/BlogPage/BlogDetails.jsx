import React from "react";
import { useGetSingleBlogsQuery } from "../redux/api/blogApi";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import cover from "../../assets/Home/cover.png";
import { imageUrl } from "../redux/api/baseApi";
const BlogDetails = () => {
  const { id } = useParams();
  const { data: singleBlogData, isLoading } = useGetSingleBlogsQuery({ id });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  const blog = singleBlogData?.data;
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
      <div className="grid grid-cols-2 container m-auto py-11 gap-7">
        {blog?.imageUrl && (
          <img
            src={`${imageUrl}${blog.imageUrl}`}
            alt={blog.title}
            className="w-full object-cover rounded mb-6"
          />
        )}

        {/* Blog Title */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>

          {/* Blog Content */}
          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          ></div>
        </div>

        {/* Author and Date */}
        {/* <div className="flex justify-between text-gray-600 text-sm border-t pt-4">
          <div>
            <p>
              <span className="font-semibold">Author:</span>{" "}
              {blog?.author?.firstName} {blog?.author?.lastName}
            </p>
            <p>{blog?.author?.email}</p>
          </div>
          <div className="text-right">
            <p>
              <span className="font-semibold">Created:</span>{" "}
              {new Date(blog?.createdAt).toLocaleDateString()}{" "}
              {new Date(blog?.createdAt).toLocaleTimeString()}
            </p>
            <p>
              <span className="font-semibold">Updated:</span>{" "}
              {new Date(blog?.updatedAt).toLocaleDateString()}{" "}
              {new Date(blog?.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BlogDetails;

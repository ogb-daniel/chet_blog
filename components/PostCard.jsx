import React from "react";
import moment from "moment";
import Link from "next/link";
const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6 ">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg hover:object-bottom transition-all duration-500"
        />
      </div>
      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-orange-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full ">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 ">
          <img
            src={post.author.photo.url}
            alt={post.author.name}
            className="align-middle rounded-full w-10 h-10 object-cover"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.author.name}
          </p>
        </div>
        <div className="flex font-medium text-gray-700 justify-center items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M2 11h20v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-9zm15-8h4a1 1 0 0 1 1 1v5H2V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2z"
              fill="rgba(242,120,16,1)"
            />
          </svg>
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:p-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-orange-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;

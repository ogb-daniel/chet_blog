import React from "react";
import {
  getCategories,
  getCategoryPost,
  getPostDetails,
  getPosts,
} from "../../services";
import { useRouter } from "next/router";
import { Categories, PostWidget, PostCard, Loader, Layout } from "../../components";
const CategoryPosts = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <Layout>
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CategoryPosts;

export async function getStaticProps({ params }) {
  const data = await getCategoryPost(params.slug);
  return {
    props: { posts: data },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();

  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}

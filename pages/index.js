import Head from "next/head";
import { Categories, Layout, PostCard, PostWidget } from "../components";
import { FeaturedPosts } from "../sections";
import { getPosts } from "../services";

export default function Home({ posts }) {
  return (
    <Layout>
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>ChetBlog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8 ">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}

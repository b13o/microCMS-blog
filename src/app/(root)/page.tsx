import Hero from "./_components/hero";
import { getBlogPosts } from "@/lib/microcms/api";
import PostGrid from "./_components/post-grid";
import RecommendPost from "./_components/recommend-post";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <>
      <Hero />
      <RecommendPost posts={posts} />
      <PostGrid posts={posts} />
    </>
  );
}

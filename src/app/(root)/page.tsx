import Hero from "./_components/hero";
import { getBlogPosts } from "@/lib/microcms/api";
import PostGrid from "./_components/post-grid";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <>
      <Hero />
      {/* おすすめ記事 */}
      <PostGrid posts={posts} />
    </>
  );
}

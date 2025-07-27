import { getBlogPosts } from "@/lib/microcms/api";

export default async function Home() {
  const posts = await getBlogPosts();
  console.log(posts);

  return <p>確認</p>;
}

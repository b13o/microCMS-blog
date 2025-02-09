import { client } from "./client";
import { BlogPost } from "./types";

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await client.get({
    endpoint: "blog",
    queries: {
      limit: 6, // 最新の6件を取得
    },
  });
  return data.contents;
}

// microCMSから特定の記事を取得
async function getBlogPostById(id: string): Promise<BlogPost> {
  const data = await client.get({
    endpoint: `blog/${id}`,
  });
  return data;
}

export { getBlogPosts, getBlogPostById };

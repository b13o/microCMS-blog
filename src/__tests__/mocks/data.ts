import { BlogPost } from "@/lib/microcms/types";

export const mockPosts: BlogPost[] = [
  {
    id: "hello-world",
    title: "Post 1",
    body: '<h2 id="h5a2512f2b1">JAMstackとは？</h2><p>JAMstackは、「JavaScript・API・Markup」を組み合わせた、比較的新しいウェブ開発手法です。</p><p>従来のブログは、ユーザーのアクセス時にサーバーでHTMLを生成していましたが、JAMstackではビルド時に静的HTMLを生成してCDNで配信します。これにより、従来のブログと比べて表示速度が大幅に向上します。</p>',
    thumbnail: {
      url: "https://example.com/1.jpg",
      height: 800,
      width: 1200,
    },
    tags: [],
    createdAt: "2024-05-05T00:00:00.000Z",
    updatedAt: "2024-05-05T00:00:00.000Z",
    publishedAt: "2024-05-05T00:00:00.000Z",
    revisedAt: "2024-05-05T00:00:00.000Z",
  },
  {
    id: "test-intro",
    title: "Post 2",
    body: "<p>Content 2</p>",
    thumbnail: {
      url: "https://example.com/2.jpg",
      height: 800,
      width: 1200,
    },
    tags: [],
    createdAt: "2024-06-06T00:00:00.000Z",
    updatedAt: "2024-06-06T00:00:00.000Z",
    publishedAt: "2024-06-06T00:00:00.000Z",
    revisedAt: "2024-06-06T00:00:00.000Z",
  },
];

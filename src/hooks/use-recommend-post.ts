import { BlogPost } from "@/lib/microcms/types";
import { useState, useEffect } from "react";

const useRecommendPost = (posts: BlogPost[]) => {
  // おすすめの記事
  const [recommendedPost, setRecommendedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (posts.length === 0) return;

    // 記事の配列を受け取り、その中からランダムで選択
    const selectRandomPost = (posts: BlogPost[]): BlogPost => {
      const randomIndex = Math.floor(Math.random() * posts.length);
      return posts[randomIndex];
    };

    try {
      // ローカルストレージから既読記事のIDを取得
      const readPostIds = JSON.parse(
        localStorage.getItem("readPosts") || "[]"
      ) as string[];

      // 配列であることを確認
      if (!Array.isArray(readPostIds)) {
        throw new Error("Invalid readPosts format");
      }

      // 未読記事をフィルタリング
      const unreadPosts = posts.filter(
        (post) => !readPostIds.includes(post.id)
      );

      const selectedPost =
        unreadPosts.length > 0
          ? selectRandomPost(unreadPosts)
          : selectRandomPost(posts);

      setRecommendedPost(selectedPost);
    } catch (error) {
      console.error("Failed to access localStorage:", error);
      setRecommendedPost(selectRandomPost(posts));
    }
  }, [posts]);

  const markAsRead = (postId: string) => {
    try {
      const readPostIds = JSON.parse(
        localStorage.getItem("readPosts") || "[]"
      ) as string[];

      // 配列であることを確認
      if (!Array.isArray(readPostIds)) {
        throw new Error("Invalid readPosts format");
      }

      // もし、既読記事のIDリストにpostIdが含まれていなければ、それを追加
      if (!readPostIds.includes(postId)) {
        localStorage.setItem(
          "readPosts",
          JSON.stringify([...readPostIds, postId])
        );
      }
    } catch (error) {
      console.error("Failed to mark post as read:", error);
    }
  };

  return {
    isLoading: recommendedPost === null,
    recommendedPost,
    markAsRead,
  };
};

export default useRecommendPost;

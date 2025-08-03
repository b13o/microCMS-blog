"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/lib/microcms/types";
import useRecommendPost from "@/hooks/use-recommend-post";
import Link from "next/link";

type RecommendPostProps = {
  posts: BlogPost[];
};

const Skeleton = () => (
  <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div
      data-testid="skeleton" // テスト用のidを付与
      className="relative h-[70vh] rounded-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  </section>
);

function formatHtmlToText(html: string): string {
  // HTMLタグを半角スペースに置換して除去
  const textContent = html.replace(/<[^>]+>/g, " ").trim();
  // 連続する半角スペースを1つに統一
  const normalizedText = textContent.replace(/\s+/g, " ");
  // 最初の80文字を抽出
  return normalizedText.slice(0, 80) + "...";
}

const RecommendPost = ({ posts }: RecommendPostProps) => {
  const { isLoading, recommendedPost } = useRecommendPost(posts);

  if (isLoading || !recommendedPost) {
    return <Skeleton />;
  }

  const description = formatHtmlToText(recommendedPost.body);
  return (
    <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link
        href={`/posts/${recommendedPost.id}`}
        className="block relative h-[70vh] rounded-lg overflow-hidden group:"
      >
        <Image
          src={recommendedPost.thumbnail?.url}
          alt={recommendedPost.title}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
          {recommendedPost.tags?.map((tag) => (
            <Badge key={tag.id} variant={"secondary"} className="mr-2">
              {tag.name}
            </Badge>
          ))}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {recommendedPost.title}
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl">{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default RecommendPost;

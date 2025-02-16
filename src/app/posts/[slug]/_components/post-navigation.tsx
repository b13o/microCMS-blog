"use client";

import { BlogPost } from "@/lib/microcms/types";
import { Copy, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import useRecommendPost from "@/hooks/use-recommend-post";
import TwitterIcon from "@/components/twitter-icon";

const PostNavigation = ({ post }: { post: BlogPost }) => {
  const { markAsRead } = useRecommendPost([post]);

  useEffect(() => {
    markAsRead(post.id);
  }, []);

  const { toast } = useToast();
  const handleShare = async (type: "twitter" | "copy") => {
    const url = window.location.href;
    const text = post.title;

    if (type === "twitter") {
      const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, "_blank");
    } else if (type === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "🤩 URLをコピーしました",
          duration: 2000,
        });
      } catch {
        toast({
          title: "コピーに失敗しました",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 text-gray-600">
      <div className="flex items-center gap-4">
        <time>{new Date(post.createdAt).toLocaleDateString("ja-JP")}</time>
        <div className="h-1 w-1 bg-gray-200 rounded-full" />
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span key={tag.id}>#{tag.name}</span>
          ))}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center space-x-2 hover:text-gray-900">
          <span>シェア</span>
          <ChevronDown className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleShare("twitter")}>
              <TwitterIcon className="mr-2 h-4 w-4" />
              <span>Xでシェア</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("copy")}>
              <Copy className="mr-2 h-4 w-4" />
              <span>URLをコピー</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostNavigation;

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { BlogPost } from "@/lib/microcms/types";
import Link from "next/link";
import Image from "next/image";
import DynamicDateFormat from "@/components/dynamic-date-format";

type PostGridProps = {
  posts: BlogPost[];
};

const PostGrid = ({ posts }: PostGridProps) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">新着記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts &&
          posts.map((post) => (
            <Card key={post.id} className="overflow-hidden group pt-0">
              <Link href={`/posts/${post.id}`}>
                <div className="h-48 overflow-hidden">
                  <Image
                    src={post.thumbnail?.url}
                    alt={post.title}
                    width={post.thumbnail?.width}
                    height={post.thumbnail?.height}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="space-y-4 pt-4">
                  <div className="space-x-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag.id} className="w-fit">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                </CardHeader>
                <CardFooter className="text-sm text-gray-500">
                  <div className="flex items-center justify-between w-full">
                    <DynamicDateFormat date={post.publishedAt} />
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
      </div>
    </section>
  );
};

export default PostGrid;

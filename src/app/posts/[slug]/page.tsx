import { getBlogPostById, getBlogPosts } from "@/lib/microcms/api";
import { Bird } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PostNavigation from "./_components/post-navigation";

type PostDetailProps = {
  params: Promise<{ slug: string }>;
};
export default async function PostDetail({ params }: PostDetailProps) {
  const { slug } = await params;
  const post = await getBlogPostById(slug);
  return (
    <main className="flex-grow">
      <article className="max-w-3xl mx-auto px-4 pt-32 py-12">
        <header className="mb-6">
          <div className="relative">
            <h1 className="text-5xl font-medium leading-tight mb-8">
              {post.title}
            </h1>
            <Bird className="transform -rotate-12 h-8 w-8 absolute -top-4 -left-6" />
          </div>

          <PostNavigation post={post} />
        </header>

        <figure className="mb-12">
          <Image
            src={post.thumbnail?.url}
            alt={post.title}
            width={post.thumbnail?.width}
            height={post.thumbnail?.height}
            className="w-full rounded-lg"
            priority
          />
        </figure>

        <div
          className="prose prose-zinc prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        <footer className="space-y-6 mt-12">
          <div className="text-sm text-gray-400">― 記事の終わり</div>
          <Link href="/" className="inline-flex text-sm underline">
            記事一覧へ
          </Link>
        </footer>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.id }));
}

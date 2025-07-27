import { BellPlus } from "lucide-react";
import { Button } from "./ui/button";
import TwitterIcon from "./twitter-icon";
import Link from "next/link";

const TWITTER_URL = "#";

const NewsLetter = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-2xl mx-auto text-center px-4 space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full">
          <BellPlus className="w-6 h-6 text-blue-500" />
        </div>
        <h3 className="text-3xl font-medium">最新の投稿をチェック</h3>
        <p className="text-gray-600">
          X(Twitter)で、最新の記事や日々のアップデートを、投稿しています。
          <br />
          ぜひ、繋がりましょう🙌
        </p>
        <Link className="block" href={TWITTER_URL}>
          <Button>
            <TwitterIcon className="fill-white" />
            <span>フォロー</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NewsLetter;

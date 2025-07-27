import { Bug } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8 mx-auto text-center">
      <span className="font-bold text-gray-600 block">The blog</span>
      <div className="relative max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          My Programming Journey
        </h1>
        <Bug className="transform -rotate-12 h-12 w-12 absolute -top-3 -right-12" />
      </div>

      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        @handle の個人ブログです。Web 開発者としての学びを記録します。
        <br />
        まだまだビギナーなので、間違いや補足情報がありましたら、ぜひ教えてください
        ;)
      </p>
    </section>
  );
};

export default Hero;

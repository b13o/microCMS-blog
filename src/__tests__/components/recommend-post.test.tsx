import { render, screen } from "@testing-library/react";
import RecommendPost from "@/app/(root)/_components/recommend-post";
import { createStorageMock } from "../mocks/storage";
import { mockPosts } from "../mocks/data";

type ImageProps = React.ComponentProps<"img"> & {
  fill?: boolean;
  priority?: boolean;
};

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: ImageProps) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

const HTML_CONTENT = `
<h2 id="h5a2512f2b1">JAMstackとは？</h2>
<p>JAMstackは、「JavaScript・API・Markup」を組み合わせた、比較的新しいウェブ開発手法です。</p>
<p>従来のブログは、ユーザーのアクセス時にサーバーでHTMLを生成していましたが、JAMstackではビルド時に静的HTMLを生成してCDNで配信します。これにより、従来のブログと比べて表示速度が大幅に向上します。</p>
`;

describe("RecommendPost", () => {
  const localStorageMock = createStorageMock();

  beforeAll(() => {
    localStorageMock.clear();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.setItem("readPosts", JSON.stringify([mockPosts[0].id]));
  });

  describe("初期状態", () => {
    it("ローディングスケルトンが示される", () => {
      render(<RecommendPost posts={[]} />);
      expect(screen.getByTestId("skeleton")).toBeVisible();
    });
  });

  describe("データ表示", () => {
    it("おすすめ記事が表示されている", () => {
      render(<RecommendPost posts={mockPosts} />);

      const title = screen.getByRole("heading", {
        name: mockPosts[1].title,
      });
      expect(title).toBeVisible();

      const thumbnail = screen.getByRole("img");
      expect(thumbnail).toHaveAttribute("src", mockPosts[1].thumbnail.url);
    });

    it("記事詳細へのリンクが設定されている", () => {
      render(<RecommendPost posts={mockPosts} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", `/posts/${mockPosts[1].id}`);
    });

    it("HTMLタグが除去された導入文が表示されている", () => {
      const postWithHtml = {
        ...mockPosts[1],
        body: HTML_CONTENT,
      };
      render(<RecommendPost posts={[postWithHtml]} />);

      const description = screen.getByText(
        "JAMstackとは？ JAMstackは、「JavaScript・API・Markup」を組み合わせた、比較的新しいウェブ開発手法です。 従来のブログは、ユー..."
      );
      expect(description).toBeVisible();
    });
  });
});

import { render, screen } from "@testing-library/react";
import Home from "../../app/(root)/page";
import { http, HttpResponse } from "msw";
import { server } from "../setup/vitest-setup";
import { mockPosts } from "../mocks/data";

describe("Home Page", () => {
  describe("正常系", () => {
    it("ページ内の各コンポーネントが正しくレンダリングされる", async () => {
      render(await Home());

      // Hero セクションの確認
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: "My Programming Journey",
        })
      ).toBeVisible();

      // PostGrid セクションの確認
      expect(
        screen.getByRole("heading", { level: 2, name: "新着記事" })
      ).toBeVisible();
    });

    it("フェッチした記事が一覧で表示される", async () => {
      render(await Home());
      // h3の見出し（記事タイトル）の数を確認
      const articleHeadings = screen.getAllByRole("heading", { level: 3 });
      // モックデータが6件以上の場合は6件、それ以外は全件表示
      const expectedCount = mockPosts.length > 6 ? 6 : mockPosts.length;
      expect(articleHeadings).toHaveLength(expectedCount);
    });

    it("各記事の詳細ページへ正しくリンクされている", async () => {
      render(await Home());

      mockPosts.forEach((post) => {
        // H3のタイトルを見つける
        const titleHeading = screen.getByRole("heading", {
          level: 3,
          name: post.title,
        });

        // タイトルから最も近いリンクを取得
        const link = titleHeading.closest("a");
        expect(link).not.toBeNull();
        expect(link).toHaveAttribute("href", `/posts/${post.id}`);
      });
    });
  });

  describe("異常系", () => {
    it("APIエラー時は、Next.jsのエラーページにフォールバックされる", async () => {
      // 個別に API の挙動をカスタマイズすることが可能
      server.use(
        http.get("*/blog", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );
      // promiseが、rejectして、Next.jsのエラーファイルへ
      await expect(Home()).rejects.toThrow();
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostDetail from "@/app/posts/[slug]/page";
import { server } from "../setup/vitest-setup";
import { http, HttpResponse } from "msw";
import { mockPosts } from "../mocks/data";
import { createStorageMock } from "../mocks/storage";
import { Toaster } from "@/components/ui/sonner";

// shadcn/ui のsonner のモックを追加
// （内部で使用されているwindow.matchMedia のモック）
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("PostDetail Page", () => {
  describe("記事の表示", () => {
    beforeEach(async () => {
      render(
        await PostDetail({ params: Promise.resolve({ slug: mockPosts[0].id }) })
      );
    });

    it("記事タイトルが表示される", async () => {
      const title = await screen.findByRole("heading", {
        level: 1,
        name: mockPosts[0].title,
      });
      expect(title).toBeVisible();
    });

    it("日付が表示される", async () => {
      const date = await screen.findByText("2024/5/5");
      expect(date).toBeVisible();
    });

    it("本文が表示される", async () => {
      const headline = await screen.findByRole("heading", {
        level: 2,
        name: "JAMstackとは？",
      });
      expect(headline).toBeVisible();
    });
  });

  describe("記事のシェア", () => {
    beforeEach(async () => {
      const page = await PostDetail({
        params: Promise.resolve({ slug: mockPosts[0].id }),
      });
      render(
        <>
          {page}
          <Toaster />
        </>
      );
    });

    it("URLをコピーしたらメッセージが表示される", async () => {
      // Arrange
      const user = userEvent.setup();

      // Assert initial state
      // まず、メニューアイテムが表示されていないことを確認
      expect(screen.queryByText("URLをコピー")).not.toBeInTheDocument();

      // Act
      await user.click(screen.getByText("シェア"));
      await user.click(screen.getByText("URLをコピー"));

      // Assert
      expect(await screen.findByText("🤩 URLをコピーしました")).toBeVisible();
    });

    it("Xでシェアする場合は新しいタブで開く", async () => {
      const mockOpen = vi.fn();
      vi.spyOn(window, "open").mockImplementation(mockOpen);
      const user = userEvent.setup();

      // まず、メニューアイテムが表示されていない
      expect(screen.queryByText("Xでシェア")).not.toBeInTheDocument();

      await user.click(screen.getByText("シェア"));
      await user.click(screen.getByText("Xでシェア"));
      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining("https://x.com/intent/tweet"),
        "_blank"
      );
    });
  });

  describe("記事の既読機能", () => {
    it("ページ表示時に既読としてマークされる", async () => {
      const localStorageMock = createStorageMock();
      localStorageMock.clear();
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
        writable: true,
      });

      // 初期状態は、ローカルストレージが空
      expect(localStorageMock.getItem("readPosts")).toBeNull();

      render(
        await PostDetail({ params: Promise.resolve({ slug: mockPosts[0].id }) })
      );
      await waitFor(() => {
        expect(localStorageMock.getItem("readPosts")).toEqual(
          JSON.stringify([mockPosts[0].id])
        );
      });
    });
  });

  describe("異常系", () => {
    it("記事が見つからない場合は404を返す", async () => {
      server.use(
        http.get("/api/blog/not-found", () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      // status404で、Next.jsのnot-foundページへ
      await expect(
        PostDetail({ params: Promise.resolve({ slug: "not-found" }) })
      ).rejects.toThrow("fetch API response status: 404");
    });
  });
});

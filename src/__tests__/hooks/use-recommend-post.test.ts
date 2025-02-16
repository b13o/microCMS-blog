import { renderHook, act } from "@testing-library/react";
import useRecommendPost from "@/hooks/use-recommend-post";
import { mockPosts } from "../mocks/data";
import { BlogPost } from "@/lib/microcms/types";
import { createStorageMock } from "../mocks/storage";

describe("useRecommendPost", () => {
  const localStorageMock = createStorageMock();

  beforeEach(() => {
    localStorageMock.clear();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  describe("初期状態", () => {
    it("空配列の場合、初期状態を維持する", () => {
      const { result } = renderHook(() => useRecommendPost([]));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.recommendedPost).toBeNull();
    });
  });

  describe("記事の選択ロジック", () => {
    it("未読記事が1つの場合、必ずそれが選出される", () => {
      // 2つの記事のうち1つを既読にする
      localStorageMock.getItem.mockReturnValueOnce(
        JSON.stringify([mockPosts[0].id])
      );

      const { result } = renderHook(() => useRecommendPost(mockPosts));

      // 未読の記事が選択されていることを確認
      expect(result.current.recommendedPost?.id).toBe(mockPosts[1].id);
      // "readPosts"の引数でローカルストレージ内の値を取得していることを確認
      expect(localStorageMock.getItem).toHaveBeenCalledWith("readPosts");
    });

    it("未読記事が2つ以上の場合、未読の中からランダムに選出される", () => {
      // 3つの記事を用意し、1つだけ既読にする
      const extendedMockPosts: BlogPost[] = [
        ...mockPosts,
        {
          ...mockPosts[0],
          id: "test-3",
        },
      ];

      localStorageMock.getItem.mockReturnValueOnce(
        JSON.stringify([extendedMockPosts[0].id])
      );

      const { result } = renderHook(() => useRecommendPost(extendedMockPosts));

      // 選択された記事が未読記事の中から選ばれていることを確認
      const selectedId = result.current.recommendedPost?.id;
      console.log(selectedId);
      expect(selectedId).not.toBe(extendedMockPosts[0].id);
      expect(extendedMockPosts.map((p) => p.id)).toContain(selectedId);
    });

    it("全記事が既読の場合、全記事からランダムに選出される", () => {
      localStorageMock.getItem.mockReturnValueOnce(
        JSON.stringify(mockPosts.map((p) => p.id))
      );

      const { result } = renderHook(() => useRecommendPost(mockPosts));

      expect(result.current.recommendedPost).toBeTruthy();
      expect(mockPosts.map((p) => p.id)).toContain(
        result.current.recommendedPost?.id
      );
    });
  });

  describe("既読管理", () => {
    it("記事を既読としてマークできる", () => {
      const { result } = renderHook(() => useRecommendPost(mockPosts));

      // 状態更新をラップ（React のルール）
      act(() => {
        result.current.markAsRead("hello-world");
      });

      const setItemCall = localStorageMock.setItem.mock.calls[0];
      expect(setItemCall?.[0]).toBe("readPosts");
      expect(JSON.parse(setItemCall?.[1])).toContain("hello-world");
    });

    it("同じ記事を複数回既読マークしても1回だけ保存される", () => {
      const { result } = renderHook(() => useRecommendPost(mockPosts));

      act(() => {
        result.current.markAsRead("hello-world");
        result.current.markAsRead("hello-world");
      });

      const savedIds = JSON.parse(localStorageMock.getItem("readPosts"));
      expect(
        savedIds.filter((id: string) => id === "hello-world")
      ).toHaveLength(1);
    });
  });

  describe("エラーハンドリング", () => {
    it("ローカルストレージのエラー時は全記事から選択する", () => {
      localStorageMock.getItem.mockImplementationOnce(() => {
        throw new Error("Storage error");
      });

      const { result } = renderHook(() => useRecommendPost(mockPosts));

      expect(result.current.recommendedPost).toBeTruthy();
      expect(mockPosts.map((p) => p.id)).toContain(
        result.current.recommendedPost?.id
      );
    });
  });
});

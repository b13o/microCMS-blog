import Hero from "@/app/(root)/_components/hero";
import { render, screen } from "@testing-library/react";

describe("Hero", () => {
  it("メインタイトルが正しく表示される", () => {
    // 1. コンポーネントをレンダリング
    render(<Hero />);

    // 2. レンダー結果からh1要素を見つける
    const heading = screen.getByRole("heading", {
      // level: 1 は h1 要素を示します
      level: 1,
      // name は要素の中身のテキストを指定します
      name: "My Programming Journey",
    });

    // 3. 見つけた要素が画面に表示されていることを検証
    expect(heading).toBeVisible();
  });
});

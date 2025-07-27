// microCMS側で自動で作成される共通のフィールド
interface BaseContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// サムネイル画像の型
interface Thumbnail {
  url: string;
  height: number;
  width: number;
}

// タグの型
interface Tag extends BaseContent {
  name: string;
}

// ブログ記事の型
interface BlogPost extends BaseContent {
  title: string;
  body: string;
  thumbnail: Thumbnail;
  tags: Tag[];
}

// ページネーション情報を含むレスポンスの型
interface BlogListResponse {
  contents: BlogPost[];
  totalCount: number;
  offset: number;
  limit: number;
}

type TagListResponse = Tag[];

export type {
  BaseContent,
  Thumbnail,
  Tag,
  BlogPost,
  BlogListResponse,
  TagListResponse,
};

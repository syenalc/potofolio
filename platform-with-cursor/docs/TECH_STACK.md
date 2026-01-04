# 技術スタック

## 概要
本プロジェクトで使用する技術スタックの詳細を記載します。

---

## 🎨 フロントエンド

### フレームワーク
- **Next.js 16.1.1**
  - Reactベースのフルスタックフレームワーク
  - App Routerを使用
  - サーバーサイドレンダリング（SSR）と静的サイト生成（SSG）をサポート

### UIライブラリ
- **React 19.2.3**
  - ユーザーインターフェース構築のためのライブラリ
  - コンポーネントベースのアーキテクチャ

### スタイリング
- **Tailwind CSS 4.x**
  - ユーティリティファーストのCSSフレームワーク
  - レスポンシブデザインの実装に使用
  - PostCSS 4.xで処理

### 言語
- **TypeScript 5.x**
  - 型安全性を提供
  - 開発体験の向上

---

## 🎥 動画配信

### YouTube埋め込み
- **YouTube IFrame Player API**
  - YouTube動画の埋め込み再生に使用
  - 動画IDで管理
  - カスタムコントロールやイベントハンドリングが可能

---

## 📦 データ管理

### データ形式
- **JSON**
  - コース情報、セクション情報、動画情報をJSONファイルで管理
  - デモ版のため、静的データとして保存

### データ構造（予定）
```typescript
// コースデータ
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sections: Section[];
}

// セクションデータ
interface Section {
  id: string;
  title: string;
  videos: Video[];
}

// 動画データ
interface Video {
  id: string;
  title: string;
  youtubeId: string;
  duration?: number;
}
```

---

## 🛠️ 開発ツール

### パッケージマネージャー
- **npm** (または **yarn** / **pnpm**)

### リンター・フォーマッター
- **ESLint 9.x**
  - コード品質の維持
  - `eslint-config-next`を使用

### ビルドツール
- **Next.js ビルドシステム**
  - 開発サーバー: `next dev`
  - 本番ビルド: `next build`
  - 本番サーバー: `next start`

---

## 📁 プロジェクト構造（予定）

```
platform-with-cursor/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ（コース一覧）
│   ├── courses/
│   │   ├── [id]/
│   │   │   ├── page.tsx   # コース詳細ページ
│   │   │   └── watch/
│   │   │       └── page.tsx # 動画視聴ページ
│   ├── components/         # 再利用可能なコンポーネント
│   ├── lib/               # ユーティリティ関数
│   ├── types/             # TypeScript型定義
│   └── data/              # JSONデータファイル
├── public/                 # 静的ファイル
├── docs/                   # ドキュメント
└── package.json
```

---

## 🔧 依存関係

### 本番依存関係
- `next`: 16.1.1
- `react`: 19.2.3
- `react-dom`: 19.2.3

### 開発依存関係
- `@tailwindcss/postcss`: ^4
- `@types/node`: ^20
- `@types/react`: ^19
- `@types/react-dom`: ^19
- `eslint`: ^9
- `eslint-config-next`: 16.1.1
- `tailwindcss`: ^4
- `typescript`: ^5

---

## 🚀 今後の追加検討技術

### 状態管理（必要に応じて）
- **Zustand** または **Jotai**
  - 軽量な状態管理ライブラリ
  - 視聴履歴や進捗状況の管理に使用する可能性

### 動画プレーヤー（必要に応じて）
- **react-player**
  - YouTube以外の動画プラットフォームにも対応
  - より高度な動画制御が必要な場合に検討

### アニメーション（必要に応じて）
- **Framer Motion**
  - スムーズなアニメーション実装に使用

### フォーム管理（将来の認証機能用）
- **React Hook Form**
  - フォームの管理とバリデーション

---

## 📚 参考リソース

### 公式ドキュメント
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

---

## 🔄 バージョン管理

### 現在のバージョン
- Next.js: 16.1.1
- React: 19.2.3
- TypeScript: 5.x
- Tailwind CSS: 4.x

### アップデート方針
- セキュリティアップデートは優先的に適用
- メジャーバージョンアップは慎重に検討
- 依存関係の更新は定期的に確認


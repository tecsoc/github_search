This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 環境設定
.env.exampleを複製して.envを作成。
その後、GitHubのアクセストークンを取得し.envに記述

## アピールポイント
- トップページの検索クエリのテキストボックスの値を取得する時に、パフォーマンスを考慮しuseStateではなくuseRefを使う
- メモ化やuseCallbackを使った再レンダリング抑制
- GraphQLを使用していると聞いたのでGitHubのREST APIではなくGraphQLのAPIを使用
- パフォーマンスのため、リポジトリ詳細ページのデータ取得をサーバーサイドで行う
- 使いやすさのためにスター数でソートする機能、言語で絞り込む機能を追加
- コンポーネントのStorybookを作成
- ヘッダーをlayout.tsxに記述することで他のページと共通利用する
- GraphQL Code Generatorを使って型定義を生成した
- ユーザビリティーのために固定ヘッダーにしたこと
- 見やすさのため、リポジトリ詳細ページのStar数、Watcher数、Fork数、Issue数を表にする
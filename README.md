<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 保育園おさんぽマップメーカー

Google AI Studioで作成した、保育園のお散歩マップ作成アプリです。

View your app in AI Studio: https://ai.studio/apps/drive/1qHUjwDEtBqAMdfkb7MIX6c3jPJDkXKtr

## 🚀 GitHub Pagesにデプロイ

### 初回セットアップ

1. **GitHubリポジトリの設定**
   - GitHubリポジトリ（`park-map-maker`）のページを開く
   - `Settings` → `Secrets and variables` → `Actions` を開く
   - `New repository secret` をクリック
   - Name: `GEMINI_API_KEY`
   - Secret: あなたのGemini APIキーを入力
   - `Add secret` をクリック

2. **GitHub Pagesを有効化**
   - 同じリポジトリの `Settings` → `Pages` を開く
   - `Source` を `GitHub Actions` に設定

3. **コードをプッシュ**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

4. **デプロイ完了を確認**
   - リポジトリの `Actions` タブでデプロイ状況を確認
   - 完了したら `https://あなたのユーザー名.github.io/park-map-maker/` でアクセス可能

### 更新方法

mainブランチにプッシュすると自動的にデプロイされます：
```bash
git add .
git commit -m "Update app"
git push origin main
```

## 💻 ローカルで実行

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. `.env.local` ファイルを作成して、Gemini APIキーを設定:
   ```
   GEMINI_API_KEY=your-api-key-here
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

4. ブラウザで `http://localhost:3000` を開く

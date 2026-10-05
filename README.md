# PNG Drop Shadow Studio (透過PNGドロップシャドウ生成Webアプリ)

背景透過のPNG画像をアップロードし、ブラウザ上でリアルタイムにドロップシャドウ（影のボケ具合、濃さ、位置、色、余白自動拡張）を調整・プレビューして、高品質な透過PNGとしてダウンロードできるWebアプリケーションです。

---

## 主な機能・特徴

1. **リアルタイムプレビュー & 直感的な調整**
   - **ボケ具合 (Blur)**: 0〜100px（薄め・ボケ強めの微調整に対応）
   - **シャドウの濃さ (Opacity)**: 0〜100%
   - **シャドウの位置 (Offset X / Y)**: -80px 〜 +80px（上下左右の自在な位置調整）
   - **シャドウの色 (Color)**: カラーピッカーで白文字用・デザインに合わせた影色を選択可能
   - **余白（パディング）自動拡張**: 影のボケがキャンバス端で見切れてしまわないよう自動計算して拡張
   - **ワンクリックプリセット**: 「✨ 薄め・ボケ強め」「🍃 ナチュラル」「🎈 浮遊感」「💡 光彩（グロー）」

2. **背景切り替えプレビュー**
   - 透過チェック用の「市松模様」、白背景、黒背景、グレー背景をワンクリックで切り替え可能。

3. **完全クライアントサイド実行（高セキュリティ & 高速）**
   - 画像データはサーバーへ一切送信されず、すべて利用者のブラウザ（HTML5 Canvas API）内でのみ完結処理。
   - クリップボードからの直接ペースト（`Ctrl+V` / `Cmd+V`）やドラッグ＆ドロップにも対応。

---

## セキュリティ設計 (Security Architecture)

- **ゼロデータ送信 (Zero Data Transmission)**: アップロードされた画像ファイルはブラウザのメモリ内でのみ処理され、外部通信は一切発生しません。
- **厳格な CSP (Content Security Policy)**: `default-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob:; object-src 'none'; base-uri 'self';` を設定し、外部スクリプトの不正実行を遮断。
- **セキュリティレスポンスヘッダー**:
  - `X-Content-Type-Options: nosniff` (MIMEタイプスニッフィング抑止)
  - `X-Frame-Options: DENY` (クリックジャッキング対策)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()` (不要なブラウザ機能の無効化)
- **メモリ管理**: 画像ダウンロード後に `URL.revokeObjectURL()` を実行し、ブラウザメモリリークを防止。

---

## デプロイ環境

### 1. Cloudflare Workers
`src/worker.js` により、上記セキュリティヘッダーを付与してエッジから高速配信されます。
```bash
npx wrangler deploy
```

### 2. Cloudflare Pages
静的サイトとして `index.html` のみをそのままホスティングすることも可能です。
- Framework preset: `None`
- Build command: *(空欄)*
- Output directory: *(空欄または `/`)*

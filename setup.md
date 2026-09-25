環境構築で実施したこと
1. Macの既存環境を確認
以下を確認しました。
- macOS：26.6.2
- Mac：MacBookPro16,2（Intel）
- Node.js：20.17.0
- npm：10.8.2
- Gitリポジトリ：作成済み、初回コミット前
- Xcode本体：未インストール
- 空き容量：294GB
主な確認コマンド：
sw_vers
uname -m
node --version
npm --version
xcode-select -p
xcodebuild -version
git status --short --branch
df -h /System/Volumes/Data
2. Xcodeをインストール
Mac App StoreからXcodeをインストールしました。
インストール後、ターミナルがXcode本体を参照するよう設定しました。
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
確認結果：
Xcode 26.5
Build version 17F42
3. iOS Simulatorを確認
iOS 26.5のSimulatorがインストールされていることを確認しました。
xcrun simctl list devices available
主に使用している端末：
iPhone 17 Pro
iOS 26.5
4. Node.jsのバージョン管理を導入
既存のNode.js 20は直接削除せず、Homebrewからfnmを導入しました。
brew install fnm
.zshrcへ初期化設定を追加しました。
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc
Node.js 24をインストールしてデフォルトに設定しました。
fnm install 24
fnm default 24
fnm use 24
rehash
最終的なバージョン：
Node.js 24.21.0
npm 11.19.0
fnm 1.39.0
プロジェクト内では.node-versionでNode.jsを固定しています。
24.21.0
5. Expoプロジェクトを初期化
既存Gitリポジトリの直下へExpoプロジェクトを作成しました。
npx create-expo-app@latest .
選択した構成：
- Expo SDK 57
- React Native 0.86
- TypeScript
- Expo Router
- npm
- 既存Gitリポジトリをそのまま使用
6. Expoのサンプルコードを整理
公式テンプレートのサンプル画面を削除し、最小構成へリセットしました。
npm run reset-project
質問にはnを選択しました。
不要になったリセットコマンドも削除しました。
npm pkg delete scripts.reset-project
最小構成：
src/
└── app/
    ├── _layout.tsx
    └── index.tsx
7. ESLintを導入
初回のLint実行時に、Expo推奨設定を導入しました。
npm run lint
追加されたもの：
- ESLint
- eslint-config-expo
- eslint.config.js
8. プロジェクトの正常性を確認
以下のチェックを実行しました。
npx expo-doctor
npm run lint
npx tsc --noEmit
最終結果：
21/21 checks passed. No issues detected!
LintとTypeScript型チェックもエラーなしです。
9. iOS Simulatorで初期画面を確認
開発サーバーを起動しました。
npm run ios
Simulator上でExpoの初期画面と、リセット後の最小画面が表示されることを確認しました。
10. SQLiteを導入
Expo SDK 57互換版のSQLiteを導入しました。
npx expo install expo-sqlite
これにより、app.jsonへexpo-sqliteプラグインも追加されました。
依存パッケージをSDK 57の最新互換バージョンへ揃えました。
npx expo install --fix
11. SQLiteの最小実装を追加
以下のファイルを実装しました。
- [migrate.ts](/Users/user/Desktop/money_hunter/src/database/migrate.ts)
  - game.dbを初期化
  - WALモードを有効化
  - playerテーブルを作成
  - 初期プレイヤーデータを登録
  - PRAGMA user_versionでDBバージョンを管理
- [_layout.tsx](/Users/user/Desktop/money_hunter/src/app/_layout.tsx)
  - アプリ全体をSQLiteProviderで囲む
  - game.dbを画面から利用可能にする
- [index.tsx](/Users/user/Desktop/money_hunter/src/app/index.tsx)
  - SQLiteからゴールドを読み込む
  - +100 Gボタンでゴールドを更新
  - 更新後の値を再取得して表示
現在のテーブル：
player

- id
- level
- exp
- hp
- gold
12. SQLiteの永続化を確認
次の流れを実施しました。
1. アプリを起動
2. +100 Gでゴールドを増加
3. 開発サーバーを停止
4. Expo Goを完全終了
5. 開発サーバーとExpo Goを再起動
6. 再起動前のゴールドが残っていることを確認
Expo Goの終了には以下を使用しました。
xcrun simctl terminate booted host.exp.Exponent
結果として、SQLiteのデータがアプリ再起動後も保持されることを確認できました。
13. Simulator起動トラブルへの対応
Simulatorが停止状態の場合、npm run iosがタイムアウトすることがありました。
手動で端末を起動しました。
xcrun simctl bootstatus E863B0D1-8BB0-4047-9E23-C4F33457FDEA -b
open -a Simulator
Expo Goの存在と起動も確認しました。
xcrun simctl get_app_container booted host.exp.Exponent app
xcrun simctl launch booted host.exp.Exponent
安定して起動する場合は、現在は以下の流れを使えます。
npm start
その後、ターミナルで小文字のiを押します。
現在の状態
以下がすべて動作しています。
- React Native
- Expo SDK 57
- TypeScript
- Expo Router
- Xcode
- iOS Simulator
- Expo Go
- ESLint
- TypeScript型チェック
- SQLite
- データの保存
- アプリ再起動後のデータ保持
環境構築と基盤の動作確認は完了しており、次からMVPの本実装へ進める状態です。
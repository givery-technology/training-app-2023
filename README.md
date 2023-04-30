# Training app 2023
## docker-compose structure

- backend: 
  - go: 1.20.0
  - air: 1.43.0
    - https://github.com/cosmtrek/air
- frontend:
  - node:16.14.2
  - react: 18
    - https://reactjs.org/docs/getting-started.html
  - @reduxjs/toolkit: 1.9
    - https://redux-toolkit.js.org/introduction/getting-started
  - react-redux: 8
    - https://react-redux.js.org/introduction/getting-started
  - react-router-dom: 6
    - https://v5.reactrouter.com/web/guides/philosophy
  - bootstrap: 5
    - https://getbootstrap.com/docs/5.1/getting-started/introduction/
  - classnames: 2.3
    - https://github.com/JedWatson/classnames
  - typescript: 5
    - https://www.typescriptlang.org/docs/
- db: 
  - mysql: 8.0.28

## How to develop

```
$ docker-compose up
```

- backend: `http://localhost:9000`
- frontend: `http://localhost:3000`

でWebサーバが起動します。

### Initial setup

初期状態で、DBから値を読み出してHello worldを表示する構成となっていますが、初回起動時にはテーブルが存在しないためWebサーバへのアクセスがエラーになります。
起動後に以下のスクリプトを実行してテーブルの作成と初期データの投入を行ってください。

```
host$ docker-compose exec db sh -c "mysql < /sqlscripts/create.sql"
host$ docker-compose exec db sh -c "mysql training < /sqlscripts/insert.sql"
```

Reactを開発する人はブラウザの拡張機能をインストールしてください。(任意)

- React Developer Tools
- Redux DevTools

## How to connect database

```
host$ docker-compose exec db mysql training
```

## How to connect backend/frontend shell

```
host$ docker-compose exec backend bash
host$ docker-compose exec frontend bash
```

ライブラリをインストールする場合はdockerコンテナ側でコマンドを実行してください。

e.g.

```
host$ docker-compose exec backend bash
backend$ go get -u gorm.io/gorm
```

```
host$ docker-compose exec frontend bash
frontend$ npm install something
```

VS Codeなどで開発する場合、コンテナ側にインストールされたモジュールが参照できないために、エディター上でエラーが表示される場合があります。

その場合はお手数ですが、ホストOS側でもモジュールのインストールをお願いします。

```
host$ cd frontend
host$ npm install
```

[(プロ向け)Dockerの中のNode使うのいやだと思った人向けの脱獄の手引き](https://github.com/givery-technology/training-app-2023/wiki/Docker%E3%81%AE%E4%B8%AD%E3%81%AENode%E4%BD%BF%E3%81%86%E3%81%AE%E3%81%84%E3%82%84%E3%81%A0%E3%81%A8%E6%80%9D%E3%81%A3%E3%81%9F%E4%BA%BA%E5%90%91%E3%81%91%E3%81%AE%E8%84%B1%E7%8D%84%E3%81%AE%E6%89%8B%E5%BC%95%E3%81%8D)

## ディレクトリ構成

### Backend
```
backend/
  internal/ : ソースコード
    config/ : 設定類
    entities/ : モデル/エンティティ
    external/ : 外部環境との接続定義
    interfaces/ : インターフェース
    middleware/ : ginのmiddleware
    repositories/ : リポジトリ - systemに近い部分の実装
    usecases/ : ユースケース - ビジネスに近い部分の実装    
```

### Frontend

```
frontend/
  index.html
  public/
    画像などの静的ファイル
  src/
    main.tsx: Reactアプリケーションが起動するエントリーポイント
    app/ 
      機能横断的に使う機能をまとめる
    features/
      post/
        ドメインごとの機能をまとめる
    shared/
      components/
        再利用可能な小さなUIコンポーネント
      services/
        共有関数
      hooks/
        共有React Hook
      models/
        共有Model
      store/
        Redux Store関連
```

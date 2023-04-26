# Training app 2023
## docker-compose structure

- backend: 
  - go: 1.20.0
  - air: 1.43.0
    - https://github.com/cosmtrek/air
- frontend:
  - node:16.14.2
  - create-react-app: 5.0.1
    - https://create-react-app.dev/docs/getting-started
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

`npm install`はホストOS側で実行してもコンテナにファイルが共有されますが、`node gyp`を使うようなライブラリの場合バイナリに差分が出る可能性があるのでコンテナ側で実行する方が望ましいです。

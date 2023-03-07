import React from 'react';

import { AppRoute } from './AppRoute';

import './App.scss';

function App() {
  return (
    <div className="app-root">
      <header className="app-header">サンプルアプリケーション</header>
      <main className="app-body container">
        <AppRoute />
      </main>
    </div>
  );
}

export default App;

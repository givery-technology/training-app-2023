import { AppRoute } from './AppRoute';
import { NavLink } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <NavLink to="/" className="app-header__logo">
          サンプルアプリケーション
        </NavLink>
      </header>
      <main className="app-main container">
        <div className="app-menu">
          <nav>
            <NavLink to="/" className="app-menu__nav-item">
              トップ
            </NavLink>
          </nav>
        </div>
        <div className="app-body">
          <AppRoute />
        </div>
      </main>
    </div>
  );
}

export default App;

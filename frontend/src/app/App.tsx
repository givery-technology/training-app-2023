import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { AppRoute } from './AppRoute';
import { Header } from './Header';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { APIService } from '../shared/services';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const { ready } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(APIService.getUser());
  }, [dispatch]);

  return (
    <div className="app-root">
      <Header />
      <main className="app-main container">
        <div className="app-menu">
          <nav>
            <NavLink to="/" className="app-menu__nav-item">
              トップ
            </NavLink>
          </nav>
        </div>
        <div className="app-body">{ready && <AppRoute />}</div>{' '}
      </main>
    </div>
  );
}

export default App;

import { NavLink, useNavigate } from 'react-router-dom';

import { Button } from '../shared/components';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { APIService } from '../shared/services';

import './Header.scss';

export function Header() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(APIService.signOut());
  };

  return (
    <header className="app-header">
      <NavLink to="/" className="app-header__logo">
        サンプルアプリケーション
      </NavLink>
      <div>
        {user ? (
          <div className="app-header__user-name">
            <div>{user.name}</div>
            <Button onClick={signOut}>サインアウト</Button>
          </div>
        ) : (
          <Button onClick={() => navigate('/signin')}>サインイン</Button>
        )}
      </div>
    </header>
  );
}

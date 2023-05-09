import { useState } from 'react';

import { Button, Label, Input } from '../../../shared/components';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { APIService } from '../../../shared/services';

import './SignIn.scss';

type SignInForm = {
  username: string;
  password: string;
};

export function SignIn() {
  const {
    signIn: { error },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<SignInForm>({ username: '', password: '' });

  const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const values = { ...form, [`${name}`]: value };
    setForm(values);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(APIService.signIn(form));
  };

  return (
    <div className="app-signin">
      <form className="app-signin__form needs-validation" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            name="username"
            onChange={onFormChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">パスワード</Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={onFormChange}
            required
          />
        </div>
        <div>
          {error && (
            <p className="text-danger">ユーザー名またはパスワードが違います</p>
          )}
          <Button color="primary" type="submit">
            サインイン
          </Button>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { actions } from '../../../shared/store';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { APIService } from '../../../shared/services';
import { Button, Label, Input, Textarea } from '../../../shared/components';

import './PostNew.scss';

type PostNewForm = {
  title: string;
  body: string;
};

export function PostNew() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { submitting } = useAppSelector((state) => state.post);

  const [form, setForm] = useState<PostNewForm>({ title: '', body: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (creating && !submitting) {
      dispatch(actions.showToast('登録しました。'));
      setCreating(false);
      navigate('/');
    }
  }, [submitting, creating, navigate, dispatch]);

  const onFormChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    const values = { ...form, [`${name}`]: value };
    setForm(values);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    dispatch(APIService.createPost(form));
  };

  return (
    <div className="app-post-new">
      <header className="app-post-new__header">
        <h1>新しい投稿を作成する</h1>
      </header>
      <form className="app-post-new__form needs-validation" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input id="title" name="title" onChange={onFormChange} required />
        </div>
        <div>
          <Label htmlFor="body">内容</Label>
          <Textarea id="body" name="body" onInput={onFormChange} required />
        </div>
        <div>
          <Button color="primary" type="submit" disabled={creating}>
            投稿する
          </Button>
        </div>
      </form>
    </div>
  );
}
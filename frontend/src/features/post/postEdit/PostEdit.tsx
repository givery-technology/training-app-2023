import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { APIService } from '../../../shared/services';
import { Button, Label, Input, Textarea } from '../../../shared/components';
import { actions } from '../../../shared/store';

import './PostEdit.scss';

type PostEditForm = {
  title: string;
  body: string;
};

export function PostEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { submitting } = useAppSelector((state) => state.post);
  const { post } = useAppSelector((state) => state.post);
  const { user } = useAppSelector((state) => state.user);

  const [form, setForm] = useState<PostEditForm>({ title: '', body: '' });
  const [updating, setUpdating] = useState(false);

  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const onBack = useCallback(() => {
    navigate(`/posts/${postId}`, { replace: true });
  }, [postId, navigate]);

  useEffect(() => {
    if (user && post) {
      if (user.id !== post.user_id) {
        navigate(`/posts/${post.id}`);
      }
    }
  }, [user, post, navigate]);

  useEffect(() => {
    if (postId) {
      dispatch(APIService.getPost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      const { title, body } = post;
      setForm({ title, body });
    }
  }, [post]);

  useEffect(() => {
    if (updating && !submitting) {
      dispatch(actions.showToast('変更しました。'));
      setUpdating(false);
      onBack();
    }
  }, [submitting, updating, navigate, onBack, dispatch]);

  const onFormChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    const values = { ...form, [`${name}`]: value };
    setForm(values);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    dispatch(APIService.updatePost({ postId, ...form }));
  };

  return (
    <div className="app-post-edit">
      <form
        className="app-post-edit__form needs-validation"
        onSubmit={onSubmit}
      >
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={onFormChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="body">内容</Label>
          <Textarea
            id="body"
            name="body"
            value={form.body}
            onInput={onFormChange}
            required
          />
        </div>
        <div className="app-post-edit__footer">
          <Button disabled={updating} onClick={onBack}>
            キャンセル
          </Button>
          <Button color="primary" type="submit" disabled={updating}>
            変更を保存する
          </Button>
        </div>
      </form>
    </div>
  );
}

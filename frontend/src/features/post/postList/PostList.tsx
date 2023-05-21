import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostListItem } from '../partials';
import { Button } from '../../../shared/components';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { APIService } from '../../../shared/services';

import './PostList.scss';

export function PostList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { posts } = useAppSelector((state) => state.post);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(APIService.getPostList());
  }, [dispatch]);

  return (
    <div className="app-post-list">
      <header className="app-post-list__header">
        <h1>投稿一覧</h1>
        <div>
          {user && (
            <Button color="primary" onClick={() => navigate('/posts/new')}>
              新しい投稿を作成
            </Button>
          )}
        </div>
      </header>
      <section className="app-post-list__body">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}

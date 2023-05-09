import { useEffect } from 'react';

import { PostListItem } from '../partials';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { APIService } from '../../../shared/services';

import './PostList.scss';

export function PostList() {
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(APIService.getPostList());
  }, [dispatch]);

  return (
    <div className="app-post-list">
      <header className="app-post-list__header">
        <h1>投稿一覧</h1>
      </header>
      <section className="app-post-list__body">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
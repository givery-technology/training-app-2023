import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { APIService, DateService } from '../../../shared/services';

import './PostDetail.scss';

export function PostDetail() {
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const dispatch = useAppDispatch();
  const { post } = useAppSelector((state) => state.post);

  useEffect(() => {
    if (postId) {
      dispatch(APIService.getPost(postId));
    }
  }, [dispatch, postId]);

  return (
    <div className="app-post-detail">
      <header className="app-post-detail__header">
        <h1>{post?.title}</h1>
        <div className="app-post-detail__header-dates">
          <div className="app-post-detail__header-date">
            <span className="app-post-detail__header-date-label">作成日時</span>
            <time dateTime={post?.created_at}>
              {DateService.formatDateTime(post?.created_at)}
            </time>
          </div>
          <div className="app-post-detail__header-date">
            <span className="app-post-detail__header-date-label">更新日時</span>
            <time dateTime={post?.updated_at}>
              {DateService.formatDateTime(post?.updated_at)}
            </time>
          </div>
        </div>
      </header>
      <section className="app-post-detail__body">{post?.body}</section>
      <footer className="app-post-detail__footer">
        <div className="app-post-detail__footer-user">{post?.user_name}</div>
      </footer>
    </div>
  );
}

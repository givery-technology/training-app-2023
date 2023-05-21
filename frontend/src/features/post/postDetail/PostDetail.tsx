import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { actions } from '../../../shared/store';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { APIService, DateService } from '../../../shared/services';
import { Button } from '../../../shared/components';

import './PostDetail.scss';

export function PostDetail() {
  const params = useParams<{ postId: string }>();
  const postId = Number(params.postId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { submitting } = useAppSelector((state) => state.post);
  const { post } = useAppSelector((state) => state.post);
  const { user } = useAppSelector((state) => state.user);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (postId) {
      dispatch(APIService.getPost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (deleting && !submitting) {
      dispatch(actions.showToast('削除しました。'));
      setDeleting(false);
      setShowDeleteConfirm(false);
      navigate('/', { replace: true });
    }
  }, [submitting, deleting, navigate, dispatch]);

  const onDelete = () => {
    setDeleting(true);
    dispatch(APIService.deletePost(postId));
  };

  const onCloseModal = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="app-post-detail">
      <header className="app-post-detail__header">
        <div className="app-post-detail__header-title">
          <h1 className="text-break">{post?.title}</h1>
          <div>
            {user && (
              <Button color="primary" onClick={() => navigate('/posts/new')}>
                新しい投稿を作成
              </Button>
            )}
          </div>
        </div>
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
        <div className="app-post-detail__footer-buttons">
          {user?.id === post?.user_id && (
            <>
              <Button
                color="link"
                onClick={() => navigate(`/posts/${postId}/edit`)}
              >
                編集
              </Button>
              <Button color="link" onClick={() => setShowDeleteConfirm(true)}>
                削除
              </Button>
            </>
          )}
        </div>
        <div className="app-post-detail__footer-user">{post?.username}</div>
      </footer>
      {showDeleteConfirm && (
        <div className="modal app-post-detail__delete-modal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">投稿の削除</h5>
                <Button
                  type="button"
                  className="btn-close"
                  onClick={onCloseModal}
                />
              </div>
              <div className="modal-body">
                <p>投稿を削除します。よろしいですか？</p>
              </div>
              <div className="modal-footer">
                <Button onClick={onCloseModal}>キャンセル</Button>
                <Button color="danger" onClick={onDelete}>
                  削除する
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

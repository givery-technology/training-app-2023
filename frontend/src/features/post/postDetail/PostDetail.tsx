import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { actions } from '../../../shared/store';
import { Comment } from '../../../shared/models';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { APIService, DateService } from '../../../shared/services';
import { Button, Modal } from '../../../shared/components';
import { PostComment } from '../partials';

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
  const [postComment, setPostComment] = useState<{
    show: boolean;
    comment?: Comment;
  }>({
    show: false,
  });
  const [commentDelete, setCommentDelete] = useState<{
    show: boolean;
    comment?: Comment;
  }>({
    show: false,
  });

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
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
      onCloseModal();
      if (showDeleteConfirm) {
        navigate('/', { replace: true });
      }
    }
  }, [submitting, deleting, showDeleteConfirm, navigate, dispatch]);

  useEffect(() => {
    if (updating && !submitting) {
      dispatch(actions.showToast('保存しました。'));
      setUpdating(false);
      onHideComment();
    }
  }, [submitting, updating, dispatch]);

  useEffect(() => {
    if (creating && !submitting) {
      dispatch(actions.showToast('追加しました。'));
      setCreating(false);
      onHideComment();
    }
  }, [submitting, creating, dispatch]);

  const onDelete = () => {
    setDeleting(true);
    dispatch(APIService.deletePost(postId));
    onCloseModal();
    if (showDeleteConfirm) {
      navigate('/', { replace: true });
    }
  };

  const onCreateComment = (body: string) => {
    setCreating(true);
    dispatch(APIService.createComment({ postId, body }));
  };

  const onUpdateComment = (commentId: number, body: string) => {
    setUpdating(true);
    dispatch(APIService.updateComment({ commentId, body }));
  };

  const onDeleteComment = () => {
    if (commentDelete.comment) {
      setDeleting(true);
      dispatch(APIService.deleteComment(commentDelete.comment.id));
    }
  };

  const onCloseModal = () => {
    setShowDeleteConfirm(false);
    setCommentDelete({ show: false });
  };

  const onHideComment = () => {
    setPostComment({ show: false });
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
      <section className="app-post-detail__action">
        <div className="app-post-detail__action-buttons">
          {' '}
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
        <div className="app-post-detail__action-user">{post?.username}</div>
      </section>
      <section className="app-post-detail__comments">
        {post?.comments.map((comment) => (
          <PostComment
            key={comment.id}
            isEdit={comment.id === postComment.comment?.id}
            comment={comment}
            onClickSave={(body) => onUpdateComment(comment.id, body)}
            onClickEdit={() => setPostComment({ show: true, comment })}
            onClickCancel={onHideComment}
            onClickDelete={() => setCommentDelete({ show: true, comment })}
          />
        ))}
      </section>
      <div className="app-post-detail__add-comment">
        {user &&
          (postComment.show && postComment.comment === undefined ? (
            <PostComment
              isEdit={true}
              onClickCancel={onHideComment}
              onClickSave={onCreateComment}
            />
          ) : (
            <Button
              color="primary"
              onClick={() => setPostComment({ show: true })}
            >
              コメントを追加する
            </Button>
          ))}
      </div>
      {showDeleteConfirm && (
        <Modal
          headerElement="投稿の削除"
          bodyElement={<p>投稿を削除します。よろしいですか？</p>}
          footerElement={
            <>
              <Button onClick={onCloseModal}>キャンセル</Button>
              <Button color="danger" onClick={onDelete}>
                削除する
              </Button>
            </>
          }
          onClickClose={onCloseModal}
        />
      )}
      {commentDelete.show && commentDelete.comment && (
        <Modal
          headerElement="コメントの削除"
          bodyElement={<p>コメントを削除します。よろしいですか？</p>}
          footerElement={
            <>
              <Button onClick={onCloseModal} disabled={submitting}>
                キャンセル
              </Button>
              <Button
                color="danger"
                onClick={onDeleteComment}
                disabled={submitting}
              >
                削除する
              </Button>
            </>
          }
          onClickClose={onCloseModal}
        />
      )}
    </div>
  );
}

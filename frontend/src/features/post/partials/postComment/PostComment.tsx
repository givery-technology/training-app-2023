import { useEffect, useState } from 'react';

import { Comment } from '../../../../shared/models';
import { Button, Textarea } from '../../../../shared/components';
import { DateService } from '../../../../shared/services';
import { useAppSelector } from '../../../../shared/hooks';

import './PostComment.scss';

export type PostCommentProps = {
  isEdit?: boolean;
  comment?: Comment;
  onClickSave?: (body: string) => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  onClickCancel?: () => void;
};

export function PostComment(props: PostCommentProps) {
  const { isEdit, comment } = props;

  const { user } = useAppSelector((state) => state.user);
  const { submitting } = useAppSelector((state) => state.comment);

  const [showTextarea, setShowTextarea] = useState(isEdit);
  const [form, setForm] = useState({ body: '' });

  const onFormChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value: body } = e.currentTarget;
    setForm({ body });
  };

  const onSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof props.onClickSave === 'function') {
      props.onClickSave(form.body);
    }
  };

  const onDelete = () => {
    if (typeof props.onClickDelete === 'function') {
      props.onClickDelete();
    }
  };

  const onEdit = () => {
    if (typeof props.onClickEdit === 'function') {
      props.onClickEdit();
    }
  };

  const onCancel = () => {
    if (typeof props.onClickCancel === 'function') {
      props.onClickCancel();
    }
  };

  useEffect(() => {
    if (comment) {
      const { body } = comment;
      setForm({ body });
    }
    setShowTextarea(isEdit);
  }, [isEdit, comment]);

  return (
    <div className="app-post-comment">
      {showTextarea ? (
        <>
          <form className="app-post-comment__form" onSubmit={onSubmit}>
            <div>
              <Textarea value={form.body} onInput={onFormChange} required />
            </div>
            <div className="app-post-comment__footer">
              <div className="app-post-comment__footer-item">
                <Button onClick={onCancel} disabled={submitting}>
                  キャンセル
                </Button>
                <Button color="primary" type="submit" disabled={submitting}>
                  保存する
                </Button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="app-post-comment__comment">{comment?.body}</div>
          <div className="app-post-comment__footer">
            <div className="app-post-comment__footer-item">
              {user?.id === comment?.user_id && (
                <>
                  <Button color="link" onClick={onEdit}>
                    編集
                  </Button>
                  <Button color="link" onClick={onDelete}>
                    削除
                  </Button>
                </>
              )}
            </div>
            <div className="app-post-comment__footer-item">
              <div>{comment?.username}</div>
              <div className="app-post-comment__updated-at">
                <time dateTime={comment?.updated_at}>
                  {DateService.formatDateTime(comment?.updated_at)}
                </time>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

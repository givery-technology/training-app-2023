import { NavLink } from 'react-router-dom';

import { PostList } from '../../../../shared/models';
import { DateService } from '../../../../shared/services';

import './PostListItem.scss';

export type PostListItemProps = {
  post: PostList;
};

export function PostListItem(props: PostListItemProps) {
  const { post } = props;

  return (
    <div className="app-post-list-item">
      <div className="app-post-list-item__header">
        <h3>
          <NavLink to={`/posts/${post.id}`} className="text-break">
            {post.title}
          </NavLink>
        </h3>
      </div>
      <div className="app-post-list-item__footer">
        <div>{post.user_name}</div>
        <div>
          更新日時: <time dateTime={post?.created_at}>{DateService.formatDateTime(post?.updated_at)}</time>
        </div>
      </div>
    </div>
  );
}
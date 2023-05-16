import { useAppDispatch } from "../../shared/hooks";
import { actions } from "../../shared/store";
import { Dummy } from "../../shared/models/Dummy";

export type PostListItemProps = {
  post: Dummy;
  isHighlighted?: boolean;
};

export const PostListItem = (props: PostListItemProps) => {
  const dispatch = useAppDispatch();

  const { post, isHighlighted } = props;

  return (
    <div
    style={{ background: isHighlighted ? "yellow" : "" }}
    onClick={() => {
      dispatch(actions.setSelectedPost({ post }));
    }}
  >
      <div>{post.id}</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </div>
  );
};

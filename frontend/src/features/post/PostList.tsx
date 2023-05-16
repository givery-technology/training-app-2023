import { PostListItem } from "./PostListItem";
import { useAppSelector } from "../../shared/hooks";
import { dummy } from "../../shared/models/Dummy";

import "./PostList.scss";

export const PostList = () => {
  const { selectedPost } = useAppSelector((state) => state.app);

  return (
    <div className="post-list">
      PostList
      <div className="post-list__selected-post">
        <div>Selected Post</div>
        {selectedPost ? (
          <PostListItem post={selectedPost} />
        ) : (
          "Not Selected Yet"
        )}
      </div>
      <div className="post-list__list">
        {dummy.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            isHighlighted={post.id === selectedPost?.id}
          />
        ))}
      </div>
    </div>
  );
};

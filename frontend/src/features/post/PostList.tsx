import { PostListItem } from "./PostListItem";
import { useAppSelector } from "../../shared/hooks";
import { dummy } from "../../shared/models/Dummy";

export const PostList = () => {
  const { selectedPost } = useAppSelector((state) => state.app);

  return (
    <div>
      PostList
      <div>
        <div>Selected Post</div>
        {selectedPost ? (
          <PostListItem post={selectedPost} />
        ) : (
          "Not Selected Yet"
        )}
      </div>
      <div>
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

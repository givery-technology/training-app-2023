import { PostListItem } from "./PostListItem";
import { dummy } from "../../shared/models/Dummy";

export const PostList = () => {
  return (
    <div>
      PostList
      <div>
        {dummy.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

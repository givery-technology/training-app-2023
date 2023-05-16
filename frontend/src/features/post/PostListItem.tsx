import { useState } from "react";
import { Dummy } from "../../shared/models/Dummy";

export type PostListItemProps = {
  post: Dummy;
};

export const PostListItem = (props: PostListItemProps) => {
  const { post } = props;

  const [toggle, setToggle] = useState(false);

  return (
    <div
      style={{ background: toggle ? "yellow" : "" }}
      onClick={() => setToggle(!toggle)}
    >
      <div>{post.id}</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </div>
  );
};

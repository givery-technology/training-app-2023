import { Routes, Route } from 'react-router-dom';

import { PostList, PostDetail } from '../features/post';

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
    </Routes>
  );
};

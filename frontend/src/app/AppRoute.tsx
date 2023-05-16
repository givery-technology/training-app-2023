import { Routes, Route } from 'react-router-dom';

import { PostList } from '../features/post/PostList';

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
    </Routes>
  );
};

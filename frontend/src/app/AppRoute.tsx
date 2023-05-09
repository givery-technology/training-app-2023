import { Routes, Route } from 'react-router-dom';

import { PostList, PostDetail, SignIn, Private } from '../features';
import { PrivateRoute } from './partials';

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/private"
        element={
          <PrivateRoute>
            <Private />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

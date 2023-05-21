import { Routes, Route } from 'react-router-dom';

import {
  PostList,
  PostDetail,
  PostNew,
  PostEdit,
  Private,
  SignIn,
} from '../features';
import { PrivateRoute } from './partials';

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route
        path="/posts/new"
        element={
          <PrivateRoute>
            <PostNew />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/:postId/edit"
        element={
          <PrivateRoute>
            <PostEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="/private"
        element={
          <PrivateRoute>
            <Private />
          </PrivateRoute>
        }
      />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

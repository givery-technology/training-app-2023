import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HelloWorld } from '../features/helloworld';

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HelloWorld />} />
    </Routes>
  );
};

import React, { useEffect } from 'react';

import { useAppDispatch, useAppSeletor } from '../../shared/hooks';
import { APIService } from '../../shared/services';

export function HelloWorld() {
  const { hello } = useAppSeletor((state) => state.hello);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(APIService.getHello());
  }, [dispatch]);

  return <div>{hello?.message}</div>;
}

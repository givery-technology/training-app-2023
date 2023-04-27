import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { APIService } from '../../shared/services';

export function HelloWorld() {
  const { hello } = useAppSelector((state) => state.hello);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(APIService.getHello());
  }, [dispatch]);

  return <div>{hello?.message}</div>;
}

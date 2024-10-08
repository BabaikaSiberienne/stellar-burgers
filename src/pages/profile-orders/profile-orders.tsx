import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getPostOrders,
  selPostedOrders
} from '../../components/slices/postedOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selPostedOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostOrders());
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};

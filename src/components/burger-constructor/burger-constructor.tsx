import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  postOrder,
  selOrderModelData,
  selOrderRequest,
  clearOrder
} from '../slices/burgerConstructorSlice';
import { freeBin, selItem } from '../slices/burgerConstructorElementSlice';
import { selUserState } from '../slices/userAuthSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selItem);
  const dispatch = useDispatch();
  const orderRequest = useSelector(selOrderRequest);
  const { user } = useSelector(selUserState);
  const orderModalData = useSelector(selOrderModelData);
  const nav = useNavigate();
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      nav('./login'), { replace: true };
      return;
    }
    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(postOrder(ingredients));
  };
  const closeOrderModal = () => {
    dispatch(freeBin());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

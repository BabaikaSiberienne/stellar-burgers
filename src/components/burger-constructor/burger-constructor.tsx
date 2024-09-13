import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selIngredients } from '../slices/ingredientsSlice';
import { useDispatch, useSelector } from 'src/services/store';
import { postOrder, selOrderModelData, selOrderRequest } from '../slices/burgerConstructorSlice';
import { selItem } from '../slices/burgerConstructorElementSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selItem);
  const dispatch = useDispatch()
  const orderRequest = useSelector(selOrderRequest);

  const orderModalData = useSelector(selOrderModelData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    // const orderIngredients = {
    //   constructorItems.bun._id,
    //   ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    //   constructorItems.bun._id
    // }
    // dispatch(postOrder(orderIngredients))
  };
  const closeOrderModal = () => {};

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

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, getPrice, getRecipe } from '../../services/constructor/reducer';
import { getAllIngredients } from '../../services/ingredients/reducer';
import { createOrder } from '../../services/order/actions';
import { AppDispatch } from '../../main';
import ConstructorIngredient from './constructor-ingredient/constructor-ingredient';
import { getUser } from '../../services/user/reducer';
import { useNavigate } from 'react-router-dom';

function BurgerConstructor() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const recipe = useSelector(getRecipe);
  const ingredients = useSelector(getAllIngredients);
  const price = useSelector(getPrice);
  const user = useSelector(getUser);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: {id: string}) {
      onDropHandler(item.id);
    },
  });

  function onDropHandler(id: string) {
    const ingredient = ingredients.find(ingredient => ingredient._id === id);
    if (ingredient){
      dispatch(addIngredient(ingredient));
    }
  }

  const closeModal = () => {
    setShowOrderDetails(false);
  }

  const createBurgerOrder = () => {
    if (!user) {
      navigate('/login');
    }
    const orderIngredients: string[] = (recipe.wrap ? [recipe.wrap?._id] : []).
      concat(recipe.stuff.map(ingredient => ingredient._id), recipe.wrap ? [recipe.wrap?._id] : []);
    dispatch(createOrder(orderIngredients));
    setShowOrderDetails(true);
  }

  return (
    <section ref={dropTarget} className={styles.Section}>
      {recipe.wrap ? (<ConstructorElement
        type="top"
        isLocked={true}
        text={recipe.wrap.name + ' (верх)'}
        price={recipe.wrap.price}
        thumbnail={recipe.wrap.image}
        extraClass="ml-8 mb-4"
      />) : (
        <div className="constructor-element constructor-element_pos_top ml-8 mb-4">
          <p className={styles.Placeholder}>Выберите булку</p>
        </div>
      )}
      <ul className={styles.StuffList}>
        {
          recipe.stuff.length > 0 ? recipe.stuff.map(ingredient => (
            <ConstructorIngredient key={ingredient.uid} ingredient={ingredient} />
          )) :
          (<div className="constructor-element ml-8 mb-4">
            <p className={styles.Placeholder}>Выберите начинку</p>
          </div>)
        }
      </ul>
      {recipe.wrap ? (<ConstructorElement
        type="bottom"
        isLocked={true}
        text={recipe.wrap.name + ' (низ)'}
        price={recipe.wrap.price}
        thumbnail={recipe.wrap.image}
        extraClass="ml-8 mt-4"
      />) : (
          <div className="constructor-element constructor-element_pos_bottom ml-8 mb-4">
            <p className={styles.Placeholder}>Выберите булку</p>
          </div>
        )
      }
      <div className={styles.Order}>
        <span className={styles.Price}>
          {price}
          <CurrencyIcon className="largeicon" type="primary" />
        </span>
        <Button disabled={!recipe.wrap} htmlType="button" size="large" onClick={createBurgerOrder}>Оформить заказ</Button>
      </div>
      {showOrderDetails && (
        <Modal header="" onClose={closeModal}>
          <OrderDetails />
        </Modal>)
      }
    </section>
  );
}

export default BurgerConstructor;
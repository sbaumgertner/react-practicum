import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerRecipeModel } from '../../model';
import { useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';

type BurgerConstructorProps = {
  recipe: BurgerRecipeModel;
}

function BurgerConstructor({recipe}: BurgerConstructorProps) {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  function getPrice(): number {
    return recipe.stuff.reduce((sum, ingredient) => sum += ingredient.price, 0)
     + (recipe.wrap?.price || 0) * 2;
  }

  const closeModal = () => {
    setShowOrderDetails(false);
  }

  const showModal = () => {
    setShowOrderDetails(true);
  }

  return (
    <section className={styles.Section}>
      {recipe.wrap && (<ConstructorElement
        type="top"
        isLocked={true}
        text={recipe.wrap.name + ' (верх)'}
        price={recipe.wrap.price}
        thumbnail={recipe.wrap.image}
        extraClass="ml-8 mb-4"
      />)}
      <ul className={styles.StuffList}>
        {
          recipe.stuff.map((ingredient, i) => (
            <li key={i} className={styles.StuffItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))
        }
      </ul>
      {recipe.wrap && (<ConstructorElement
        type="bottom"
        isLocked={true}
        text={recipe.wrap.name + ' (низ)'}
        price={recipe.wrap.price}
        thumbnail={recipe.wrap.image}
        extraClass="ml-8 mt-4"
      />)}
      <div className={styles.Order}>
        <span className={styles.Price}>
          {getPrice()}
          <CurrencyIcon className="largeicon" type="primary" />
        </span>
        <Button htmlType="button" size="large" onClick={showModal}>Оформить заказ</Button>
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
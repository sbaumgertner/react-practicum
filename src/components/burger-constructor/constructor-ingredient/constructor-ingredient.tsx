import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorIngredientModel } from '../../../model';
import styles from './constructor-ingredient.module.css';
import { useDispatch } from 'react-redux';
import { deleteIngredient, moveIngredient } from '../../../services/constructor/reducer';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

function ConstructorIngredient({ingredient}: {ingredient: ConstructorIngredientModel}) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{isOver}, drop] = useDrop({
    accept: 'constructorIngredient',
    drop(item: {uid: string}){
      dispatch(moveIngredient({uidFrom: item.uid, uidTo: ingredient.uid}));
    },
    collect: (monitor) => ({
      isOver: monitor.getItem()?.uid !== ingredient.uid && monitor.isOver()
    })
  });
  const padding = isOver ? '80px 0 0' : '0';

  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructorIngredient',
    item: {uid: ingredient.uid},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;

  dragRef(drop(ref));

  function onIngredientDelete(uid: string) {
    dispatch(deleteIngredient({ uid }));
  }

  return (
    <li ref={ref} className={styles.StuffItem} style={{opacity, padding}}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onIngredientDelete(ingredient.uid)}
      />
    </li>
  );
}

export default ConstructorIngredient;
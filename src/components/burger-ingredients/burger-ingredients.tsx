import styles from './burger-ingredients.module.css';
import { IngredientModel, IngredientGroupModel, GroupedIngredientsModel, IngredientCountModel, GroupedIngredientModel } from '../../model';
import IngredientsGroup from './ingredients-group/ingredients-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';

type BurgerIngredientProps = {
  ingredients: IngredientModel[];
  ingredientsCount: IngredientCountModel[];
}

const tabs: IngredientGroupModel[] = [
  {type: 'bun', name: 'Булки'},
  {type: 'main', name: 'Начинки'},
  {type: 'sauce', name: 'Соусы'}
];

function BurgerIngredients({ingredients, ingredientsCount}: BurgerIngredientProps) {
  const [groups, setGroups] = useState<GroupedIngredientsModel[]>([]);
  const [tab, setTab] = useState(tabs[0].type);
  const [ingredientDetails, setIngredientDetails] = useState<IngredientModel>();

  function groupIngredients(): GroupedIngredientsModel[] {
    const countedIngredients: GroupedIngredientModel[] = ingredients.map(ingredient => 
      {
        const count = ingredientsCount.find(ingredientCnt => ingredientCnt.id === ingredient._id)?.count || 0;
        return {...ingredient, count};
    });
    return countedIngredients.reduce(
      (groups: GroupedIngredientsModel[], ingredient) => {
        const group = groups.find((group) => group.type === ingredient.type);
        if (group) {
          group.ingredients.push(ingredient);
        } else {
          const groupName: string = tabs.find(tab => tab.type === ingredient.type)?.name || '';
          groups.push({type: ingredient.type, name: groupName, ingredients: [ingredient]});
        }
        return groups;
      },
      []
    );
  }

  const closeModal = () => {
    setIngredientDetails(undefined);
  }

  const showModal = (id: string) => {
    setIngredientDetails(ingredients.find((ingredient => ingredient._id === id)));
  }

  useEffect(() => {
    setGroups(groupIngredients());
  }, [ingredients]);

  return (
    <section className={styles.Section}>
      <header className={styles.Header}>
        <h1>Соберите бургер</h1>
        <nav className={styles.Nav}>
          {groups.map((group) => (
            <Tab key={group.type} value={group.type} active={group.type === tab} onClick={setTab}>
              {group.name}
            </Tab>
          ))}
        </nav>
      </header>
      <ul className={styles.Groups}>
        {groups.map((group) => (
          <li key={group.type}>
            <IngredientsGroup type={group.name} ingredients={group.ingredients} onIngredientClick={showModal} />
          </li>
        ))}  
      </ul>
      {ingredientDetails && (
        <Modal header='Детали ингредиента' onClose={closeModal}>
          <IngredientDetails ingredient={ingredientDetails} />
        </Modal>)
      }
    </section>
  )
}

export default BurgerIngredients;
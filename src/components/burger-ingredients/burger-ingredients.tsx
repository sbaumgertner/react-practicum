import styles from './burger-ingredients.module.css';
import { tabs, TabType } from '../../model';
import IngredientsGroup from './ingredients-group/ingredients-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState<TabType>('bun');

  const groupsRefs = new Map();
  groupsRefs.set('bun', useRef(null));
  groupsRefs.set('main', useRef(null));
  groupsRefs.set('sauce', useRef(null));
  const tabsRef = useRef<HTMLElement>(null);

  const tabsRect = tabsRef?.current?.getBoundingClientRect();
  const tabsY = (tabsRect?.y || 0) + (tabsRect?.height || 0);

  function onScroll() {
    let minDistance: number | null = null;
    let currentType: TabType = currentTab;
    groupsRefs.forEach((ref, type) => {
      const dist = Math.abs((ref.current?.getBoundingClientRect().y || 0) - tabsY);
      if (minDistance === null || dist < minDistance) {
        minDistance = dist;
        currentType = type;
      }
    })
    if (currentTab !== currentType) {
      setCurrentTab(currentType);
    }
  }

  function onTabClick(tab: TabType) {
    setCurrentTab(tab);
    groupsRefs.get(tab)?.current?.scrollIntoView();
  }

  return (
    <section className={styles.Section}>
      <header className={styles.Header}>
        <h1>Соберите бургер</h1>
        <nav ref={tabsRef} className={styles.Nav}>
          {Array.from(tabs.entries()).map(([type, name]) => (
              <Tab key={type} value={type} active={type === currentTab} onClick={() => onTabClick(type)}>
                {name}
              </Tab>
          ))}
        </nav>
      </header>
      <ul className={styles.Groups} onScroll={onScroll}>
        {Array.from(tabs.keys()).map(type => (
          <li ref={groupsRefs.get(type)} key={type}>
            <IngredientsGroup type={type} />
          </li>
        ))}  
      </ul>
      {//currentIngredient && (
      // <Modal header='Детали ингредиента' onClose={closeModal}>
      //    <IngredientDetails />
      //  </Modal>)
      }
    </section>
  )
}

export default BurgerIngredients;
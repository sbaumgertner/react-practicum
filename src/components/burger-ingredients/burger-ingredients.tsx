import styles from './burger-ingredients.module.css'
import { IngredientModel, IngredientGroupModel, GroupedIngredientsModel } from '../../model'
import IngredientsGroup from './ingredients-group/ingredients-group'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react';

type BurgerIngredientProps = {
    ingredients: IngredientModel[]
}

const tabs: IngredientGroupModel[] = [
    {type: 'bun', name: 'Булки'},
    {type: 'main', name: 'Начинки'},
    {type: 'sauce', name: 'Соусы'}
]

function groupIngredients(ingredients: IngredientModel[]): GroupedIngredientsModel[] {
    return ingredients.reduce(
        (groups: GroupedIngredientsModel[], ingredient) => {
            const group = groups.find((group) => group.type === ingredient.type)
            if (group) {
                group.ingredients.push(ingredient)
            } else {
                const groupName: string = tabs.find(tab => tab.type === ingredient.type)?.name || ''
                groups.push({type: ingredient.type, name: groupName, ingredients: [ingredient]})
            }
            return groups
        },
        []
    )
}

function BurgerIngredients({ingredients}: BurgerIngredientProps) {

    const [groups, setGroups] = useState<GroupedIngredientsModel[]>([])
    const [tab, setTab] = useState(tabs[0].type)

    useEffect(() => {
        setGroups(groupIngredients([...ingredients]))
    }, [ingredients])

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h1>Соберите бургер</h1>
                <nav className={styles.nav}>
                    {groups.map((group) => (
                        <Tab key={group.type} value={group.type} active={group.type === tab} onClick={setTab}>
                            {group.name}
                        </Tab>
                    ))}
                </nav>
            </header>
            <ul className={styles.groups}>
                {groups.map((group) => (
                    <li key={group.type}>
                        <IngredientsGroup type={group.name} ingredients={group.ingredients} />
                    </li>
                ))}  
            </ul>
        </section>
    )
}

export default BurgerIngredients
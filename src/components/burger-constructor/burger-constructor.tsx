import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { BurgerRecipeModel } from '../../model'

type BurgerConstructorProps = {
    recipe: BurgerRecipeModel
}

function BurgerConstructor({recipe}: BurgerConstructorProps) {

    function getPrice(): number {
        return recipe.stuff.reduce((sum, ingredient) => sum += ingredient.price, 0)
         + (recipe.wrap?.price || 0) * 2
    }

    return (
        <section className={styles.section}>
            {recipe.wrap && (<ConstructorElement
                type="top"
                isLocked={true}
                text={recipe.wrap.name}
                price={recipe.wrap.price}
                thumbnail={recipe.wrap.image}
                extraClass="ml-8 mb-4"
            />)}
            <ul className={styles.stufflist}>
                {
                    recipe.stuff.map((ingredient, i) => (
                        <li key={i} className={styles.stuffitem}>
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
                text={recipe.wrap.name}
                price={recipe.wrap.price}
                thumbnail={recipe.wrap.image}
                extraClass="ml-8 mt-4"
            />)}
            <div className={styles.order}>
                <span className={styles.price}>
                    {getPrice()}
                    <CurrencyIcon className="largeicon" type="primary" />
                </span>
                <Button htmlType="button" size="large">Оформить заказ</Button>
            </div>
        </section>
    )
}

export default BurgerConstructor
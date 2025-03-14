import styles from './not-found.module.css';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className={styles.Wrap}>
      <h1 className="text_type_digits-large">404</h1>
      <h1>Page not found</h1>
      <Link className="link" to="/">Вернуться на главную</Link> 
    </div>
  );
}
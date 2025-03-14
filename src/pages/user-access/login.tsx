import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './user-access.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserError, getUserLoading, resetError } from '../../services/user/reducer';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../main';
import { login } from '../../services/user/actions';
import Loader from 'react-ts-loaders';

export function LoginPage() {
  const loading = useSelector(getUserLoading);
  const error = useSelector(getUserError);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData));
  }

  if (loading) {
    return (<div className="loader"><Loader /></div>);
  }

  return (
    <div className={styles.Wrap}>
      {error && (<p>Произошла ошибка ({error}).</p>)}
      <form className={styles.Form} onSubmit={submit}>
        <h2>Вход</h2>
        <EmailInput name="email" value={formData.email} onChange={changeFormData} />
        <PasswordInput name="password" value={formData.password} onChange={changeFormData} />
        <Button htmlType="submit">Войти</Button>
      </form>
      <div className={styles.Links}>
        <div className={styles.LinkDescription}>
          <span>Вы — новый пользователь?</span>
          <Link className="link" to="/register">Зарегистрироваться</Link>
        </div>
        <div className={styles.LinkDescription}>
          <span>Забыли пароль?</span>
          <Link className="link" to="/forgot-password">Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
}
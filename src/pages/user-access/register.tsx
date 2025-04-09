import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './user-access.module.css';
import { useDispatch, useSelector } from '../../services/store';
import { getUserError, getUserLoading, resetError } from '../../services/user/reducer';
import Loader from 'react-ts-loaders';
import { register } from '../../services/user/actions';
import { useEffect, useState } from 'react';

export function RegisterPage() {
  const loading = useSelector(getUserLoading);
  const error = useSelector(getUserError);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(formData));
  }

  if (loading) {
    return (<div className="loader"><Loader /></div>);
  }

  return (
    <div className={styles.Wrap}>
      {error && (<p>Произошла ошибка ({error}).</p>)}
      <form className={styles.Form} onSubmit={submit}>
        <h2>Регистрация</h2>
        <Input name="name" type="text" placeholder="Имя" value={formData.name} onChange={changeFormData}></Input>
        <EmailInput name="email" value={formData.email} onChange={changeFormData} />
        <PasswordInput name="password" value={formData.password} onChange={changeFormData} />
        <Button htmlType="submit">Зарегистрироваться</Button>
      </form>
      <div className={styles.Links}>
        <div className={styles.LinkDescription}>
          <span>Уже зарегистрированы?</span>
          <Link className="link" to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}
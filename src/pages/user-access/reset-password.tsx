import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import styles from './user-access.module.css';
import { useState } from 'react';
import Loader from 'react-ts-loaders';
import { api } from '../../utils/burger-api';

type ResetPasswordResponse = {
  success: boolean;
  message: string;
}

export function ResetPasswordPage() {
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!location.state?.fromForgotPassword) {
    return (<Navigate to='/forgot-password' />);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    api.passwordResetSave({password, token}).then((res: ResetPasswordResponse) => {
      setLoading(false);
      if (res.success) {
        setError(null);
        setSuccess(true);
      }
      else {
        setError(res?.message || 'Неизвестная ошибка');
      }
    }).catch((message) => {
      setLoading(false);
      setError(message);
    })
  }

  if (loading) {
    return (<section className="loader"><Loader /></section>);
  }

  if (success) {
    return (<p className={styles.Success}>Пароль успешно обновлен. <Link to='/login'>Войти</Link></p>);
  }

  return (
    <div className={styles.Wrap}>
      {error && (<p>Произошла ошибка ({error}).</p>)}
      <form className={styles.Form} onSubmit={onSubmit}>
        <h2>Восстановление пароля</h2>
        <PasswordInput placeholder='Введите новый пароль' value={password} onChange={onPasswordChange} />
        <Input type="text" placeholder="Введите код из письма" value={token} onChange={onTokenChange}></Input>
        <Button htmlType="submit">Сохранить</Button>
      </form>
      <div className={styles.Links}>
        <div className={styles.LinkDescription}>
          <span>Вспомнили пароль?</span>
          <Link className="link" to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}
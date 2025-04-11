import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './user-access.module.css';
import { useState } from 'react';
import { api } from '../../utils/burger-api';
import Loader from 'react-ts-loaders';
import { TNoticeResponse } from '../../utils/api-types';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    api.passwordResetRequest(email).then((res: TNoticeResponse) => {
      setLoading(false);
      if (res.success) {
        navigate('/reset-password', { state: { fromForgotPassword: true } });
      }
      else {
        setError(true);
      }
    }).catch(() => {
      setLoading(false);
      setError(true);
    })
  }

  if (loading) {
    return (<section className="loader"><Loader /></section>);
  }

  return (
    <div className={styles.Wrap}>
      {error && (<p>Произошла ошибка. Попробуйте позже.</p>)}
      <form className={styles.Form} onSubmit={onSubmit}>
        <h2>Восстановление пароля</h2>
        <EmailInput placeholder="Укажите e-mail" value={email} onChange={onChange} />
        <Button htmlType="submit">Восстановить</Button>
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
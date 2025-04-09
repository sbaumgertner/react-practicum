import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUser, getUserError, getUserLoading } from '../../services/user/reducer';
import Loader from 'react-ts-loaders';
import { updateUser } from '../../services/user/actions';

export function AccountPage() {
  const loading = useSelector(getUserLoading);
  const error = useSelector(getUserError);
  const user = useSelector(getUser);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    password: ''
  });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
      password: ''
    })
  }, [user]);

  const dispatch = useDispatch();

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsChanged(true);
  }

  const submit = () => {
    dispatch(updateUser(formData));
    setIsChanged(false);
  }

  const cancel = () => {
    setFormData({
      name: user?.name,
      email: user?.email,
      password: ''
    });
    setIsChanged(false);
  }

  if (loading) {
    return (<div className="loader"><Loader /></div>);
  }

  return (
    <form className={styles.Inputs} onSubmit={submit}>
      {error && (<p>Произошла ошибка ({error}). Попробуйте позже.</p>)}
      <Input type="text" name="name" placeholder="Имя" icon="EditIcon" value={formData.name || ''} onChange={changeFormData}></Input>
      <EmailInput name="email" placeholder="Логин" isIcon={true} value={formData.email || ''} onChange={changeFormData} />
      <PasswordInput name="password" icon="EditIcon" value={formData.password} onChange={changeFormData} />
      {isChanged && (<div className={styles.Buttons}>
        <Button htmlType="submit" onClick={submit}>Сохранить</Button>
        <Button htmlType="button" onClick={cancel}>Отмена</Button>
      </div>)}
    </form>
  );
}
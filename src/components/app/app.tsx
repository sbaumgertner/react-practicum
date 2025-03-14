
import AppHeader from '../app-header/app-header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MainPage } from '../../pages/main/main';
import { LoginPage } from '../../pages/user-access/login';
import { RegisterPage } from '../../pages/user-access/register';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { ForgotPasswordPage } from '../../pages/user-access/forgot-password';
import { ResetPasswordPage } from '../../pages/user-access/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/user/actions';
import { AppDispatch } from '../../main';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { IngredientPage } from '../../pages/ingredient/ingredient';
import { IngredientModal } from '../../pages/ingredient/ingredient-modal';
import { AccountPage } from '../../pages/profile/account';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const state = location.state as {backgroundLocation?: Location};

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);
    
  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/ingredients/:id" element={<IngredientModal />} />
          </Routes>
        )}
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
            <Route index element={<OnlyAuth component={<AccountPage />} />} />
            <Route path="account" element={<OnlyAuth component={<AccountPage />} />} />
            <Route path="orders" element={<OnlyAuth component={<div></div>} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </DndProvider>
    </>
  );
}

export default App;
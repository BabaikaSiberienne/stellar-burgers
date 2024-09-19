import {
  ConstructorPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../../components/protectedRoute/protectedRoute';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../slices/ingredientsSlice';
import { getUser } from '../slices/userAuthSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  const location = useLocation();
  const backLocation = location.state?.background;
  const nav = useNavigate();
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='feed/' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route element={<ProtectedRoute authorized={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute authorized />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='orders/:number' element={<OrderInfo />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='OrderInfo'
                onClose={() => {
                  nav(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='IngredientDetails'
                onClose={() => {
                  nav(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route element={<ProtectedRoute authorized />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title='OrderInfo'
                  onClose={() => {
                    nav('/profile/orders');
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;

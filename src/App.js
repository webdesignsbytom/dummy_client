import { Route, Routes } from 'react-router-dom';
// Pages
import HomePage from './pages/home/HomePage';
import LoginPage from './users/login/LoginPage';
import RegisterPage from './users/register/RegisterPage';
import Error404 from './pages/error/Error404';
// Constants
import {
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from './utils/Constants';

function App() {
  return (
    <Routes>
      <Route path={HOME_PAGE_URL} index element={<HomePage />} />
      <Route path={LOGIN_PAGE_URL} element={<LoginPage />} />
      <Route path={SIGN_UP_PAGE_URL} element={<RegisterPage />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
// Pages
import AdminPage from './pages/admin/AdminPage';
import ContactPage from './pages/contact/ContactPage';
import Error404 from './pages/error/Error404';
import ForgettenPasswordPage from './pages/user/ForgettenPasswordPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './users/login/LoginPage';
import RegisterPage from './users/register/RegisterPage';
import TermAndPoliciesPage from './pages/policies/TermAndPoliciesPage';
// Constants
import {
  ADMIN_PAGE_URL,
  CONTACT_PAGE_URL,
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  POLICIES_PAGE_URL,
  RESET_PASS_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from './utils/Constants';
// Components
import CookieConsentModal from './components/modals/CookieConsentModal';
// Utils
import { AuthenticateAdmin } from './utils/AuthenticateUser';

function App() {
  return (
    <>
      <CookieConsentModal />

      <Routes>
        {/* Main page routes */}
        <Route path={HOME_PAGE_URL} index element={<HomePage />} />
        <Route path={CONTACT_PAGE_URL} element={<ContactPage />} />
        <Route path={POLICIES_PAGE_URL} element={<TermAndPoliciesPage />} />

        {/* User routes */}
        <Route path={LOGIN_PAGE_URL} element={<LoginPage />} />
        <Route path={SIGN_UP_PAGE_URL} element={<RegisterPage />} />
        <Route path={RESET_PASS_PAGE_URL} element={<ForgettenPasswordPage />} />

        {/* Secured routes */}
        <Route
          path={ADMIN_PAGE_URL}
          element={
            <AuthenticateAdmin>
              <AdminPage />
            </AuthenticateAdmin>
          }
        />

        {/* Error routes */}
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;

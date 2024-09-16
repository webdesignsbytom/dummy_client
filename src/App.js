import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
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

// Normal import for HomePage (no lazy loading)
import HomePage from './pages/home/HomePage';

// Lazy-loaded Pages
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const Error404 = lazy(() => import('./pages/error/Error404'));
const ForgettenPasswordPage = lazy(() => import('./pages/user/ForgettenPasswordPage'));
const LoginPage = lazy(() => import('./users/login/LoginPage'));
const RegisterPage = lazy(() => import('./users/register/RegisterPage'));
const TermAndPoliciesPage = lazy(() => import('./pages/policies/TermAndPoliciesPage'));

function App() {
  return (
    <>
      <CookieConsentModal />

      {/* Suspense component wraps the lazy-loaded components */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Main page routes */}
          <Route path={HOME_PAGE_URL} index element={<HomePage />} /> {/* Eager loaded */}
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
      </Suspense>
    </>
  );
}

export default App;
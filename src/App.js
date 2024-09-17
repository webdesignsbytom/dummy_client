import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// Constants
import {
  ADMIN_PAGE_URL,
  CONTACT_PAGE_URL,
  COOKIE_TIMER,
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  MAINTENANCE_PAGE_URL,
  POLICIES_PAGE_URL,
  RESET_PASS_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from './utils/Constants';
// Utils
import { AuthenticateAdmin } from './utils/AuthenticateUser';
// Context
import { useUser } from './context/UserContext';
// Normal import for HomePage (no lazy loading)
import HomePage from './pages/home/HomePage';
// Lazy-loaded Pages
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const MaintenancePage = lazy(() => import('./pages/maintenance/MaintenancePage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const Error404 = lazy(() => import('./pages/error/Error404'));
const ForgettenPasswordPage = lazy(() =>
  import('./pages/user/ForgettenPasswordPage')
);
const LoginPage = lazy(() => import('./users/login/LoginPage'));
const RegisterPage = lazy(() => import('./users/register/RegisterPage'));
const TermAndPoliciesPage = lazy(() =>
  import('./pages/policies/TermAndPoliciesPage')
);

// Components
const CookieConsentModal = lazy(() =>
  import('./components/modals/CookieConsentModal')
);

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const { hasAgreedToCookies } = useUser();

  useEffect(() => {
    if (hasAgreedToCookies) {
      setIsVisible(false); // Trigger a re-render by updating state
    }

    const timer = setTimeout(() => {
      if (!hasAgreedToCookies) {
        setIsVisible(true); // Trigger a re-render by updating state
      }
    }, COOKIE_TIMER);

    return () => clearTimeout(timer); // Clean up the timer when component unmounts
  }, [hasAgreedToCookies]); // Run only when `hasAgreedToCookies` changes

  return (
    <>
      {isVisible && (
        <Suspense>
          <CookieConsentModal />
        </Suspense>
      )}

      {/* Suspense component wraps the lazy-loaded components */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Main page routes */}
          <Route path={HOME_PAGE_URL} index element={<HomePage />} />

          {/* Eager loaded */}
          <Route path={CONTACT_PAGE_URL} element={<ContactPage />} />
          <Route path={POLICIES_PAGE_URL} element={<TermAndPoliciesPage />} />

          {/* User routes */}
          <Route path={LOGIN_PAGE_URL} element={<LoginPage />} />
          <Route path={SIGN_UP_PAGE_URL} element={<RegisterPage />} />
          <Route
            path={RESET_PASS_PAGE_URL}
            element={<ForgettenPasswordPage />}
          />

          {/* Other */}
          <Route path={MAINTENANCE_PAGE_URL} element={<MaintenancePage />} />

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

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// Components
import LoadingScreen from './components/utils/LoadingScreen';
// Utils
import { AuthenticateAdmin } from './utils/user/AuthenticateUser';
import LoginAuth from './utils/user/LoginAuth';
// Constants
import {
  ADMIN_PAGE_URL,
  CONTACT_PAGE_URL,
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  MAINTENANCE_PAGE_URL,
  POLICIES_PAGE_URL,
  RESET_PASS_PAGE_URL,
  BLOG_PAGE_URL,
  SIGN_UP_PAGE_URL,
  BLOG_POST_PAGE_URL,
  CREATE_BLOG_POST_PAGE_URL,
  EDIT_BLOG_POST_PAGE_URL,
  BOOKING_PAGE_URL,
  BOOKING_ADMIN_PAGE_URL,
  ADMIN_CONTACT_FORM_PAGE_URL,
  VERIFY_EMAIL_PAGE_URL,
  REVIEWS_PAGE_URL,
  ADMIN_CALLBACK_FORM_PAGE_URL,
} from './utils/Routes';
import { COOKIE_TIMER, CookiePolicyName } from './utils/Constants';
// Pages
// Public
import HomePage from './pages/home/HomePage';
import HomePageSideNav from './pages/home/HomePageSideNav';
import ContactPage from './pages/contact/ContactPage';
// Blog
import BlogPage from './pages/blog/BlogPage';
import BlogPostPage from './pages/blog/BlogPostPage';
import BlogPostCreationPage from './pages/blog/BlogPostCreationPage';
import BlogPostEditPage from './pages/blog/BlogPostEditPage';
// Booking
import BookingPage from './pages/booking/BookingPage';
import BookingAdminPage from './pages/booking/BookingAdminPage';
// User pages
import RegisterPage from './users/register/RegisterPage';
import LoginPage from './users/login/LoginPage';
import ForgettenPasswordPage from './users/password/ForgettenPasswordPage';
import VerifyEmailPage from './users/verify/VerifyEmailPage';
// Admin
import AdminPage from './pages/admin/AdminPage';
import ContactFormAdminPage from './pages/contact/ContactFormAdminPage';
import CallbackFormAdminPage from './pages/contact/CallbackFormAdminPage';
// Terms and conditions
import TermAndPoliciesPage from './pages/policies/TermAndPoliciesPage';
// Maintainance
import MaintenancePage from './pages/maintenance/MaintenancePage';
// Error
import Error404 from './pages/error/Error404';
import ReviewsPage from './pages/reviews/ReviewsPage';

// Components
const CookieConsentModal = lazy(() =>
  import('./components/modals/CookieConsentModal')
);

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAgreedToCookies, setHasAgreedToCookies] = useState(true);

  useEffect(() => {
    const cookie = localStorage.getItem(CookiePolicyName);

    if (cookie) {
      setHasAgreedToCookies(true);
    } else {
      setHasAgreedToCookies(false);
    }
  }, []);

  useEffect(() => {
    if (hasAgreedToCookies) {
      setIsVisible(false);
    }

    const timer = setTimeout(() => {
      if (!hasAgreedToCookies) {
        setIsVisible(true);
      }
    }, COOKIE_TIMER);

    return () => clearTimeout(timer);
  }, [hasAgreedToCookies]);

  return (
    <>
      {isVisible && (
        <Suspense>
          <CookieConsentModal setHasAgreedToCookies={setHasAgreedToCookies} />
        </Suspense>
      )}

      {/* Suspense component wraps the lazy-loaded components */}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Main page routes */}
          <Route path={HOME_PAGE_URL} index element={<HomePage />} />
          <Route path={REVIEWS_PAGE_URL} index element={<ReviewsPage />} />

          {/* Blog routes */}
          <Route path={BLOG_PAGE_URL} element={<BlogPage />} />
          <Route
            path={`${BLOG_POST_PAGE_URL}/:title`}
            element={<BlogPostPage />}
          />
          <Route
            path={CREATE_BLOG_POST_PAGE_URL}
            element={<BlogPostCreationPage />}
          />
          <Route
            path={EDIT_BLOG_POST_PAGE_URL}
            element={<BlogPostEditPage />}
          />

          {/* Booking routes */}
          <Route path={BOOKING_PAGE_URL} element={<BookingPage />} />
          <Route path={BOOKING_ADMIN_PAGE_URL} element={<BookingAdminPage />} />

          {/* Contact routes */}
          <Route path={CONTACT_PAGE_URL} element={<ContactPage />} />
          {/* Contact admin routes */}
          <Route
            path={`${ADMIN_CONTACT_FORM_PAGE_URL}/:password`}
            element={
              <LoginAuth>
                <ContactFormAdminPage />
              </LoginAuth>
            }
          />
          <Route
            path={ADMIN_CALLBACK_FORM_PAGE_URL}
            element={
              <AuthenticateAdmin>
                <CallbackFormAdminPage />
              </AuthenticateAdmin>
            }
          />

          {/* User routes */}
          <Route path={LOGIN_PAGE_URL} element={<LoginPage />} />
          <Route path={SIGN_UP_PAGE_URL} element={<RegisterPage />} />
          <Route path={VERIFY_EMAIL_PAGE_URL} element={<VerifyEmailPage />} />
          <Route
            path={RESET_PASS_PAGE_URL}
            element={<ForgettenPasswordPage />}
          />

          {/* Terms and conditions */}
          <Route path={POLICIES_PAGE_URL} element={<TermAndPoliciesPage />} />

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

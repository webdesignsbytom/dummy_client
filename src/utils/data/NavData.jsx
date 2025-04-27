import {
  HOME_PAGE_URL,
  ADMIN_PAGE_URL,
  LOGIN_PAGE_URL,
  SIGN_UP_PAGE_URL,
  BOOKING_PAGE_URL,
} from '../Routes';

export const getNavLinkItemsArray = (user) => [
  { path: HOME_PAGE_URL, label: 'Home' },
  { path: BOOKING_PAGE_URL, label: 'Booking' },
  ...(user?.email
    ? user.role === 'ADMIN' || user.role === 'DEVELOPER'
      ? [{ path: ADMIN_PAGE_URL, label: 'Admin' }]
      : []
    : [
        { path: LOGIN_PAGE_URL, label: 'Login' },
        { path: SIGN_UP_PAGE_URL, label: 'Sign Up' },
      ]),
];

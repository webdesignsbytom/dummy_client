import {
  HOME_PAGE_URL,
  ADMIN_PAGE_URL,
  LOGIN_PAGE_URL,
  SIGN_UP_PAGE_URL,
  BOOKING_PAGE_URL,
  BOOKING_ADMIN_PAGE_URL,
  CONTACT_PAGE_URL,
  NEWSLETTER_PAGE_URL,
  NEWSLETTER_ADMIN_PAGE_URL,
  BLOG_PAGE_URL,
  BLOG_ADMIN_PAGE_URL,
} from '../Routes';

export const getNavLinkItemsArray = (user) => [
  { path: HOME_PAGE_URL, label: 'Home' },
  { path: BOOKING_PAGE_URL, label: 'Booking' },
  { path: NEWSLETTER_PAGE_URL, label: 'Newsletter' },
  { path: CONTACT_PAGE_URL, label: 'Contact' },
  { path: BLOG_PAGE_URL, label: 'Blog' },
  ...(user?.email
    ? user.role === 'ADMIN' || user.role === 'DEVELOPER'
      ? [
          { path: ADMIN_PAGE_URL, label: 'Admin' },
          { path: BOOKING_ADMIN_PAGE_URL, label: 'Booking Admin' },
          { path: BLOG_ADMIN_PAGE_URL, label: 'Blog Admin' },
          { path: NEWSLETTER_ADMIN_PAGE_URL, label: 'Newsletter Admin' },
        ]
      : []
    : [
        { path: LOGIN_PAGE_URL, label: 'Login' },
        { path: SIGN_UP_PAGE_URL, label: 'Sign Up' },
      ]),
];

// User API
export const LOGIN_API = '/login';
export const GET_LOGGED_IN_USER_API = '/users/user/get-logged-in-user'; // userId
export const REGISTER_API = '/users/register';
export const RESET_PASSWORD_API = '/users/user/reset-password'; // userId
export const DELETE_ACCOUNT_API = '/users/user/delete-account'; // userId

// Contact forms API
export const SUBMIT_CONTACT_FORM_API = '/contact/submit-form'; // userId
export const GET_ALL_CONTACT_FROMS_API = '/contact/get-all-contact-forms'; 
export const DELETE_CONTACT_FORM_API = '/contact/get-all-contact-forms'; 

// Blog API routes
export const GET_BLOG_POSTS_API = '/blog/get-all-blog-posts';
export const GET_BLOG_POST_BY_TITLE_API = '/blog/get-all-blog-posts';

// Booking routes
export const GET_BOOKING_API = '/bookings/get-all-bookings';
export const GET_BOOKING_ADMIN_API = '/bookings/get-all-bookings-admin';
export const CREATE_NEW_BOOKING_API = '/bookings/create-new-booking';
export const CONFIRM_BOOKING_API = '/bookings/confirm-booking';
export const DENY_BOOKING_API = '/bookings/deny-booking';
export const CANCEL_BOOKING_API = '/bookings/cancel-booking';
export const EDIT_BOOKING_API = '/bookings/edit-booking';
export const DELETE_BOOKING_API = '/bookings/delete-booking';
export const DELETE_ALL_BOOKING_API = '/bookings/delete-all-bookings';


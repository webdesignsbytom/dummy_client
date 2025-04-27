import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// Constants
import { HOME_PAGE_URL } from '../Routes';

// Set your correct password here
const ADMIN_PASSWORD = process.env.REACT_APP_USER_PASSWORD;

function LoginAuth({ children }) {
  const { password } = useParams();
  const navigate = useNavigate();
console.log('aaaa');
  useEffect(() => {
    if (password !== ADMIN_PASSWORD) {
      navigate(HOME_PAGE_URL, { replace: true }); // redirect home
    }
  }, [password, navigate]);

  // While checking, we could return nothing (or a loading spinner if you want)
  if (password !== ADMIN_PASSWORD) return null;

  return children;
}

export default LoginAuth;

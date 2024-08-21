import { jwtDecode } from "jwt-decode";

export default function LoggedInUser() {
  const loadedToken = localStorage.getItem('token');
  console.log('Loaded token >>> LoggedInUser(): ', loadedToken);
  if (loadedToken === null || loadedToken === '') {
    return null;
  }

  const decoded = jwtDecode(loadedToken);
  console.log('Decoded >>> LoggedInUser(): ', decoded);

  return decoded;
}

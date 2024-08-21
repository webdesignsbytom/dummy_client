import { useNavigate } from 'react-router-dom';

const useNavigateToPage = () => {
  const navigate = useNavigate();

  const navigateToPage = (page) => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      navigate(page, { replace: false });
    }, 300);
  };

  return navigateToPage;
};

export default useNavigateToPage;

// const navigateToPage = useNavigateToPage();

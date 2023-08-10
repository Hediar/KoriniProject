import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>NotFound - 잠시 후에 메인 페이지로 이동합니다...</div>
  );
}

export default NotFound;

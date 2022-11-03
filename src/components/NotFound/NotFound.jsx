import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Страница не найдена</h1>
      <Link to='/'>на главную</Link>
    </>
  );
};
export default NotFound;
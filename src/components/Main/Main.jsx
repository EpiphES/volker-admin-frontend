import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Main() {
  return (
    <>
      <Header />
      <main className='main'>
        <Container>
          <Outlet />
        </Container>
      </main>      
      <Footer />
    </>
  );
};
export default Main;
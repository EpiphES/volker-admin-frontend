import { useState } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer.jsx';
import Header from '../Header/Header.jsx';
import Profile from '../Profile/Profile.jsx';

function Layout({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false);

  function handleCloseProfile() {
    setShowProfile(false);
  }
  function handleShowProfile() {
    setShowProfile(true);
  }

  return (
    <>
      <Header onProfileClick={handleShowProfile}/>
      <main style={{ paddingTop: '60px' }}>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <Offcanvas
        show={showProfile}
        onHide={handleCloseProfile}
        scroll={true}
        placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Профиль</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Profile onLogout={onLogout}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Layout;

import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Container, Offcanvas } from 'react-bootstrap';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';

function Layout({onLogout}) {
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
      <main style={{paddingTop: '60px'}}>
        <Container>
          <Outlet />
        </Container>
      </main>      
      <Footer />
      <Offcanvas 
        show={showProfile} 
        onHide={handleCloseProfile} 
        scroll={true} 
        backdrop={false}
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
};
export default Layout;
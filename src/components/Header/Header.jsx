import './Header.css'
import { GiWolfHead } from 'react-icons/gi';

import { Link, NavLink, useLocation } from 'react-router-dom';

import { Container, Navbar, Nav } from "react-bootstrap"

function Header() {
  const location = useLocation();
  return (
    <header>
      <Navbar
        fixed='top'
        variant='dark'
        bg='dark'
        expand='md'
        collapseOnSelect>
        <Container>
          <Navbar.Brand
            as={Link}
            to='/'>
            <GiWolfHead className='header__logo'/>
            {' '}
            VOLKER
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className='m-auto' activeKey={location.pathname}>
              <Nav.Link
                as={NavLink}
                to='/markers'
                eventKey='/markers'>
                Маркеры
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to='/modes'
                eventKey='/modes'>
                Режимы
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to='/stories'
                eventKey='/stories'>
                Сторисы
              </Nav.Link>              
            </Nav>
            <Nav activeKey={location.pathname}>
              <Nav.Link
                as={NavLink}
                to='/profile'
                eventKey='/profile'>
                Профиль
              </Nav.Link>
            </Nav>            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
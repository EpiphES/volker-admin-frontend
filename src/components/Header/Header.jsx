import { Button, Container, Image,Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

import logo from '../../images/logo-dark.png';

function Header({onProfileClick}) {
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
            to='/'
            className='p-0'>
            <Image src={logo} className='header__logo' alt='логотип' style={{height: '43px'}}/>
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
                Истории
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button
            variant='outline-light'
            type='button'
            aria-label='открыть профиль'
            onClick={onProfileClick}
          >Профиль</Button>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
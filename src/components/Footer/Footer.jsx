import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className='mt-auto pt-5 mb-2'>
      <Container className='d-flex'>
        <h6 className='mx-auto'>
          {'Copyright © '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://wellsoft.pro/'>
            Wellsoft
          </a>
          {' '}
          {new Date().getFullYear()}
          {'.'}
        </h6>
      </Container>
    </footer>
  );
}

export default Footer;

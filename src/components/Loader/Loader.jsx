import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div className='my-auto py-3 text-center'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader;
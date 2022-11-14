import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className='d-flex justify-content-center my-3'>
      <Spinner animation='border' role='status' className='mx-auto'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader;
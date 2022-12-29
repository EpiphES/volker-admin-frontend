import { Toast, ToastContainer } from 'react-bootstrap';
import { MdDone, MdError } from 'react-icons/md';

function Message({
  type, title, text, show, setShow,
}) {
  return (
    <ToastContainer position='middle-center' className='position-fixed'>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg={type}>
        <Toast.Header className='d-flex justify-content-between'>
          { type === 'danger' && <MdError className='text-danger' size={25} /> }
          { type === 'success' && <MdDone className='text-success' size={20} /> }
        </Toast.Header>
        <Toast.Body className='text-light'>
          {title}
          <br/>
          {text}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Message;

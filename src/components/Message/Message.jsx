import { MdError, MdDone } from 'react-icons/md';

import { Toast, ToastContainer } from 'react-bootstrap';

function Message({type, text, show, setShow}) {
  
  return (
    <ToastContainer  position='middle-center' className='position-fixed'>
      <Toast 
        onClose={() => setShow(false)} 
        show={show} 
        delay={3000} 
        autohide >
        {
          type === 'error' && 
          <>
            <Toast.Header className='d-flex justify-content-between'>
              <MdError className='text-danger' size={20} />
            </Toast.Header>
            <Toast.Body className=' bg-danger bg-opacity-75 text-light'>
              {text}
            </Toast.Body>
          </>
        }
        {
          type === 'success' && 
          <>
            <Toast.Header className='d-flex justify-content-between'>
              <MdDone className='text-success' size={20} />
            </Toast.Header>
            <Toast.Body className=' bg-success bg-opacity-75 text-light'>
              {text}
            </Toast.Body>
          </>
        }
        
      </Toast>
    </ToastContainer>
  )
}

export default Message;
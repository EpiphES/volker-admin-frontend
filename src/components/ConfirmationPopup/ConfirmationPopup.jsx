import { Button, Modal } from "react-bootstrap";

function ConfirmationPopup({text, show, onClose, onConfirm}) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{text}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-end'>
        <Button
          variant='outline-secondary'
          onClick={onClose}
          aria-label='отмена'
          className='me-3'>
          Отмена
        </Button>
        <Button 
          variant='outline-secondary'
          aria-label='подтвердить удаление'
          onClick={onConfirm}>
          Да
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmationPopup
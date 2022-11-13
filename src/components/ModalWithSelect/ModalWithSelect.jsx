import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function ModalWithSelect({items, show, onClose, onSubmit}) {
  const [selectedItem, setSelectedItem] = useState(null);  
  
  const selectOptions = items.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    );
  })

  function handleChange(e) {
    setSelectedItem({id: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(selectedItem.id);
    setSelectedItem(null);
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Выбор режима</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Select 
            aria-label='выберите режим' 
            onChange={handleChange}>
            <option>Выберите режим</option>
            {selectOptions}
          </Form.Select>
          <Button 
            variant="secondary"
            type='submit' 
            disabled={!selectedItem}
            className='d-block mt-3 ms-auto'
            >
            Добавить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalWithSelect
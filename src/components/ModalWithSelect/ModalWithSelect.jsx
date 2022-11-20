import { useState, useEffect } from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

function ModalWithSelect({items, show, onClose, onSubmit, withSearch, text}) {
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectItems, setSelectItems] = useState([]);
  const selectOptions = selectItems.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    );
  })

  function handleChange(e) {
    setSelectedId(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(selectedId);
    setSelectedId('');
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    if(searchQuery) {
      setSelectItems((prevVal) => {
        return prevVal.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
      });
    } else { 
      setSelectItems(items); 
    }
  }, [searchQuery, items]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className='d-block'>{`Выбор ${text}а`}</Modal.Title>        
      </Modal.Header>
      <Modal.Body>
        { withSearch &&
        <InputGroup className='mb-2'>
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder='ключевое слово'
            aria-label='поиск режима'
            type='text'
            value={searchQuery}
            onChange={handleSearch}
          />
        </InputGroup> }
        <Form onSubmit={handleSubmit}>
          <Form.Select 
            aria-label='выберите режим' 
            onChange={handleChange}
            htmlSize={10}
            defaultValue=''>
            <option disabled value=''>{`Выберите ${text}`}</option>
            {selectOptions}
          </Form.Select>
          <Button 
            variant="secondary"
            type='submit' 
            disabled={!selectedId}
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
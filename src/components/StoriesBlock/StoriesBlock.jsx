import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

import { MdEdit } from 'react-icons/md';

import AddCard from '../AddCard/AddCard';
import StoriesGroup from '../StoriesGroup/StoriesGroup';

function StoriesBlock({item}) {
  const navigate = useNavigate();

  const storiesGroupCards = item.storiesGroups.map(group => {
    return (
      <Col key={group.id}>        
        <StoriesGroup item={group} onClick={handleCardClick} />
      </Col>  
    )
  });

  function handleCardClick(storiesId) {
    navigate(`${storiesId}`);
  }

  function handleAddClick() {
    navigate('create');
  }

  return (
    <Card 
      className='shadow-sm mb-3'
      border='primary'
    >
      <Card.Header
        className='d-flex justify-content-between align-items-center'>
        <Card.Title>{item.title}</Card.Title>
        <Button
          variant='outline-dark'
          className='lh-1'
          type='button'
          aria-label='добавить блок историй'
        >
          <MdEdit size={20} />
        </Button>
      </Card.Header>
      <Card.Body>
        <Row xs={2} sm={3} md={4} lg={5} className='g-2 h-100 mb-3'>
            <Col>
              <AddCard minHeight='150px' onClick={handleAddClick} 
            />
            </Col>
            {storiesGroupCards}      
          </Row>
      </Card.Body>

    </Card>
  )
}

export default StoriesBlock
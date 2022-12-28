import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCurrentStoriesBlock } from '../../store/storySlice';
import AddCard from '../cards/AddCard/AddCard.jsx';
import StoriesGroup from '../StoriesGroup/StoriesGroup.jsx';

function StoriesBlock({ item, onUpdate, onDelete }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCardClick(storiesId) {
    dispatch(setCurrentStoriesBlock({ id: item.id }));
    navigate(`${storiesId}`);
  }

  const storiesGroupCards = item.storiesGroups.map((group) => (
      <Col key={group.id}>
        <StoriesGroup item={group} onClick={handleCardClick} />
      </Col>
  ));

  function handleAddClick() {
    dispatch(setCurrentStoriesBlock({ id: item.id }));
    navigate('create');
  }

  return (
    <Card
      className='shadow-sm mb-3'
      border='primary'
    >
      <Card.Header
        className='d-flex align-items-center'>
        <Card.Title>{item.title}</Card.Title>
        <Button
          variant='outline-dark'
          className='lh-1 ms-auto'
          type='button'
          aria-label='редактировать блок историй'
          onClick={() => onUpdate(item.id)}
        >
          <MdEdit size={20} />
        </Button>
        <Button
          variant='outline-dark'
          className='lh-1 ms-2'
          type='button'
          aria-label='удалить блок историй'
          onClick={() => onDelete(item.id)}
        >
          <MdDelete size={20} />
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
  );
}

export default StoriesBlock;

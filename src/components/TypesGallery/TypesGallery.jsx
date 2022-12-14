import { Col, Row } from 'react-bootstrap';

import AddCard from '../cards/AddCard/AddCard.jsx';
import TypeCard from '../cards/TypeCard/TypeCard.jsx';

function TypesGallery({
  markerTypes, onUpdate, onDelete, onAddClick, place,
}) {
  const typeCards = markerTypes.map((item) => (
      <Col key={item.id}>
        <TypeCard
          item={item}
          onUpdate={onUpdate}
          onDelete={onDelete}
          place={place}
        />
      </Col>
  ));

  return (
    <Row xs={2} sm={3} md={4} lg={5}className='g-2 h-100'>
      {typeCards}
      <Col>
        <AddCard
          minHeight={'120px'}
          onClick={onAddClick}/>
      </Col>
    </Row>
  );
}

export default TypesGallery;

import { Card, Col, Row } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

import FileInputCard from '../FileInputCard/FileInputCard.jsx';

function ImageGallery({ images, onDelete, onAddClick }) {
  const imageCards = images.map((item) => (
      <Col key={item}>
        <Card
          className='shadow-sm w-100 h-100'
          border='success'
          onClick={() => onDelete(item)}
          style={{ cursor: 'pointer' }}
          >
          <MdDelete className='position-absolute top-0 end-0 p-1 text-primary' size={40} />

          <Card.Img src={item} />
        </Card>
      </Col>
  ));

  return (
    <Row xs={2} sm={3} md={4} lg={5}className='g-2 h-100'>
      {imageCards}
      <FileInputCard
        name='marker'
        onChange={onAddClick}
      />
    </Row>
  );
}

export default ImageGallery;

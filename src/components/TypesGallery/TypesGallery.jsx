import { Card, Row, Col } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';

import AddCard from '../AddCard/AddCard';

function TypesGallery({types, onCardClick, onAddClick}) {
  const typeCards = types.map(item => {
    return (
      <Col key={item.id}>        
        <Card 
          className='shadow-sm w-100 h-100' 
          border='success'
          onClick={() => onCardClick(item.id)}
          style={{cursor: 'pointer'}}>
          <MdEdit className='position-absolute bottom-0 end-0 p-1' size={30} />
          <Card.Header style={{backgroundColor: item.colorOnMap}} />
          <Card.Body>          
            <Card.Img src={item.iconOnMap} className='w-50'/>        
            <Card.Text as='h6'>
              <small>{item.title}</small>
            </Card.Text> 
          </Card.Body>       
        </Card>
      </Col>  
    )
  });

  return (
    <section>
      <h6 className='mb-3'>Типы</h6>
      <Row xs={3} sm={4} md={5} lg={6}className='g-2 h-100 mb-3'>
        {typeCards}
        <Col> 
          <AddCard 
            minHeight={'100px'} 
            onClick={onAddClick}/>
        </Col>     
      </Row>
    </section>
  )
}

export default TypesGallery;
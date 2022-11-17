import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import TypeCard from '../TypeCard/TypeCard';
import AddCard from '../AddCard/AddCard';

function TypesGallery({onUpdate, onDelete, onAddClick}) {

  const { currentMode } = useSelector(state => state.mode);

  const typeCards = currentMode.markerTypes.map(item => {
    return (
      <Col key={item.id}>
        <TypeCard 
          item={item} 
          onUpdate={onUpdate}
          onDelete={onDelete}
          />      
      </Col>  
    )
  });    

  return (
    <>     
      <h5 className='mb-3 text-center'>Типы</h5>
      <Row xs={2} sm={3} md={4} lg={5}className='g-2 h-100'>
        {typeCards}
        <Col> 
          <AddCard 
            minHeight={'100px'} 
            onClick={onAddClick}/>
        </Col>     
      </Row>      
    </>
  )
}

export default TypesGallery;
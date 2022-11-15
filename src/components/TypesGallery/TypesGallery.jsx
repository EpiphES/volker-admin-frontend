import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import ItemCard from '../ItemCard/ItemCard';
import AddCard from '../AddCard/AddCard';

function TypesGallery({onCardClick, onAddClick}) {

  const { currentMode } = useSelector(state => state.mode);

  const typeCards = currentMode.markerTypes.map(item => {
    return (
      <Col key={item.id}>
        <ItemCard 
          item={item} 
          onClick={onCardClick}
          type='type' />      
      </Col>  
    )
  });    

  return (
    <>     
      <h5 className='mb-3 text-center'>Типы</h5>
      <Row xs={3} sm={4} md={5} lg={6}className='g-2 h-100 mb-3'>
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
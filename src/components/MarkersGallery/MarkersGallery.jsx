import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Alert } from 'react-bootstrap';

import MarkerCard from '../MarkerCard/MarkerCard';
import Loader from '../Loader/Loader';
import AddCard from '../AddCard/AddCard';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp';

function MarkersGallery() {
  const navigate = useNavigate();
  const { 
    markers, 
    getMarkersStatus,
    getMarkersError, 
  } = useSelector(state => state.marker);
  const {currentCity} = useSelector(state => state.city);
  
  const markerCards = markers.map(item => {
    return (
      <Col key={item.id}>        
        <MarkerCard item={item} onClick={handleCardClick} />
      </Col>  
    )
  });

  function handleCardClick(markerId) {
    navigate(`${markerId}`);
  }

  function handleAddClick() {
    navigate('create');
  }

  return (
    <>
      <section className='mt-3'>
        { getMarkersStatus ==='loading' && <Loader /> }
        { getMarkersStatus ==='resolved' && markers.length === 0 && 
        <Alert variant='primary'>
          В текущем городе еще нет ни одного маркера.
        </Alert> }
        { getMarkersStatus === 'rejected' && 
          <Alert variant='danger'>
            {getMarkersError}
          </Alert> }
        { (getMarkersStatus ==='resolved' || !currentCity) && 
        <Row xs={2} sm={3} md={4} lg={5} className='g-2 h-100 mb-3'>
          <Col>
            <AddCard minHeight='150px' onClick={handleAddClick} type='mode'/>
          </Col>
          {markerCards}        
        </Row> }            
      </section>
      <BtnScrollUp />    
    </>
  )
}

export default MarkersGallery;
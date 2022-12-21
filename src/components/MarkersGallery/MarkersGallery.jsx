import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { Row, Col, Alert, Button } from 'react-bootstrap';

import MarkerCard from '../MarkerCard/MarkerCard';
import Loader from '../Loader/Loader';
import AddCard from '../AddCard/AddCard';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp';
import MarkersFilter from '../MarkersFilter/MarkersFilter';
import { uploadMarkers } from '../../store/markerSlice';

function MarkersGallery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false)
  const { 
    markers,
    page,
    totalPages,
    searchQuery,
    isPublished,
    mode, 
    type, 
    fetchMarkersStatus,
    fetchMarkersError,
    uploadMarkersStatus,
    uploadMarkersError, 
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

  useEffect(() => {
    if(fetching && page <= totalPages) {
      dispatch(uploadMarkers({
        cityId: currentCity.id, 
        page: page, 
        search: searchQuery,
        isPublished,
        mode,
        type,
      }));
      setFetching(false);
    }
  },[fetching, page, totalPages, currentCity, dispatch, searchQuery, isPublished, mode, type])

  return (
    <>
      { currentCity ? 
      (<MarkersFilter />) :
      (<Alert variant='primary'>
        Город не выбран.
      </Alert>) }
      { fetchMarkersStatus ==='resolved' && markers.length === 0 && 
      <Alert variant='primary'>
        Маркеры не найдены.
      </Alert> }
      { (fetchMarkersStatus ==='resolved' || !currentCity) &&
        <section>
          <Row xs={2} sm={3} md={4} lg={5} className='g-2 h-100 mb-3'>
            <Col>
              <AddCard minHeight='150px' onClick={handleAddClick} />
            </Col>
            {markerCards}      
          </Row> 
          
          <BtnScrollUp />
        </section> } 
      { (fetchMarkersStatus === 'loading' || uploadMarkersStatus === 'loading') && <Loader /> }
      { fetchMarkersStatus === 'rejected' && 
        <Alert variant='danger'>
          {fetchMarkersError}
        </Alert> }
      { uploadMarkersStatus === 'rejected' && 
        <Alert variant='danger'>
          {uploadMarkersError}
        </Alert> }
      <Button onClick={() => setFetching(true)}>Еще</Button>        
    </>
  )
}

export default MarkersGallery;
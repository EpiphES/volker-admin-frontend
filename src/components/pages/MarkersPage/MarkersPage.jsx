import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMarkers } from '../../../store/markerSlice';

import MarkersGallery from '../../MarkersGallery/MarkersGallery';
import CreateMarker from '../../CreateMarker/CreateMarker';
import UpdateMarker from '../../UpdateMarker/UpdateMarker';
import Message from '../../Message/Message';

function MarkersPage() {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [fetching, setFetching] = useState(false);
  const {
    searchQuery,
    isPublished,
    mode,
    type, 
    deleteMarkerStatus,  
    deleteMarkerError, 
  } = useSelector(state => state.marker);

  const {currentCity} = useSelector(state => state.city);

  useEffect(() => {
    if(currentCity) {
      setFetching(true);
    }
  }, [currentCity])

  useEffect(() => {
    if(fetching) {
      dispatch(fetchMarkers({
        cityId: currentCity.id, 
        page: 1, 
        search: searchQuery,
        isPublished,
        mode,
        type, 
      }));
      setFetching(false);
    }
  }, [currentCity, dispatch, fetching, isPublished, mode, searchQuery, type]);

  return (
    <>
      <Routes>
        <Route
          index
          element={<MarkersGallery />}
        />
        <Route
          path='create'
          element={<CreateMarker />}
        />
        <Route
          path=':markerId'
          element={<UpdateMarker showDeleteMarkerMessage={setShowMessage}/>}
        />
      </Routes>

      {deleteMarkerStatus === 'rejected' && <Message type='danger' text={`${deleteMarkerError}`} show={showMessage} setShow={setShowMessage} />}

      {deleteMarkerStatus === 'resolved' && <Message type='success' text='Маркер удален!' show={showMessage} setShow={setShowMessage} />}
    </>
  );
};
export default MarkersPage;
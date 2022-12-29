import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { fetchAllMarkers, resetFilters, setFilterActive } from '../../../store/markerSlice';
import CreateMarker from '../../CreateMarker/CreateMarker.jsx';
import MarkersGallery from '../../MarkersGallery/MarkersGallery.jsx';
import Message from '../../Message/Message.jsx';
import UpdateMarker from '../../UpdateMarker/UpdateMarker.jsx';

function MarkersPage() {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const {
    deleteMarkerStatus,
    deleteMarkerError,
  } = useSelector((state) => state.marker);

  const { currentCity } = useSelector((state) => state.city);

  useEffect(() => {
    if (currentCity) {
      dispatch(fetchAllMarkers({
        cityId: currentCity.id,
        page: 1,
        search: '',
      }));
      dispatch(setFilterActive(false));
      dispatch(resetFilters());
    }
  }, [currentCity, dispatch]);

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

      {deleteMarkerStatus === 'rejected' && <Message type='danger' text={deleteMarkerError} show={showMessage} setShow={setShowMessage} />}

      {deleteMarkerStatus === 'resolved' && <Message type='success' text='Маркер удален!' show={showMessage} setShow={setShowMessage} />}
    </>
  );
}

export default MarkersPage;

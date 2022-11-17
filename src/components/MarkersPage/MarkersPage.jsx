import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMarkers } from '../../store/markerSlice';

import MarkersGallery from '../MarkersGallery/MarkersGallery';
import CreateMarker from '../CreateMarker/CreateMarker';
import UpdateMarker from '../UpdateMarker/UpdateMarker';

function MarkersPage() {
  const dispatch = useDispatch();
  const {currentCity} = useSelector(state => state.city);

  useEffect(() => {
    if(currentCity) {
    dispatch(getMarkers(currentCity.id));
    }
  }, [dispatch, currentCity]);

  return (
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
        element={<UpdateMarker />}
      />
    </Routes>
  );
};
export default MarkersPage;
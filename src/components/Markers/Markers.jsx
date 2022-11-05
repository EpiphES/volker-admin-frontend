import { Routes, Route } from 'react-router-dom';

// import NewMarker from '../NewMarker';
// import UpdateMarker from './UpdateMarker';

const Markers = () => {
  return (
    <Routes>
      <Route
        index
        element={<h1>Markers</h1>}
      />
      {/* <Route
        path='create'
        element={<NewMarker />}
      />
      <Route
        path=':id'
        element={<UpdateMarker />}
      /> */}
    </Routes>
  );
};
export default Markers;
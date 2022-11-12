import { Routes, Route } from 'react-router-dom';

import ModesGallery from '../ModesGallery/ModesGallery';
import SingleMode from '../SingleMode/SingleMode';

const ModesPage = () => {
  return (
    <Routes>
      <Route
        index
        element={<ModesGallery />}
      />
      <Route
        path='create'
        element={<SingleMode />}
      />
      <Route
        path=':modeId'
        element={<SingleMode />}
      />
    </Routes>
  );
};
export default ModesPage;
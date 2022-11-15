import { Routes, Route } from 'react-router-dom';

import ModesGallery from '../ModesGallery/ModesGallery';
import UpdateMode from '../UpdateMode/UpdateMode';
import CreateMode from '../CreateMode/CreateMode';

const ModesPage = () => {
  


  return (
    <Routes>
      <Route
        index
        element={<ModesGallery />}
      />
      <Route
        path='create'
        element={<CreateMode />}
      />
      <Route
        path=':modeId'
        element={<UpdateMode />}
      />
    </Routes>
  );
};
export default ModesPage;
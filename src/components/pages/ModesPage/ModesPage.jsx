import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import CreateMode from '../../CreateMode/CreateMode.jsx';
import Message from '../../Message/Message.jsx';
import ModesGallery from '../../ModesGallery/ModesGallery.jsx';
import UpdateMode from '../../UpdateMode/UpdateMode.jsx';

function ModesPage() {
  const [showMessage, setShowMessage] = useState(false);
  const {
    deleteModeStatus,
    deleteModeError,
  } = useSelector((state) => state.mode);

  return (
    <>
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
          element={<UpdateMode showDeleteModeMessage={setShowMessage} />}
        />
      </Routes>

      {deleteModeStatus === 'rejected' && <Message type='danger' text={`${deleteModeError}`} show={showMessage} setShow={setShowMessage} />}

      {deleteModeStatus === 'resolved' && <Message type='success' text='Режим удален!' show={showMessage} setShow={setShowMessage} />}
    </>
  );
}

export default ModesPage;

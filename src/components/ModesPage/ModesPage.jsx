import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ModesGallery from '../ModesGallery/ModesGallery';
import UpdateMode from '../UpdateMode/UpdateMode';
import CreateMode from '../CreateMode/CreateMode';
import Message from '../Message/Message';


function ModesPage() {
  const [showMessage, setShowMessage] = useState(false);
  const { 
    deleteModeStatus, 
    deleteModeError, 
  } = useSelector(state => state.mode); 

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
          element={<UpdateMode showDeleteModeMessage={setShowMessage}/>}
        />
      </Routes>
    
      {deleteModeStatus === 'rejected' && <Message type='danger' text={`${deleteModeError}`} show={showMessage} setShow={setShowMessage} />}

      {deleteModeStatus === 'resolved' && <Message type='success' text='Режим удален!' show={showMessage} setShow={setShowMessage} />}
    </>
  );
};
export default ModesPage;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMarker } from '../../store/markerSlice';

import GoBackButton from '../GoBackButton/GoBackButton';
import MarkerForm from '../MarkerForm/MarkerForm';
import Message from '../Message/Message';

function CreateMarker() {
  const dispatch = useDispatch();
  const [showCreateMarkerMessage, setShowCreateMarkerMessage] = useState(false);

  const {  
    createMarkerStatus, 
    createMarkerError,  
  } = useSelector(state => state.mode);

  function handleCreateMarker() {
    dispatch(createMarker());
  }

  return (
    <>
    <GoBackButton />
    <MarkerForm
      name='create'
      buttonText='Создать маркер'
      onSubmit={handleCreateMarker}
    />

    {createMarkerStatus === 'rejected' && <Message type='danger' text={`${createMarkerError}`} show={showCreateMarkerMessage} setShow={setShowCreateMarkerMessage} />}

    {createMarkerStatus === 'resolved' && <Message type='success' text='Маркер обновлен!' show={showCreateMarkerMessage} setShow={setShowCreateMarkerMessage} />}
  </>
  )
}

export default CreateMarker;
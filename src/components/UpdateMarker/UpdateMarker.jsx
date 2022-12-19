import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

import { getMarkerById, updateMarker, deleteMarker, setCurrentMarker } from '../../store/markerSlice';
import { setCurrentMode } from '../../store/modeSlice';

import GoBackButton from "../GoBackButton/GoBackButton";
import Loader from "../Loader/Loader";
import MarkerForm from '../MarkerForm/MarkerForm';
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import Message from '../Message/Message';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp';

function UpdateMarker({showDeleteMarkerMessage}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { markerId } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateMarkerMessage, setShowUpdateMarkerMessage] = useState(false);

  const { 
    currentMarker, 
    currentMarkerStatus, 
    currentMarkerError, 
    updateMarkerStatus, 
    updateMarkerError, 
  } = useSelector(state => state.marker);
  
  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }

  function handleShowConfirmModal() {
    setShowConfirmModal(true);
  }

  function handleUpdateMarker(values) {
    dispatch(updateMarker({id: +markerId, ...values}));
    setShowUpdateMarkerMessage(true);
  }

  function handleDeleteMarker() {
    dispatch(deleteMarker(markerId));
    handleCloseConfirmModal();
    navigate('/markers');
    showDeleteMarkerMessage(true);
  }

  useEffect(() => {
    dispatch(getMarkerById(markerId));
    return () => {
      dispatch(setCurrentMode(null));
      dispatch(setCurrentMarker(null));
    }    
  }, [dispatch, markerId]);

  return (
    <>
      <GoBackButton />
      { currentMarkerStatus === 'loading' && <Loader />}
      { currentMarkerStatus === 'resolved' &&
      <>
        <MarkerForm
          name='update'
          marker={currentMarker}
          buttonText='Обновить маркер'
          onSubmit={handleUpdateMarker}
        />
        
        <Button
          variant='danger'
          type='button'
          size='lg'
          aria-label='удалить маркер'
          onClick={handleShowConfirmModal}
          className='d-block mx-auto'>
          Удалить маркер
        </Button>

        <GoBackButton />

        <BtnScrollUp />
      </>
      }
      { currentMarkerStatus === 'rejected' && 
      <Alert variant='danger'>
        {currentMarkerError}
      </Alert> }

      <ConfirmationPopup 
        text={`Удалить маркер "${currentMarker?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteMarker}
        onDecline={handleCloseConfirmModal}
      />

      {updateMarkerStatus === 'rejected' && <Message type='danger' text={`${updateMarkerError}`} show={showUpdateMarkerMessage} setShow={setShowUpdateMarkerMessage} />}

      {updateMarkerStatus === 'resolved' && <Message type='success' text='Маркер обновлен!' show={showUpdateMarkerMessage} setShow={setShowUpdateMarkerMessage} />}
    </>
  )
}

export default UpdateMarker;
import { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  deleteMarker,
  getMarkerById,
  setCurrentMarker,
  updateMarker,
} from '../../store/markerSlice';
import { setCurrentMode } from '../../store/modeSlice';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp.jsx';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import MarkerForm from '../forms/MarkerForm/MarkerForm.jsx';
import GoBackButton from '../GoBackButton/GoBackButton.jsx';
import Loader from '../Loader/Loader.jsx';
import Message from '../Message/Message.jsx';

function UpdateMarker({ showDeleteMarkerMessage }) {
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
  } = useSelector((state) => state.marker);

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }
  function handleShowConfirmModal() {
    setShowConfirmModal(true);
  }
  function handleUpdateMarker(values) {
    dispatch(updateMarker({ id: +markerId, ...values }));
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
    };
  }, [dispatch, markerId]);

  return (
    <>
      <GoBackButton />
      { currentMarkerStatus === 'loading' && <Loader />}
      { currentMarkerStatus === 'resolved'
      && currentMarker && <>
        <MarkerForm
          name='update'
          marker={currentMarker}
          buttonText='???????????????? ????????????'
          onSubmit={handleUpdateMarker}
        />

        <Button
          variant='danger'
          type='button'
          size='lg'
          aria-label='?????????????? ????????????'
          onClick={handleShowConfirmModal}
          className='d-block mx-auto'>
          ?????????????? ????????????
        </Button>

        <GoBackButton />

        <BtnScrollUp />
      </>
      }
      { currentMarkerStatus === 'rejected'
      && <Alert variant='danger'>
        {currentMarkerError}
      </Alert> }

      <ConfirmationPopup
        text={`?????????????? ???????????? "${currentMarker?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteMarker}
        onDecline={handleCloseConfirmModal}
      />

      {updateMarkerStatus === 'rejected' && <Message type='danger' text={updateMarkerError} show={showUpdateMarkerMessage} setShow={setShowUpdateMarkerMessage} />}

      {updateMarkerStatus === 'resolved' && <Message type='success' text='???????????? ????????????????!' show={showUpdateMarkerMessage} setShow={setShowUpdateMarkerMessage} />}
    </>
  );
}

export default UpdateMarker;

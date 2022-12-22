import { useEffect, useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  deleteMode,
  getModeById,
  setCurrentMode,
  updateMode,
} from '../../store/modeSlice';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import GoBackButton from '../GoBackButton/GoBackButton.jsx';
import Loader from '../Loader/Loader.jsx';
import Message from '../Message/Message.jsx';
import ModeForm from '../ModeForm/ModeForm.jsx';
import TypesSection from '../TypesSection/TypesSection.jsx';

function UpdateMode({ showDeleteModeMessage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modeId } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModeMessage, setShowUpdateModeMessage] = useState(false);

  const {
    currentMode,
    currentModeStatus,
    currentModeError,
    updateModeStatus,
    updateModeError,
  } = useSelector((state) => state.mode);

  function handleUpdateMode({ iconUrl, ...values }) {
    if (iconUrl) {
      dispatch(updateMode({
        id: modeId,
        title: values.title,
        icon: iconUrl,
        prevIcon: currentMode.icon,
      }));
      setShowUpdateModeMessage(true);
    } else {
      dispatch(updateMode({
        id: modeId,
        title: values.title,
        icon: currentMode.icon,
      }));
      setShowUpdateModeMessage(true);
    }
  }

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }
  function handleShowConfirmModal() {
    setShowConfirmModal(true);
  }
  function handleDeleteMode() {
    if (currentMode.markerTypes.length === 0) {
      dispatch(deleteMode({ id: modeId, prevIcon: currentMode.icon }));
      handleCloseConfirmModal();
      navigate('/modes');
      showDeleteModeMessage(true);
    }
  }

  useEffect(() => {
    dispatch(getModeById(modeId));
    return () => dispatch(setCurrentMode(null));
  }, [dispatch, modeId]);

  return (
    <>
      <GoBackButton />
      { currentModeStatus === 'loading' && <Loader />}
      { currentModeStatus === 'resolved'
      && <>
        <Card
          body
          className='shadow-sm mb-3 mt-2 mx-auto'
          border='primary'
          style={{ maxWidth: '800px' }}>
          <ModeForm
            name='update'
            mode={currentMode}
            buttonText='Обновить режим'
            submitHandler={handleUpdateMode}
          />
        </Card>

        <Card
          body
          className='shadow-sm mb-4 mt-2 mx-auto'
          border='primary'
          style={{ maxWidth: '800px' }}>
          <TypesSection modeId={+modeId}/>
        </Card>

        <Button
          variant='danger'
          type='button'
          size='lg'
          aria-label='удалить режим'
          disabled={currentMode?.markerTypes.length > 0}
          onClick={handleShowConfirmModal}
          className='d-block m-auto'>
          Удалить режим
        </Button>
        { currentMode?.markerTypes.length > 0 && <p className='text-danger text-center'>Чтобы удалить режим, сначала удалите все типы</p> }

        <GoBackButton />
      </> }

      { currentModeStatus === 'rejected'
      && <Alert variant='danger'>
        {currentModeError}
      </Alert> }

      <ConfirmationPopup
        text={`Удалить режим "${currentMode?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteMode}
        onDecline={handleCloseConfirmModal}
      />

      {updateModeStatus === 'rejected' && <Message type='danger' text={`${updateModeError}`} show={showUpdateModeMessage} setShow={setShowUpdateModeMessage} />}

      {updateModeStatus === 'resolved' && <Message type='success' text='Режим обновлен!' show={showUpdateModeMessage} setShow={setShowUpdateModeMessage} />}
    </>
  );
}

export default UpdateMode;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Card, Button } from 'react-bootstrap';

import { getModeById, updateMode, deleteMode, setCurrentMode} from '../../store/modeSlice';

import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';

import GoBackButton from "../GoBackButton/GoBackButton";
import ModeForm from "../ModeForm/ModeForm";
import TypesSection from "../TypesSection/TypesSection";
import Loader from "../Loader/Loader";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import Message from '../Message/Message';

function UpdateMode({showDeleteModeMessage}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {modeId} = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);  
  const [showUpdateModeMessage, setShowUpdateModeMessage] = useState(false);
  const [showUploadFileError, setShowUploadFileError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  const { 
    currentMode, 
    currentModeStatus, 
    currentModeError, 
    updateModeStatus, 
    updateModeError, 
  } = useSelector(state => state.mode); 

  function handleUpdateMode({title, iconFile}) {
    if(iconFile) {
      setUploadFileError(null);
      setFileLoading(true);
      api.uploadFile(iconFile)
      .then((res) => {
        const iconUrl = BASE_URL + res;
        dispatch(updateMode({id: modeId, title, icon: iconUrl, prevIcon: currentMode.icon}));
        setShowUpdateModeMessage(true);
      })
      .catch((err) => {
        setUploadFileError(err);
        setShowUploadFileError(true);
      })
      .finally(() => setFileLoading(false));
    } else {
      dispatch(updateMode({id: modeId, title, icon: currentMode.icon}));
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
    if(currentMode.markerTypes.length === 0) { 
      dispatch(deleteMode({id: modeId, prevIcon: currentMode.icon}));
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
      { currentModeStatus === 'resolved' &&
      <>
        <Card
          body
          className='shadow-sm mb-3 mt-2 mx-auto'
          border='primary'
          style={{maxWidth: '800px'}}>
          <ModeForm 
            name='update'
            mode={currentMode}
            buttonText='Обновить режим'
            onSubmit={handleUpdateMode}
            fileLoading={fileLoading}
          />
        </Card>
 
        <Card
          body 
          className='shadow-sm mb-4 mt-2 mx-auto'
          border='primary'
          style={{maxWidth: '800px'}}> 
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

      { currentModeStatus === 'rejected' && 
      <Alert variant='danger'>
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

      {uploadFileError && <Message type='danger' text={`${uploadFileError}`} show={showUploadFileError} setShow={setShowUploadFileError} />}                
    </>
  )
}

export default UpdateMode;
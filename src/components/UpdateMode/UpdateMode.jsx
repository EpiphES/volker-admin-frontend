import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Card, Button } from 'react-bootstrap';

import { getModeById, updateMode, deleteMode, createType, updateType } from '../../store/modeSlice';

import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';

import GoBackButton from "../GoBackButton/GoBackButton";
import ModeForm from "../ModeForm/ModeForm";
import TypesSection from "../TypesSection/TypesSection";
import Loader from "../Loader/Loader";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import Message from '../Message/Message';

function UpdateMode({showDeleteMessage}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {modeId} = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);  
  const [showUpdateModeMessage, setShowUpdateModeMessage] = useState(false);
  const [showUpdateTypeMessage, setShowUpdateTypeMessage] = useState(false);
  const [showCreateTypeMessage, setShowCreateTypeMessage] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(null);
  const [fileLoading, setFileLoading] = useState(true);

  const { 
    currentMode, 
    currentModeStatus, 
    currentModeError, 
    updateModeStatus, 
    updateModeError,
    createTypeStatus, 
    createTypeError,
    updateTypeStatus, 
    updateTypeError,  
  } = useSelector(state => state.mode); 

  function handleUpdateMode({title, iconFile }) {
    if(iconFile) {
      setFileLoading(true);
      api.uploadFile(iconFile)
      .then((res) => {
        const iconUrl = BASE_URL + res;
        dispatch(updateMode({id: modeId, title, icon: iconUrl, prevIcon: currentMode.icon}));
        setShowUpdateModeMessage(true);
      })
      .catch((err) => console.log(err))
      .finally(setFileLoading(false));
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
  };

  function handleDeleteMode() {
    dispatch(deleteMode({id: modeId, prevIcon: currentMode.icon}));
    handleCloseConfirmModal();
    navigate('/modes');
    showDeleteMessage();
  }
  
  function handleCreateType({title, colorOnMap, iconFile}) {
    if(iconFile) {
      setFileLoading(true);
      api.uploadFile(iconFile)
      .then((res) => {
        const iconUrl = BASE_URL + res;
        dispatch(createType({
          markerModeId: +modeId,
          title,
          colorOnMap,
          iconOnMap: iconUrl,
        }));
        setShowCreateTypeMessage(true)
      })
      .catch((err) => setUploadFileError(err))
      .finally(setFileLoading(false));
    } else {
      dispatch(createType({
        markerModeId: +modeId,
        title,
        colorOnMap,
      }));
      setShowCreateTypeMessage(true);
    }    
    
  }
  
  function handleUpdateType({id, title, iconFile, colorOnMap, prevIcon}) {
    if(iconFile) {
      setFileLoading(true);
      api.uploadFile(iconFile)
      .then((res) => {
        const iconUrl = BASE_URL + res;
        dispatch(updateType({
          id,
          markerModeId: +modeId,
          title,
          colorOnMap,
          iconOnMap: iconUrl,
          prevIcon,
        }));
        setShowUpdateTypeMessage(true);
      })
      .catch((err) => setUploadFileError(err))
      .finally(setFileLoading(false));
    } else {
      dispatch(updateType({
        id,
        markerModeId: +modeId,
        title,
        colorOnMap,
        iconOnMap: prevIcon,
      }));
      setShowUpdateTypeMessage(true);
    }        
  }

  function handleDeleteType() {

  } 

  useEffect(() => {
    dispatch(getModeById(modeId));    
  }, [dispatch, modeId]);  

  return (    
    <>
      <GoBackButton />
      { currentModeStatus === 'loading' && <Loader />}
      { currentModeStatus === 'resolved' &&
      <>
        <Card 
          className='shadow-sm mb-3 mt-2 p-3'
          border='primary'>
          <ModeForm 
            name='update'
            mode={currentMode}
            buttonText='Обновить режим'
            onSubmit={handleUpdateMode}
            fileLoading={fileLoading}
          />
        </Card>

        <Card 
          className='shadow-sm mb-4 mt-2 p-3'
          border='primary'> 
          <TypesSection 
            onUpdateType={handleUpdateType}
            onCreateType={handleCreateType}
            onDeleteType={handleDeleteType}
            fileLoading={fileLoading}
          />
        </Card>

        <Button
          variant='danger'
          type='button'
          size='lg'
          aria-label='удалить режим'
          disabled={currentMode.markerTypes.length > 0}
          onClick={handleShowConfirmModal}
          className='d-block m-auto'>
          Удалить режим
        </Button>
        { currentMode.markerTypes.length > 0 && <p className='text-danger text-center'>Чтобы удалить режим, сначала удалите все типы</p> }
          

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

      {updateModeStatus === 'rejected' && <Message type='error' text={`${updateModeError}`} show={showUpdateModeMessage} setShow={setShowUpdateModeMessage} />}

      {updateModeStatus === 'resolved' && <Message type='success' text='Режим обновлен!' show={showUpdateModeMessage} setShow={setShowUpdateModeMessage} />}

      {updateTypeStatus === 'rejected' && <Message type='error' text={`${updateTypeError}`} show={showUpdateTypeMessage} setShow={setShowUpdateTypeMessage} />}

      {updateTypeStatus === 'resolved' && <Message type='success' text='Тип обновлен!' show={showUpdateTypeMessage} setShow={setShowUpdateTypeMessage} />}

      {createTypeStatus === 'rejected' && <Message type='error' text={`${createTypeError}`} show={showCreateTypeMessage} setShow={setShowCreateTypeMessage} />}

      {createTypeStatus === 'resolved' && <Message type='success' text='Тип создан!' show={showCreateTypeMessage} setShow={setShowCreateTypeMessage} />}                  
    </>
  )
}

export default UpdateMode;
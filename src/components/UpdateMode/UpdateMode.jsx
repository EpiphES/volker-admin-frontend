import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Card, Button } from 'react-bootstrap';

import { getModeById, updateMode, deleteMode } from '../../store/modeSlice';

import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';

import GoBackButton from "../GoBackButton/GoBackButton";
import ModeForm from "../ModeForm/ModeForm";
import TypesSection from "../TypesSection/TypesSection";
import Loader from "../Loader/Loader";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";

function UpdateMode() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {modeId} = useParams();
  const { currentMode, currentModeStatus, currentModeError } = useSelector(state => state.mode);
  const [showConfirmModal, setShowConfirmModal] = useState(false);  

  const { 
    updateModeStatus, 
    updateModeError, 
    createModeStatus, 
    createModeError,
  } = useSelector(state => state.mode);

  
  function handleUpdateMode({title, iconFile }) {
    if(iconFile) {
      api.uploadFile(iconFile)
      .then((res) => {
        const iconUrl = BASE_URL + res;
        dispatch(updateMode({id: modeId, title, icon: iconUrl, prevIcon: currentMode.icon}));
      })
      .catch((err) => console.log(err));
    } else {
      dispatch(updateMode({id: modeId, title, icon: currentMode.icon}));
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
          />
          <Button
          variant='dark'
          type='button'
          aria-label='удалить режим'
          onClick={handleShowConfirmModal}
          className='mt-2 d-block mx-auto'
          >
          Удалить режим
        </Button>
        </Card>

        <Card 
          className='shadow-sm mb-3 mt-2 p-3'
          border='primary'> 
          <TypesSection place='UpdateMode'/>
        </Card>

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
                  
    </>
  )
}

export default UpdateMode;
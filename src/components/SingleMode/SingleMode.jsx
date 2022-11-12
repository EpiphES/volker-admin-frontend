import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

import { getModeById, updateMode, deleteMode } from '../../store/modeSlice';

import * as api from '../../utils/api';

import GoBackButton from "../GoBackButton/GoBackButton";
import ModeForm from "../ModeForm/ModeForm";
import Loader from "../Loader/Loader";

function SingleMode() {
  const dispatch = useDispatch();
  const {modeId} = useParams();
  const { currentMode, currentModeStatus, currentModeError } = useSelector(state => state.mode);
  
  function handleUpdateMode(values) {
    dispatch(updateMode({id: modeId, ...values}));
  }

  useEffect(() => {
    dispatch(getModeById(modeId));    
  }, [dispatch, modeId]);

  return (    
    <>
      <GoBackButton />
      { currentModeStatus === 'loading' && <Loader />}
      { currentModeStatus === 'resolved' && 
      <ModeForm 
        name='create'
        mode={currentMode}
        buttonText='Сохранить'
        onSubmit={handleUpdateMode}
      /> }
      { currentModeStatus === 'rejected' && 
      <Alert variant='danger'>
        {currentModeError}
      </Alert> }      
    </>
  )
}

export default SingleMode;
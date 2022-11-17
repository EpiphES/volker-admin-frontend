import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import { createMode } from '../../store/modeSlice';

import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';

import GoBackButton from '../GoBackButton/GoBackButton';
import ModeForm from '../ModeForm/ModeForm';

function CreateMode() {
  const dispatch = useDispatch();

  const [fileLoading, setFileLoading] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(null);
  const [showCreateModeMessage, setShowCreateModeMessage] = useState(false);
  const [showUploadFileError, setShowUploadFileError] = useState(false);

  const {  
    createModeStatus, 
    createModeError,  
  } = useSelector(state => state.mode);

  function handleCreateMode({title, iconFile}) {
    if(iconFile) {
      setUploadFileError(null);
      setFileLoading(true);
      api.uploadFile(iconFile)
      .then((res) => {
        const iconUrl = BASE_URL + res;
        dispatch(createMode({title, icon: iconUrl}));
        setShowCreateModeMessage(true);
      })
      .catch((err) => {
        setUploadFileError(err);
        setShowUploadFileError(true);
      })
      .finally(() => setFileLoading(false));
    } else {
      dispatch(createMode({title}));
      setShowCreateModeMessage(true);
    }       
  }

  return (
    <>
      <GoBackButton />
      <Card
        body 
        className='shadow-sm mb-3 mt-2 mx-auto'
        style={{maxWidth: '800px'}}
        border='primary'>
        <ModeForm 
          name='create'          
          buttonText='Создать режим'
          onSubmit={handleCreateMode}
          fileLoading={fileLoading}
        >
        </ModeForm>
      </Card>
    </>
  )
}

export default CreateMode
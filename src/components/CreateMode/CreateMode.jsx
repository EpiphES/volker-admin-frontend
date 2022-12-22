import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createMode } from '../../store/modeSlice';
import GoBackButton from '../GoBackButton/GoBackButton.jsx';
import Message from '../Message/Message.jsx';
import ModeForm from '../ModeForm/ModeForm.jsx';

function CreateMode() {
  const dispatch = useDispatch();

  const [showCreateModeMessage, setShowCreateModeMessage] = useState(false);

  const {
    createModeStatus,
    createModeError,
  } = useSelector((state) => state.mode);

  function handleCreateMode({ iconUrl, ...values }) {
    if (iconUrl) {
      dispatch(createMode({
        title: values.title,
        icon: iconUrl,
      }));
      setShowCreateModeMessage(true);
    } else {
      dispatch(createMode({
        title: values.title,
      }));
      setShowCreateModeMessage(true);
    }
  }

  return (
    <>
      <GoBackButton />
      <Card
        body
        className='shadow-sm mb-3 mt-2 mx-auto'
        style={{ maxWidth: '800px' }}
        border='primary'>
        <ModeForm
          name='create'
          buttonText='Создать режим'
          submitHandler={handleCreateMode}
        >
        </ModeForm>
      </Card>

      {createModeStatus === 'rejected' && <Message type='danger' text={`${createModeError}`} show={showCreateModeMessage} setShow={setShowCreateModeMessage} />}

      {createModeStatus === 'resolved' && <Message type='success' text='Режим создан!' show={showCreateModeMessage} setShow={setShowCreateModeMessage} />}

    </>
  );
}

export default CreateMode;

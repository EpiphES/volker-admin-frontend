import { useState } from 'react';

import * as api from '../../utils/api';
import PushForm from '../forms/PushForm/PushForm.jsx';
import Message from '../Message/Message.jsx';

function PushSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState('');

  function handleSendPush(values) {
    setIsLoading(true);
    setError('');
    api.sendPush(values)
      .catch(() => setError('Ошибка!'))
      .finally(() => {
        setShowMessage(true);
        setIsLoading(false);
      });
  }

  console.log(error, showMessage);

  return (
    <>
      <PushForm handleSubmit={handleSendPush} isLoading={isLoading}/>

      { error
        ? <Message type='danger' text={error} show={showMessage} setShow={setShowMessage} />

        : <Message
        type='success' text='Пуш отправлен!' show={showMessage} setShow={setShowMessage} />}
    </>
  );
}

export default PushSection;

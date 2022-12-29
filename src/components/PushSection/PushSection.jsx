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
      .catch((err) => setError(err))
      .finally(() => {
        setShowMessage(true);
        setIsLoading(false);
      });
  }

  return (
    <section>
      <h5 className='mb-3 text-center'> Push-уведомления</h5>

      <PushForm handleSubmit={handleSendPush} isLoading={isLoading}/>

      { error
        ? <Message type='danger' text={error} show={showMessage} setShow={setShowMessage} />

        : <Message
        type='success' text='Пуш отправлен!' show={showMessage} setShow={setShowMessage} />}
    </ section>
  );
}

export default PushSection;

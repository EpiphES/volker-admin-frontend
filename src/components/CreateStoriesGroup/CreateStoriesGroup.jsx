import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createStoriesGroup } from '../../store/storySlice';
import GoBackButton from '../GoBackButton/GoBackButton';
import Message from '../Message/Message';
import StoriesGroupForm from '../StoriesGroupForm/StoriesGroupForm';

function CreateStoriesGroup() {
  const dispatch = useDispatch();

  const [showCreateGroupMessage, setShowCreateGroupMessage] = useState(false);

  const {
    createStoriesGroupStatus,
    createStoriesGroupError,
  } = useSelector(state => state.story);

  function handleCreateGroup({imageUrl, ...values}) {
    if(imageUrl) {
      dispatch(createStoriesGroup({
        image: imageUrl,
        ...values
      }));
      setShowCreateGroupMessage(true);
    } else {
      dispatch(createStoriesGroup({
        values
      }));
      setShowCreateGroupMessage(true);
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
        <StoriesGroupForm
          name='create'
          buttonText='Создать группу'
          submitHandler={handleCreateGroup}
        >
        </StoriesGroupForm>
      </Card>

      {createStoriesGroupStatus === 'rejected' && <Message type='danger' text={`${createStoriesGroupError}`} show={showCreateGroupMessage} setShow={setShowCreateGroupMessage} />}

      {createStoriesGroupStatus === 'resolved' && <Message type='success' text='Группа создана!' show={showCreateGroupMessage} setShow={setShowCreateGroupMessage} />}

    </>
  )
}

export default CreateStoriesGroup;
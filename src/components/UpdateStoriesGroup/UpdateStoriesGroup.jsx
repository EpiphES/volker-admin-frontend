import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Card, Button } from 'react-bootstrap';

import { getStoriesGroupById, setCurrentStoriesGroup, updateStoriesGroup, deleteStoriesGroup } from '../../store/storySlice';

import GoBackButton from "../GoBackButton/GoBackButton";
import Loader from "../Loader/Loader";
import StoriesGroupForm from '../StoriesGroupForm/StoriesGroupForm';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import StoriesSlider from '../StorySlider/StorySlider';

function UpdateStoriesGroup() {
  const dispatch = useDispatch();
  const {storiesId} = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { 
    currentStoriesGroup, 
    currentStoriesGroupStatus, 
    currentStoriesGroupError, 
    updateStoriesGroupStatus, 
    updateStoriesGroupError, 
  } = useSelector(state => state.story);

  function handleUpdateGroup(values) {
    dispatch(updateStoriesGroup({Id: currentStoriesGroup.id, ...values}));
  }

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }
  function handleShowConfirmModal() {
    setShowConfirmModal(true);
  }

  function handleDeleteGroup() {
    dispatch(deleteStoriesGroup(currentStoriesGroup.id))
  }

  useEffect(() => {
    dispatch(getStoriesGroupById(storiesId));
    return () => dispatch(setCurrentStoriesGroup(null));    
  }, [dispatch, storiesId]);

  return (
    <>
      <GoBackButton />
      { currentStoriesGroupStatus === 'loading' && <Loader />}
      { currentStoriesGroupStatus === 'resolved' &&
      <>
        <Card
          body
          className='shadow-sm mb-3 mt-2 mx-auto'
          border='primary'
          style={{maxWidth: '800px'}}>
          <StoriesGroupForm 
            name='update'
            group={currentStoriesGroup}
            buttonText='Обновить группу'
            onSubmit={handleUpdateGroup}
          />
        </Card>
        
        <StoriesSlider />       

        <Button
          variant='danger'
          type='button'
          size='lg'
          aria-label='удалить группу'
          disabled={currentStoriesGroup?.storyItems.length > 0}
          onClick={handleShowConfirmModal}
          className='d-block m-auto mt-3'>
          Удалить группу
        </Button>
        { currentStoriesGroup?.storyItems.length > 0 && <p className='text-danger text-center'>Чтобы удалить группу, сначала удалите все элементы</p> }
          

        <GoBackButton />                
      </> }

      { currentStoriesGroupStatus === 'rejected' && 
      <Alert variant='danger'>
        {currentStoriesGroupError}
      </Alert> }

      <ConfirmationPopup 
        text={`Удалить группу "${currentStoriesGroup?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteGroup}
        onDecline={handleCloseConfirmModal}
      />

      {/* {updateModeStatus === 'rejected' && <Message type='danger' text={`${updateModeError}`} show={showUpdateModeMessage} setShow={setShowUpdateModeMessage} />}

      {updateModeStatus === 'resolved' && <Message type='success' text='Режим обновлен!' show={showUpdateModeMessage} setShow={setShowUpdateModeMessage} />} */}
    </>
  )
}

export default UpdateStoriesGroup;
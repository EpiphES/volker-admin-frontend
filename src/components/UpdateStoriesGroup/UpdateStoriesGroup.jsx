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
import StoriesItemsSection from '../StoriesItemsSection/StoriesItemsSection';
import Message from '../Message/Message';

function UpdateStoriesGroup({showDeleteGroupMessage}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {storiesId} = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateGroupMessage, setShowUpdateGroupMessage] = useState(false);

  const { 
    currentStoriesGroup, 
    currentStoriesGroupStatus, 
    currentStoriesGroupError, 
    updateStoriesGroupStatus, 
    updateStoriesGroupError, 
  } = useSelector(state => state.story);

  function handleUpdateGroup({imageUrl, ...values}) {
    if(imageUrl) {
      dispatch(updateStoriesGroup({
        Id: currentStoriesGroup.id,
        image: imageUrl,
        prevImage: currentStoriesGroup.image,  
        ...values
      }));    
      setShowUpdateGroupMessage(true);
    } else {
      dispatch(updateStoriesGroup({
        Id: currentStoriesGroup.id,  
        image: currentStoriesGroup.image,
        ...values
      }));
      setShowUpdateGroupMessage(true);
    }   
  }

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }
  function handleShowConfirmModal() {
    setShowConfirmModal(true);
  }

  function handleDeleteGroup() {
    if(currentStoriesGroup.storyItems.length === 0)
    dispatch(deleteStoriesGroup({
      id: currentStoriesGroup.id,
      prevImage: currentStoriesGroup.image
    }));
    handleCloseConfirmModal();
    navigate('/stories');
    showDeleteGroupMessage(true);
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
            submitHandler={handleUpdateGroup}
          />
        </Card>

        <Card
          body
          className='shadow-sm mb-3 mt-2 mx-auto'
          border='primary'
          style={{maxWidth: '800px'}}>
          <StoriesItemsSection /> 
        </Card>      

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

      {updateStoriesGroupStatus === 'rejected' && <Message type='danger' text={`${updateStoriesGroupError}`} show={showUpdateGroupMessage} setShow={setShowUpdateGroupMessage} />}

      {updateStoriesGroupStatus === 'resolved' && <Message type='success' text='Группа обновлена!' show={showUpdateGroupMessage} setShow={setShowUpdateGroupMessage} />}
    </>
  )
}

export default UpdateStoriesGroup;
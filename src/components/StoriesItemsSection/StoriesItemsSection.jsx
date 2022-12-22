import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  createStoriesItem,
  deleteStoriesItem,
  setCurrentStoriesItem,
  updateStoriesItem,
} from '../../store/storySlice';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import Message from '../Message/Message.jsx';
import StoriesItemForm from '../StoriesItemForm/StoriesItemForm.jsx';
import StoriesSlider from '../StorySlider/StorySlider.jsx';

function StoriesItemsSection() {
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCreateItemMessage, setShowCreateItemMessage] = useState(false);
  const [showUpdateItemMessage, setShowUpdateItemMessage] = useState(false);
  const [showDeleteItemMessage, setShowDeleteTypeMessage] = useState(false);

  const {
    currentStoriesItem,
    createStoriesItemStatus,
    createStoriesItemError,
    updateStoriesItemStatus,
    updateStoriesItemError,
    deleteStoriesItemStatus,
    deleteStoriesItemError,
  } = useSelector((state) => state.story);

  function handleCloseUpdateModal() {
    setShowUpdateModal(false);
    dispatch(setCurrentStoriesItem(null));
  }
  function handleOpenUpdateModal(item) {
    setShowUpdateModal(true);
    dispatch(setCurrentStoriesItem(item));
  }
  function handleCloseCreateModal() {
    setShowCreateModal(false);
  }
  function handleOpenCreateModal() {
    setShowCreateModal(true);
  }
  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
    dispatch(setCurrentStoriesItem(null));
  }
  function handleShowConfirmModal(item) {
    setShowConfirmModal(true);
    dispatch(setCurrentStoriesItem(item));
  }
  function handleCreateItem({ imageUrl, ...values }) {
    if (imageUrl) {
      dispatch(createStoriesItem({
        image: imageUrl,
        ...values,
      }));
      setShowCreateItemMessage(true);
    } else {
      dispatch(createStoriesItem({ ...values }));
      setShowCreateItemMessage(true);
    }
  }

  function handleUpdateItem({ imageUrl, ...values }) {
    if (imageUrl) {
      dispatch(updateStoriesItem({
        id: currentStoriesItem.id,
        image: imageUrl,
        prevImage: currentStoriesItem.image,
        ...values,
      }));
      setShowUpdateItemMessage(true);
    } else {
      dispatch(updateStoriesItem({
        id: currentStoriesItem.id,
        image: currentStoriesItem.image,
        ...values,
      }));
      setShowUpdateItemMessage(true);
    }
  }

  function handleDeleteItem() {
    dispatch(deleteStoriesItem({
      id: currentStoriesItem.id,
      prevImage: currentStoriesItem.image,
    }));
    dispatch(setCurrentStoriesItem(null));
    handleCloseConfirmModal();
    showDeleteItemMessage(true);
  }

  return (
    <>
      <StoriesSlider
        onEdit={handleOpenUpdateModal}
        onDelete={handleShowConfirmModal}
      />

      <Button
        variant='warning'
        type='button'
        aria-label='создать слайд'
        onClick={handleOpenCreateModal}
        className='d-block m-auto'>
        Создать слайд
      </Button>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton className='py-2 '>
          <Modal.Title as='h5'>Редактировать слайд</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <StoriesItemForm
            name='update'
            storyItem={currentStoriesItem}
            buttonText='Обновить'
            submitHandler={handleUpdateItem}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton className='py-2 '>
          <Modal.Title as='h5'>Создать слайд</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <StoriesItemForm
            name='create'
            buttonText='Создать'
            submitHandler={handleCreateItem}
          />
        </Modal.Body>
      </Modal>

      <ConfirmationPopup
        text={'Удалить слайд?'}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteItem}
        onDecline={handleCloseConfirmModal}
      />

      {createStoriesItemStatus === 'rejected'
      && <Message type='danger' text={`${createStoriesItemError}`} show={showCreateItemMessage} setShow={setShowCreateItemMessage} />}

      {createStoriesItemStatus === 'resolved'
      && <Message type='success' text='Слайд создан!' show={showCreateItemMessage} setShow={setShowCreateItemMessage} />}

      {updateStoriesItemStatus === 'rejected'
      && <Message type='danger' text={`${updateStoriesItemError}`} show={showUpdateItemMessage} setShow={setShowUpdateItemMessage} />}

      {updateStoriesItemStatus === 'resolved'
      && <Message type='success' text='Тип обновлен!' show={showUpdateItemMessage} setShow={setShowUpdateItemMessage} />}

      {deleteStoriesItemStatus === 'rejected'
      && <Message type='danger' text={`${deleteStoriesItemError}`} show={showDeleteItemMessage} setShow={setShowDeleteTypeMessage} />}
    </>
  );
}

export default StoriesItemsSection;

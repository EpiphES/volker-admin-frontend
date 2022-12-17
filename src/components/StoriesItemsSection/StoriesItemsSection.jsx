import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { setCurrentStoriesItem, addStoriesItem, changeStoriesItem, removeStoriesItem } from '../../store/storySlice';

import StoriesSlider from '../StorySlider/StorySlider';
import StoriesItemForm from '../StoriesItemForm/StoriesItemForm';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import Message from '../Message/Message';

function StoriesItemsSection() {
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] =
  useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCreateItemMessage, setShowCreateTypeMessage] = useState(false);
  const [showUpdateItemMessage, setShowUpdateTypeMessage] = useState(false);  
  const [showDeleteItemMessage, setShowDeleteTypeMessage] = useState(false);
  const [showUploadFileError, setShowUploadFileError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  const { 
    currentStoriesGroup,
    currentStoriesItem, 
    createStoriesItemStatus, 
    createStoriesItemError,
    updateStoriesItemStatus, 
    updateStoriesItemError,
    deleteStoriesItemStatus, 
    deleteStoriesItemError,  
  } = useSelector(state => state.story);

  function handleCloseUpdateModal() {
    setShowUpdateModal(false);
    dispatch(setCurrentStoriesItem(null));
  }
  function handleOpenUpdateModal(item) {
    setShowUpdateModal(true);
    dispatch(setCurrentStoriesItem(item));
  };
  function handleCloseCreateModal() {
    setShowCreateModal(false);
  }
  function handleOpenCreateModal() {
    setShowCreateModal(true);
  };

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
    dispatch(setCurrentStoriesItem(null));
  }
  function handleShowConfirmModal(item) {
    setShowConfirmModal(true);
    dispatch(setCurrentStoriesItem(item));
  };

  function handleCreateItem({title, colorOnMap, iconFile}) {
    // if(iconFile) {
    //   setFileLoading(true);
    //   api.uploadFile(iconFile)
    //   .then((res) => {
    //     const iconUrl = BASE_URL + res;
    //     dispatch(createType({
    //       markerModeId: modeId,
    //       title,
    //       colorOnMap,
    //       iconOnMap: iconUrl,
    //     }));
    //     setShowCreateTypeMessage(true)
    //   })
    //   .catch((err) => setUploadFileError(err))
    //   .finally(() => setFileLoading(false));
    // } else {
    //   dispatch(createType({
    //     markerModeId: modeId,
    //     title,
    //     colorOnMap,
    //   }));
    //   setShowCreateTypeMessage(true);
    // }    
  }

  function handleUpdateItem({id, title, iconFile, colorOnMap, prevIcon}) {
    // if(iconFile) {
    //   setFileLoading(true);
    //   api.uploadFile(iconFile)
    //   .then((res) => {
    //     const iconUrl = BASE_URL + res;
    //     dispatch(updateType({
    //       id,
    //       markerModeId: +modeId,
    //       title,
    //       colorOnMap,
    //       iconOnMap: iconUrl,
    //       prevIcon,
    //     }));
    //     setShowUpdateTypeMessage(true);
    //   })
    //   .catch((err) => setUploadFileError(err))
    //   .finally(() => setFileLoading(false));
    // } else {
    //   dispatch(updateType({
    //     id,
    //     markerModeId: +modeId,
    //     title,
    //     colorOnMap,
    //     iconOnMap: prevIcon,
    //   }));
    //   setShowUpdateTypeMessage(true);
    // }        
  }
  
  function handleDeleteItem() {
    // dispatch(deleteType({id: deletedType.id, prevIcon: deletedType.iconOnMap}));
    // handleCloseConfirmModal();  
    // setShowDeleteTypeMessage(true);
  } 

  return (
    <>      
      <StoriesSlider 
        onUpdate={handleOpenUpdateModal}
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
            buttonText='Обновить'
            onSubmit={handleUpdateItem}
            fileLoading={fileLoading}
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
            onSubmit={handleCreateItem}
            fileLoading={fileLoading}
          />
        </Modal.Body>
      </Modal>

      <ConfirmationPopup 
        text={`Удалить слайд?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteItem}
        onDecline={handleCloseConfirmModal}
      />

      {createStoriesItemStatus === 'rejected' && <Message type='danger' text={`${createStoriesItemError}`} show={showCreateItemMessage} setShow={setShowCreateTypeMessage} />}

      {createStoriesItemStatus === 'resolved' && <Message type='success' text='Слайд создан!' show={showCreateItemMessage} setShow={setShowCreateTypeMessage} />}

      {updateStoriesItemStatus === 'rejected' && 
      <Message type='danger' text={`${updateStoriesItemError}`} show={showUpdateItemMessage} setShow={setShowUpdateTypeMessage} />}

      {updateStoriesItemStatus === 'resolved' && 
      <Message type='success' text='Тип обновлен!' show={showUpdateItemMessage} setShow={setShowUpdateTypeMessage} />}

      {deleteStoriesItemStatus === 'rejected' && <Message type='danger' text={`${deleteStoriesItemError}`} show={showDeleteItemMessage} setShow={setShowDeleteTypeMessage} />}

      {uploadFileError && <Message type='danger' text={`${uploadFileError}`} show={showUploadFileError} setShow={setShowUploadFileError} />}
    </>
    
  )
}

export default StoriesItemsSection;
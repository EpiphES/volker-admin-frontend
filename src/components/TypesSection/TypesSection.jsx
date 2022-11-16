import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { createType, updateType, deleteType } from '../../store/modeSlice';

import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';

import TypesGallery from '../TypesGallery/TypesGallery';
import TypeForm from '../TypeForm/TypeForm';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import Message from '../Message/Message';

function TypesSection({modeId}) {
  const dispatch = useDispatch();
  
  const [selectedType, setSelectedType] = useState(null); 
  const [deletedType, setDeletedType] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] =
  useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCreateTypeMessage, setShowCreateTypeMessage] = useState(false);
  const [showUpdateTypeMessage, setShowUpdateTypeMessage] = useState(false);  
  const [showDeleteTypeMessage, setShowDeleteTypeMessage] = useState(false);
  const [showUploadFileError, setShowUploadFileError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  const { 
    currentMode, 
    createTypeStatus, 
    createTypeError,
    updateTypeStatus, 
    updateTypeError,
    deleteTypeStatus, 
    deleteTypeError,  
  } = useSelector(state => state.mode);

  function handleCloseUpdateModal() {
    setShowUpdateModal(false);
    setSelectedType(null);
  }
  function handleOpenUpdateModal(typeId) {
    const type = currentMode.markerTypes.find(item => item.id === typeId);
    setSelectedType(type);
    setShowUpdateModal(true);
  };
  function handleCloseCreateModal() {
    setShowCreateModal(false);
  }
  function handleOpenCreateModal() {
    setShowCreateModal(true);
  };

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }
  function handleShowConfirmModal(id) {
    setShowConfirmModal(true);
    setDeletedType(currentMode.markerTypes.find((item) => item.id === id));
  };

  function handleCreateType({title, colorOnMap, iconFile}) {
    if(iconFile) {
      setFileLoading(true);
      api.uploadFile(iconFile)
      .then((res) => {
        const iconUrl = BASE_URL + res;
        dispatch(createType({
          markerModeId: modeId,
          title,
          colorOnMap,
          iconOnMap: iconUrl,
        }));
        setShowCreateTypeMessage(true)
      })
      .catch((err) => setUploadFileError(err))
      .finally(() => setFileLoading(false));
    } else {
      dispatch(createType({
        markerModeId: modeId,
        title,
        colorOnMap,
      }));
      setShowCreateTypeMessage(true);
    }    
  }

  function handleUpdateType({id, title, iconFile, colorOnMap, prevIcon}) {
    if(iconFile) {
      setFileLoading(true);
      api.uploadFile(iconFile)
      .then((res) => {
        const iconUrl = BASE_URL + res;
        dispatch(updateType({
          id,
          markerModeId: +modeId,
          title,
          colorOnMap,
          iconOnMap: iconUrl,
          prevIcon,
        }));
        setShowUpdateTypeMessage(true);
      })
      .catch((err) => setUploadFileError(err))
      .finally(() => setFileLoading(false));
    } else {
      dispatch(updateType({
        id,
        markerModeId: +modeId,
        title,
        colorOnMap,
        iconOnMap: prevIcon,
      }));
      setShowUpdateTypeMessage(true);
    }        
  }
  
  function handleDeleteType() {
    dispatch(deleteType({id: deletedType.id, prevIcon: deletedType.iconOnMap}));
    setShowConfirmModal(false);
    setShowDeleteTypeMessage(true);
  } 

  return (
    <>
      <section>
        <TypesGallery
          onUpdate={handleOpenUpdateModal}
          onDelete={handleShowConfirmModal}
          onAddClick={handleOpenCreateModal}
        />
      </section>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton className='py-2 '>
          <Modal.Title as='h5'>Тип "{selectedType?.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <TypeForm 
            name='update'
            type={selectedType}
            buttonText='Обновить'
            onSubmit={handleUpdateType}
            fileLoading={fileLoading}
          />        
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton className='py-2 '>
          <Modal.Title as='h5'>Создание типа</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <TypeForm 
            name='create'
            buttonText='Создать'
            onSubmit={handleCreateType}
            fileLoading={fileLoading}
          />
        </Modal.Body>
      </Modal>

      <ConfirmationPopup 
        text={`Удалить "${deletedType?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteType}
        onDecline={handleCloseConfirmModal}
      />

      {createTypeStatus === 'rejected' && <Message type='danger' text={`${createTypeError}`} show={showCreateTypeMessage} setShow={setShowCreateTypeMessage} />}

      {createTypeStatus === 'resolved' && <Message type='success' text='Тип создан!' show={showCreateTypeMessage} setShow={setShowCreateTypeMessage} />}

      {updateTypeStatus === 'rejected' && 
      <Message type='danger' text={`${updateTypeError}`} show={showUpdateTypeMessage} setShow={setShowUpdateTypeMessage} />}

      {
      updateTypeStatus === 'resolved' && 
      <Message type='success' text='Тип обновлен!' show={showUpdateTypeMessage} setShow={setShowUpdateTypeMessage} />}

      {deleteTypeStatus === 'rejected' && <Message type='danger' text={`${deleteTypeError}`} show={showDeleteTypeMessage} setShow={setShowDeleteTypeMessage} />}

      {uploadFileError && <Message type='danger' text={`${uploadFileError}`} show={showUploadFileError} setShow={setShowUploadFileError} />}      
    </>
  )
}

export default TypesSection;
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import TypesGallery from '../TypesGallery/TypesGallery';
import TypeForm from '../TypeForm/TypeForm';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';

function TypesSection({onUpdateType, onCreateType, onDeleteType, fileLoading}) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] =
  useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const { currentMode } = useSelector(state => state.mode);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletedType, setDeletedType] = useState('');

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

  function handleDeleteType() {
    onDeleteType();
    setShowConfirmModal(false);
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
        <Modal.Header closeButton>
          <Modal.Title as='h5'>Тип "{selectedType?.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <TypeForm 
            name='update'
            type={selectedType}
            buttonText='Обновить'
            onSubmit={onUpdateType}
            fileLoading={fileLoading}
          />          
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title as='h5'>Создание типа</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <TypeForm 
            name='create'
            buttonText='Создать'
            onSubmit={onCreateType}
            fileLoading={fileLoading}/>
        </Modal.Body>
      </Modal>

      <ConfirmationPopup 
        text={`Удалить режим "${deletedType?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteType}
        onDecline={handleCloseConfirmModal}
      />
    </>
  )
}

export default TypesSection;
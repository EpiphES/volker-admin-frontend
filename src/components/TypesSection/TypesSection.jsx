import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { createType, updateType } from '../../store/modeSlice';

import TypesGallery from '../TypesGallery/TypesGallery';
import TypeForm from '../TypeForm/TypeForm';

function TypesSection({place}) {
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] =
  useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const { currentMode } = useSelector(state => state.mode);

  function handleCloseUpdateModal() {
    setShowUpdateModal(false);
    setSelectedType(null);
  }
  function handleOpenUpdateModal(typeId) {
    const type = currentMode.markerTypes.find(item => item.id === typeId);
    setSelectedType(type);
    setShowUpdateModal(true);
  };

  function handleUpdateType() {
    
  }

  function handleCloseCreateModal() {
    setShowCreateModal(false);
  }
  function handleOpenCreateModal() {
    setShowCreateModal(true);
  };

  function handleCreateType() {
    dispatch(createType());

  }
  

  return (
    <>
      <section>
        <TypesGallery
          onCardClick={handleOpenUpdateModal}
          onAddClick={handleOpenCreateModal}
        />
      </section>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title as='h5'>Тип '{selectedType?.title}'</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <TypeForm 
            name='update'
            type={selectedType}
            buttonText='Обновить'
            onSubmit={handleUpdateType}/>
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
            onSubmit={handleCreateType}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TypesSection;
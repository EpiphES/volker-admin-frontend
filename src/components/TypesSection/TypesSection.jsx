import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createType, deleteType, updateType } from '../../store/modeSlice';
import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';
import { handleCompressImage } from '../../utils/utils';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import TypeForm from '../forms/TypeForm/TypeForm.jsx';
import Message from '../Message/Message.jsx';
import TypesGallery from '../TypesGallery/TypesGallery.jsx';

function TypesSection({ modeId }) {
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState(null);
  const [deletedType, setDeletedType] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
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
  } = useSelector((state) => state.mode);

  function handleCloseUpdateModal() {
    setShowUpdateModal(false);
    setSelectedType(null);
  }
  function handleOpenUpdateModal(typeId) {
    const type = currentMode.markerTypes.find((item) => item.id === typeId);
    setSelectedType(type);
    setShowUpdateModal(true);
  }
  function handleCloseCreateModal() {
    setShowCreateModal(false);
  }
  function handleOpenCreateModal() {
    setShowCreateModal(true);
  }

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
    setDeletedType('');
  }
  function handleShowConfirmModal(id) {
    setShowConfirmModal(true);
    setDeletedType(currentMode.markerTypes.find((item) => item.id === id));
  }

  function handleCreateType({ title, colorOnMap, iconFile }) {
    if (iconFile) {
      setFileLoading(true);
      handleCompressImage(iconFile)
        .then((res) => api.uploadFile(res))
        .then((res) => {
          const iconUrl = BASE_URL + res;
          dispatch(createType({
            markerModeId: modeId,
            title,
            colorOnMap,
            iconOnMap: iconUrl,
          }));
          setShowCreateTypeMessage(true);
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

  function handleUpdateType({
    id, title, iconFile, colorOnMap, prevIcon,
  }) {
    if (iconFile) {
      setFileLoading(true);
      handleCompressImage(iconFile)
        .then((res) => api.uploadFile(res))
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
    dispatch(deleteType({ id: deletedType.id, prevIcon: deletedType.iconOnMap }));
    handleCloseConfirmModal();
    setShowDeleteTypeMessage(true);
  }

  return (
    <>
      <section>
        <h5 className='mb-3 text-center'>????????</h5>
        <TypesGallery
          markerTypes={currentMode?.markerTypes || []}
          onUpdate={handleOpenUpdateModal}
          onDelete={handleShowConfirmModal}
          onAddClick={handleOpenCreateModal}
          place='mode'
        />
      </section>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton className='py-2 '>
          <Modal.Title as='h5'>?????? &ldquo;{selectedType?.title}&rdquo;</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <TypeForm
            name='update'
            type={selectedType}
            buttonText='????????????????'
            onSubmit={handleUpdateType}
            fileLoading={fileLoading}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton className='py-2 '>
          <Modal.Title as='h5'>???????????????? ????????</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <TypeForm
            name='create'
            buttonText='??????????????'
            onSubmit={handleCreateType}
            fileLoading={fileLoading}
          />
        </Modal.Body>
      </Modal>

      <ConfirmationPopup
        text={`?????????????? "${deletedType?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteType}
        onDecline={handleCloseConfirmModal}
      />

      {createTypeStatus === 'rejected'
      && <Message type='danger' text={createTypeError} show={showCreateTypeMessage} setShow={setShowCreateTypeMessage} />}

      {createTypeStatus === 'resolved'
      && <Message type='success' text='?????? ????????????!' show={showCreateTypeMessage} setShow={setShowCreateTypeMessage} />}

      {updateTypeStatus === 'rejected'
      && <Message type='danger' text={updateTypeError} show={showUpdateTypeMessage} setShow={setShowUpdateTypeMessage} />}

      {updateTypeStatus === 'resolved'
      && <Message type='success' text='?????? ????????????????!' show={showUpdateTypeMessage} setShow={setShowUpdateTypeMessage} />}

      {deleteTypeStatus === 'rejected'
      && <Message type='danger' text={deleteTypeError} show={showDeleteTypeMessage} setShow={setShowDeleteTypeMessage} />}

      {uploadFileError
      && <Message type='danger' text={uploadFileError} show={showUploadFileError} setShow={setShowUploadFileError} />}
    </>
  );
}

export default TypesSection;

import { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import {
  createStoriesBlock, deleteStoriesBlock, setCurrentStoriesBlock, updateStoriesBlock,
} from '../../store/storySlice';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp.jsx';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import StoriesBlockForm from '../forms/StoriesBlockForm/StoriesBlockForm.jsx';
import Loader from '../Loader/Loader.jsx';
import Message from '../Message/Message.jsx';
import StoriesBlock from '../StoriesBlock/StoriesBlock.jsx';

function StoriesGallery() {
  const dispatch = useDispatch();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteBlockMessage, setShowDeleteBlockMessage] = useState(false);

  const {
    storiesBlocks,
    getStoriesBlocksStatus,
    getStoriesBlocksError,
    currentStoriesBlock,
    deleteStoriesBlockStatus,
    deleteStoriesBlockError,
  } = useSelector((state) => state.story);

  const { currentCity } = useSelector((state) => state.city);

  function handleOpenUpdateModal(id) {
    setShowUpdateModal(true);
    dispatch(setCurrentStoriesBlock({ id }));
  }
  function handleShowConfirmModal(id) {
    setShowConfirmModal(true);
    dispatch(setCurrentStoriesBlock({ id }));
  }

  const storiesBlockCards = storiesBlocks.map((item) => (
      <StoriesBlock
        key={item.id}
        item={item}
        onUpdate={handleOpenUpdateModal}
        onDelete={handleShowConfirmModal}
      />
  ));

  function handleCloseUpdateModal() {
    setShowUpdateModal(false);
    dispatch(setCurrentStoriesBlock(null));
  }
  function handleCloseCreateModal() {
    setShowCreateModal(false);
  }
  function handleOpenCreateModal() {
    setShowCreateModal(true);
  }
  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
    dispatch(setCurrentStoriesBlock(null));
  }
  function handleDeleteBlock() {
    dispatch(deleteStoriesBlock(currentStoriesBlock.id));
    handleCloseConfirmModal();
    setShowDeleteBlockMessage(true);
  }
  function handleUpdateBlock(values) {
    dispatch(updateStoriesBlock({ id: currentStoriesBlock.id, ...values }));
  }
  function handleCreateBlock(values) {
    dispatch(createStoriesBlock(values));
  }

  return (
    <>
      { getStoriesBlocksStatus === 'loading' && <Loader /> }
      { !currentCity
      && <Alert variant='primary'>
        ?????????? ???? ????????????.
      </Alert> }
      { getStoriesBlocksStatus === 'resolved' && storiesBlocks.length === 0
      && <Alert variant='primary'>
        ?? ?????????????? ???????????? ?????? ?????? ???? ?????????? ??????????????.
      </Alert> }
      { getStoriesBlocksStatus === 'rejected'
        && <Alert variant='danger'>
          {getStoriesBlocksError}
        </Alert> }
      { (getStoriesBlocksStatus === 'resolved' || !currentCity)
        && <section>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h2>??????????????</h2>
            <Button
              variant='warning'
              className='lh-1'
              type='button'
              aria-label='???????????????? ???????? ??????????????'
              onClick={handleOpenCreateModal}
            >
              <BsPlusCircleDotted size={30} />
            </Button>

          </div>

          {storiesBlockCards}

          <BtnScrollUp />
        </section> }

        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton className='py-2 '>
          <Modal.Title as='h5'>{'?????????????????????????? ????????'}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <StoriesBlockForm
            name='update'
            block={currentStoriesBlock}
            buttonText='????????????????'
            onSubmit={handleUpdateBlock}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton className='py-2 '>
          <Modal.Title as='h5'>?????????????? ?????????? ????????</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <StoriesBlockForm
            name='create'
            buttonText='??????????????'
            onSubmit={handleCreateBlock}
          />
        </Modal.Body>
      </Modal>

      <ConfirmationPopup
        text={`?????????????? ???????? "${currentStoriesBlock?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteBlock}
        onDecline={handleCloseConfirmModal}
      />

      {deleteStoriesBlockStatus === 'rejected' && <Message type='danger' text={deleteStoriesBlockError} show={showDeleteBlockMessage} setShow={setShowDeleteBlockMessage} />}
    </>
  );
}

export default StoriesGallery;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getStoriesBlocks } from '../../../store/storySlice';
import CreateStoriesGroup from '../../CreateStoriesGroup/CreateStoriesGroup.jsx';
import Message from '../../Message/Message.jsx';
import StoriesGallery from '../../StoriesGallery/StoriesGallery.jsx';
import UpdateStoriesGroup from '../../UpdateStoriesGroup/UpdateStoriesGroup.jsx';

function StoriesPage() {
  const dispatch = useDispatch();
  const [showDeleteGroupMessage, setShowDeleteGroupMessage] = useState(false);

  const { currentCity } = useSelector((state) => state.city);
  const {
    deleteStoriesGroupStatus,
    deleteStoriesGroupError,
  } = useSelector((state) => state.story);

  useEffect(() => {
    if (currentCity) {
      dispatch(getStoriesBlocks(currentCity.id));
    }
  }, [dispatch, currentCity]);

  return (
    <>
      <Routes>
        <Route
          index
          element={<StoriesGallery />}
        />
        <Route
          path='create'
          element={<CreateStoriesGroup />}
        />
        <Route
          path=':storiesId'
          element={<UpdateStoriesGroup
          showDeleteGroupMessage={setShowDeleteGroupMessage} />}
        />
      </Routes>

      {deleteStoriesGroupStatus === 'rejected' && <Message type='danger' text={`${deleteStoriesGroupError}`} show={showDeleteGroupMessage} setShow={setShowDeleteGroupMessage} />}

      {deleteStoriesGroupStatus === 'resolved' && <Message type='success' text='Группа удалена!' show={showDeleteGroupMessage} setShow={setShowDeleteGroupMessage} />}
    </>
  );
}

export default StoriesPage;

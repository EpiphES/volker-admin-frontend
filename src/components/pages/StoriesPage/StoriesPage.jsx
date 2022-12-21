import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getStoriesBlocks } from '../../../store/storySlice';

import StoriesGallery from '../../StoriesGallery/StoriesGallery';
import UpdateStoriesGroup from '../../UpdateStoriesGroup/UpdateStoriesGroup';
import CreateStoriesGroup from '../../CreateStoriesGroup/CreateStoriesGroup';
import Message from '../../Message/Message';

function StoriesPage() {
  const dispatch = useDispatch();
  const [showDeleteGroupMessage, setShowDeleteGroupMessage] = useState(false);

  const {currentCity} = useSelector(state => state.city);
  const { 
    deleteStoriesGroupStatus,
    deleteStoriesGroupError, 
  } = useSelector(state => state.story);
  

  useEffect(() => {
    if(currentCity) {
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
};
export default StoriesPage;
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getStoriesBlocks } from '../../store/storySlice';

import StoriesGallery from '../StoriesGallery/StoriesGallery';
import UpdateStoriesGroup from '../UpdateStoriesGroup/UpdateStoriesGroup';
import CreateStoriesGroup from '../CreateStoriesGroup/CreateStoriesGroup';

function StoriesPage() {
  const dispatch = useDispatch();

  const {currentCity} = useSelector(state => state.city);

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
          element={<UpdateStoriesGroup />}
        />
      </Routes>
    </>
  );
};
export default StoriesPage;
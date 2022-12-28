import { useEffect, useState } from 'react';
import {
  Alert, Button, Col, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchAllMarkers,
  fetchFilteredMarkers,
  resetFilters,
  setFilterActive,
  setFilters,
  uploadAllMarkers,
  uploadFilteredMarkers,
} from '../../store/markerSlice';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp.jsx';
import AddCard from '../cards/AddCard/AddCard.jsx';
import MarkerCard from '../cards/MarkerCard/MarkerCard.jsx';
import Loader from '../Loader/Loader.jsx';
import MarkersFilter from '../MarkersFilter/MarkersFilter.jsx';

function MarkersGallery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const {
    markers,
    page,
    totalPages,
    searchQuery,
    isPublished,
    mode,
    type,
    filterActive,
    fetchMarkersStatus,
    fetchMarkersError,
    uploadMarkersStatus,
    uploadMarkersError,
  } = useSelector((state) => state.marker);

  const { currentCity } = useSelector((state) => state.city);

  function handleCardClick(markerId) {
    navigate(`${markerId}`);
  }

  const markerCards = markers.map((item) => (
      <Col key={item.id}>
        <MarkerCard item={item} onClick={handleCardClick} />
      </Col>
  ));

  function handleAddClick() {
    navigate('create');
  }

  function handleFilter(values) {
    dispatch(fetchFilteredMarkers({
      cityId: currentCity.id,
      page: 1,
      search: values.searchQuery,
      isPublished: values.isPublished === 'all' ? null : values.isPublished === 'true',
      mode: values.mode ? values.mode : null,
      type: values.type ? values.type : null,
    }));
    dispatch(setFilters({
      searchQuery,
      isPublished,
      mode,
      type,
    }));
    dispatch(setFilterActive(true));
  }

  function handleResetFilter() {
    dispatch(resetFilters());
    dispatch(fetchAllMarkers({
      cityId: currentCity.id,
      page: 1,
      search: '',
    }));
    dispatch(setFilterActive(false));
  }

  useEffect(() => {
    if (fetching && page <= totalPages) {
      // eslint-disable-next-line no-unused-expressions
      filterActive
        ? dispatch(uploadFilteredMarkers({
          cityId: currentCity.id,
          page,
          search: searchQuery,
          isPublished: isPublished === 'all' ? null : isPublished === 'true',
          mode: mode || null,
          type: type || null,
        }))
        : dispatch(uploadAllMarkers({
          cityId: currentCity.id,
          page,
          search: '',
        }));
    }
    return setFetching(false);
  }, [
    currentCity,
    dispatch,
    fetching,
    filterActive,
    isPublished,
    mode,
    page,
    searchQuery,
    totalPages,
    type,
  ]);

  return (
    <>
      { currentCity
        ? (<MarkersFilter onSubmit={handleFilter} onReset={handleResetFilter}/>)
        : (<Alert variant='primary'>
        Город не выбран.
      </Alert>) }
      { fetchMarkersStatus === 'resolved' && markers.length === 0
      && <Alert variant='primary'>
        Маркеры не найдены.
      </Alert> }

      <section>
        <Row xs={2} sm={3} md={4} lg={5} className='g-2 h-100 mb-3'>
          <Col>
            <AddCard minHeight='150px' onClick={handleAddClick} />
          </Col>
          {markerCards}
        </Row>

        <BtnScrollUp />
      </section>

      { (fetchMarkersStatus === 'loading' || uploadMarkersStatus === 'loading') && <Loader /> }
      { fetchMarkersStatus === 'rejected'
        && <Alert variant='danger'>
          {fetchMarkersError}
        </Alert> }
      { uploadMarkersStatus === 'rejected'
        && <Alert variant='danger'>
          {uploadMarkersError}
        </Alert> }
      { page <= totalPages && <Button
        onClick={() => setFetching(true)}
        className='d-block m-auto'
      >
        Загрузить еще
      </Button> }
    </>
  );
}
export default MarkersGallery;

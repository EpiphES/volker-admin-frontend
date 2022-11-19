import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Alert, Button } from 'react-bootstrap';

import { getModes } from '../../store/modeSlice';

import ModeCard from '../ModeCard/ModeCard';
import Loader from '../Loader/Loader';
import AddCard from '../AddCard/AddCard';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp';

function ModesGallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    modes, 
    getModesStatus,
    getModesError, 
  } = useSelector(state => state.mode); 
  
  const modeCards = modes.map(item => {
    return (
      <Col key={item.id}>        
        <ModeCard item={item} onClick={handleCardClick} />
      </Col>  
    )
  });

  function handleCardClick(modeId) {
    navigate(`${modeId}`);
  }

  function handleAddClick() {
    navigate('create');
  }

  function handleGetModes() {
    dispatch(getModes());
  }

  return (
    <section className='mt-3'>
      { getModesStatus ==='loading' && <Loader /> }
      { getModesStatus ==='resolved' && modes.length === 0 && 
      <Alert variant='primary'>
        Режимы не созданы
      </Alert> }
      { getModesStatus === 'rejected' && 
      <Alert variant='danger'>
        {getModesError}
      </Alert> }
      { getModesStatus ==='resolved' &&
      <>
        <Button
          variant='warning'
          type='button'
          aria-label='обновить'
          onClick={handleGetModes}
          className='mb-3 d-block mx-auto'>
          Обновить
        </Button>

        <Row xs={3} sm={4} md={5} lg={6} className='g-2 h-100'>
          <Col>
            <AddCard minHeight='100px' onClick={handleAddClick}/>
          </Col>
          {modeCards}        
        </Row>

        <BtnScrollUp />
      </>
      }
    </section>
  )
}

export default ModesGallery;
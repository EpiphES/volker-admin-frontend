import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Alert } from 'react-bootstrap';

import ModeCard from '../ModeCard/ModeCard';
import Loader from '../Loader/Loader';
import AddCard from '../AddCard/AddCard';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp';

function ModesGallery() {
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

  return (
    <>
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
      <section>

        <Row xs={3} sm={4} md={5} lg={6} className='g-2 h-100'>
          <Col>
            <AddCard minHeight='100px' onClick={handleAddClick}/>
          </Col>
          {modeCards}        
        </Row>

        <BtnScrollUp />
      </section>
      }
    </>
  )
}

export default ModesGallery;
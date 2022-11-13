import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Alert } from 'react-bootstrap';

import ModeCard from '../ModeCard/ModeCard';
import Loader from '../Loader/Loader';



function ModesGallery() {
  const { modes, getModesStatus, getModesError } = useSelector(state => state.mode);
  const navigate = useNavigate(); 
  
  const modeCards = modes.map(item => {
    return (
      <Col key={item.id}>        
        <ModeCard item={item} onClick={handleClick} edit />
      </Col>  
    )
  })

  function handleClick(modeId) {
    navigate(`${modeId}`);
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

      <Row xs={3} sm={4} md={5} lg={6} className='g-2 h-100 mb-3'>
        {modeCards}
      </Row>
    </section>
  )
}

export default ModesGallery;
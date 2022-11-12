import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import ModeCard from '../ModeCard/ModeCard';



function ModesGallery() {
  const { modes, getModesStatus, getModesError } = useSelector(state => state.mode);
  const navigate = useNavigate(); 
  
  const modeCards = modes.map(item => {
    return (
      <Col key={item.id}>        
        <ModeCard mode={item} onClick={handleClick} edit/>
      </Col>  
    )
  })

  function handleClick(modeId) {
    navigate(`${modeId}`);
  }

  return (
    <section className='mt-3 d-flex flex-column align-items-center'>
      { getModesStatus ==='loading' && 
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> }
      { getModesStatus ==='resolved' && modes.length === 0 && 
      <Alert variant='primary'>
        Режимы не созданы
      </Alert> }
      { getModesStatus === 'rejected' && 
      <Alert variant='danger'>
        {getModesError}
      </Alert> }

      <Row xs={3} sm={4} md={5} lg={6}className='g-2 h-100'>
        {modeCards}
      </Row>
    </section>
  )
}

export default ModesGallery;
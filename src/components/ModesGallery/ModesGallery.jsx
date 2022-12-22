import { Alert, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddCard from '../AddCard/AddCard.jsx';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp.jsx';
import Loader from '../Loader/Loader.jsx';
import ModeCard from '../ModeCard/ModeCard.jsx';

function ModesGallery() {
  const navigate = useNavigate();
  const {
    modes,
    getModesStatus,
    getModesError,
  } = useSelector((state) => state.mode);

  function handleCardClick(modeId) {
    navigate(`${modeId}`);
  }

  const modeCards = modes.map((item) => (
      <Col key={item.id}>
        <ModeCard item={item} onClick={handleCardClick} />
      </Col>
  ));

  function handleAddClick() {
    navigate('create');
  }

  return (
    <>
      { getModesStatus === 'loading' && <Loader /> }
      { getModesStatus === 'resolved' && modes.length === 0
      && <Alert variant='primary'>
        Режимы не созданы
      </Alert> }
      { getModesStatus === 'rejected'
      && <Alert variant='danger'>
        {getModesError}
      </Alert> }
      { getModesStatus === 'resolved'
      && <section>

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
  );
}
export default ModesGallery;

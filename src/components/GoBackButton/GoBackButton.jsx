import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';

function GoBackButton() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <Button variant='light' className='d-flex align-items-center gap-2' onClick={goBack}>
      <BsArrowLeft />
      Назад
    </Button>
  )
}

export default GoBackButton;
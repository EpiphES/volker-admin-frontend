import { useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import { BsArrowUpCircle } from 'react-icons/bs';

function BtnScrollUp() {
  const [visible, setVisible] = useState(false);

  function handleScroll() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  function toggleVisible() {
    window.pageYOffset > 300 ? setVisible(true) : setVisible(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return function () {
      window.removeEventListener('scroll', toggleVisible);
    }
  }, [])

  return (
    <>
    { visible &&
      (<Button
        variant='secondary'
        className='position-fixed end-0 bottom-0 opacity-75 mb-4 me-2'
        type='button'
        aria-label='перейти на верх страницы'
        onClick={handleScroll}
        style={{zIndex: '10'}}>
        <BsArrowUpCircle size={35}/>
      </Button>)
    }
    </>
  )
}

export default BtnScrollUp;
import { Button} from 'react-bootstrap';
import { BsArrowUpCircle } from 'react-icons/bs'

function BtnScrollUp() {
  function handleScroll() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  return (
    <Button             
      variant='secondary'
      className='position-fixed  bottom-0 opacity-75 mb-4 ms-2'
      type='button'
      aria-label='перейти на верх страницы'
      onClick={handleScroll}>
      <BsArrowUpCircle size={35}/>
    </Button>
  )
}

export default BtnScrollUp;
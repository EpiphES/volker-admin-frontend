import { useSelector } from 'react-redux';
import { Button, Carousel, Dropdown } from 'react-bootstrap';

function StoriesSlider({onDelete, onEdit}) {
  const { 
    currentStoriesGroup,  
  } = useSelector(state => state.story);

  const storiesItemCards = currentStoriesGroup?.storyItems.map((item) => {
    return (
      <Carousel.Item key={item.id} >
        <img
          className='d-block m-auto'
          src={item.image}
          alt='слайд истории'
          style={{width: '280px', borderRadius: '0.375rem', overflow: 'hidden'}}
        />
        <div className='position-absolute top-0 mt-3 start-0 end-0 d-flex justify-content-center'>
        <Dropdown >
          <Dropdown.Toggle variant='light' >
            Изменить
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onEdit(item)}>Редактировать</Dropdown.Item>
            <Dropdown.Item onClick={() => onDelete(item)}>Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        
        <Carousel.Caption>
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          {item.buttonName && 
            <Button
            variant='light'
            className='opacity-50 mb-3'
            >
              {item.buttonName}
            </Button>
          }                   
        </Carousel.Caption>        
      </Carousel.Item>
    )
  })

  return (    
    <Carousel 
      interval={null} 
      variant='dark'
      className='mb-3'
      style={{minHeight: '50px'}}>
      {storiesItemCards}
    </Carousel>
  )
}

export default StoriesSlider;
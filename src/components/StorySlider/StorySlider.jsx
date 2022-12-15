import { useSelector } from 'react-redux';
import { Button, Carousel } from 'react-bootstrap';

function StoriesSlider() {
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
          style={{width: '300px', borderRadius: '0.375rem', overflow: 'hidden'}}
        />
        <Carousel.Caption>
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          {item.buttonName && 
            <Button
            variant='light'
            className='opacity-50'
            >
              {item.buttonName}
            </Button>
          }          
        </Carousel.Caption>
      </Carousel.Item>
    )
  })

  return (
    <Carousel interval={null} variant='dark'>
      {storiesItemCards}
    </Carousel>
  )
}

export default StoriesSlider;
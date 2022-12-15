import { useSelector } from 'react-redux';
import { Button, Carousel } from 'react-bootstrap';

function StoriesSlider() {
  const { 
    currentStoriesGroup,  
  } = useSelector(state => state.story);

  const storiesItemCards = currentStoriesGroup?.storyItems.map((item) => {
    return (
      <Carousel.Item>
        <img
          className='d-block m-auto'
          src={item.image}
          alt='слайд истории'
          style={{width: '300px'}}
        />
        <Carousel.Caption>
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          {item.buttonName && 
            <Button
            variant='light'
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
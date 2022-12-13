import { Card } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';

function StoriesGroup({item, onClick}) {
  return (
    <Card 
      className='shadow-sm w-100 h-100'
      border='success'
      onClick={() => onClick(item.id)}
      style={{cursor: 'pointer'}}
      >
      <Card.Img 
        src={item.image}
        style={{minHeight: '150px', objectFit: 'cover'}} 
      />
      <Card.ImgOverlay className='text-end d-flex'>
        <MdEdit className='position-absolute top-0 end-0 p-1 text-dark' size={30} />
        <Card.Title as='h6' className='text-light mt-auto'>
          {item.title}
        </Card.Title>        
      </Card.ImgOverlay>
    </Card>
  )
}

export default StoriesGroup
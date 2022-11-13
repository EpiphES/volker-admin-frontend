import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

function ModeCard({item, onClick, edit}) {
  return (
    <Card      
      className='shadow-sm w-100 h-100 text-center' 
      border='success'
      onClick={() => onClick(item.id)}
      style={{cursor: 'pointer'}}>

      {!edit && <MdDelete className='position-absolute top-0 end-0 p-1' size={30} />}

      <Card.Body className=''>
        <Card.Img src={item.icon} className='w-50' />                
        <Card.Text as='h6' className='mt-2'>
          <small>{item.title}</small>
        </Card.Text>
      </Card.Body>        
    </Card>
  )
}

export default ModeCard
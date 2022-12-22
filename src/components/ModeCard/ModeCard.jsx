import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

function ModeCard({item, onClick, deleteOn}) {
  return (
    <Card
      className='shadow-sm w-100 h-100'
      border='success'
      onClick={() => onClick(item.id)}
      style={{cursor: 'pointer'}}>

      { deleteOn && <MdDelete className='position-absolute top-0 end-0 p-1' size={30} /> }

      <Card.Body className='d-flex flex-column align-items-center gap-2 text-center'>
        <Card.Img src={item.icon} className='w-50' />
        <Card.Text as='h6' className='mt-auto w-100' style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
          <small >{item.title}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
export default ModeCard;
import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

function ModeCard({mode, onClick, edit}) {
  return (
    <Card 
      as='button'
      type='button' 
      className='shadow-sm w-100 h-100 justify-content-between align-items-center gap-2 p-2 overflow-auto' 
      border='success'
      onClick={() => onClick(mode.id)}>
      {!edit && <MdDelete className='position-absolute top-0 end-0 p-1' size={30} />}
      <Card.Img src={mode.icon} className='w-50'/>          
      <Card.Text as='h6'>
        <small>{mode.title}</small>
      </Card.Text>        
    </Card>
  )
}

export default ModeCard
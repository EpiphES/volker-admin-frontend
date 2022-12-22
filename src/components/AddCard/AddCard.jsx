import { Card } from 'react-bootstrap';
import { BsPlusCircleDotted } from 'react-icons/bs';


function AddCard({minHeight, onClick}) {
  return (
    <Card
      className='h-100 w-100 shadow-sm bg-warning'
      onClick={onClick}
      border='success'
      style={{minHeight, cursor: 'pointer'}}>
      <BsPlusCircleDotted size={60} className='m-auto'/>
    </Card>
  )
}

export default AddCard;
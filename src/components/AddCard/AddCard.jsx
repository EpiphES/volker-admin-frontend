import { Card } from 'react-bootstrap';
import { BsPlusCircleDotted } from 'react-icons/bs';


function AddCard({minHeight, onClick}) {
  return (
    <Card
      className='h-100 w-100 shadow-sm' 
      onClick={onClick}
      border='success'
      style={{minHeight, cursor: 'pointer'}}>                
      <BsPlusCircleDotted size={50} className='m-auto'/>                             
    </Card>
  )
}

export default AddCard
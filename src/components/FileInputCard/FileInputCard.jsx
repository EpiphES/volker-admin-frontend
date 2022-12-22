import { Card, Form } from 'react-bootstrap';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';

function FileInputCard({name, onChange, imageLink}) {
  return (
    <Form.Label htmlFor={`${name}-icon`} className='d-block mb-0'>
      <Card
        className='shadow-sm p-2 w-100 h-100'
        border='success'
        style={{cursor:'pointer', minHeight: '120px'}}
        >
        { imageLink &&
        <MdEdit className='position-absolute top-0 end-0 p-1 text-dark' size={30} /> }
        { imageLink ?
          <Card.Img src={imageLink} className='m-auto'/>
          : <BsPlusCircleDotted size={50} className='m-auto'/>
        }
      </Card>
      <Form.Control
        className='visually-hidden'
        type='file'
        name={`${name}-icon`}
        id={`${name}-icon`}
        onChange={onChange}/>
    </Form.Label>
  )
}

export default FileInputCard;
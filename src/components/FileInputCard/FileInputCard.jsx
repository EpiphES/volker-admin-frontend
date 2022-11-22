import { Card, Form } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import { BsPlusCircleDotted } from 'react-icons/bs';

function FileInputCard({name, onChange, imageLink}) {
  return (
    <Form.Label htmlFor={`${name}-icon`} className='d-block mb-0'>
      <Card 
        className='shadow-sm p-2 w-100 h-100'
        border='success'
        style={{cursor:'pointer', minHeight: '120px'}}
        >
        { imageLink &&
        <MdEdit className='position-absolute top-0 end-0 p-1 text-primary' size={30} /> }
        { imageLink ? 
          <Card.Img src={imageLink} />
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
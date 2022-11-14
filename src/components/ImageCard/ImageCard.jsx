import { Card, Form } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import { BsPlusCircleDotted } from 'react-icons/bs';

function ImageCard({name, onChange, imageLink}) {
  return (
    <Form.Label htmlFor={`${name}-icon`}>
      <Card 
        className='shadow-lg p-2' 
        border='success'
        style={{width: '120px', minHeight: '12 0px', cursor: 'pointer'}}
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

export default ImageCard;
import { Form } from 'react-bootstrap';

function FormInput({title, error, ...props}) {
  return (
    <Form.Group className='mb-3'>
      <Form.Label className='h6 mb-3' htmlFor={props.id}>{title}</Form.Label>
      <Form.Control 
        {...props}
      />
      { error &&
        <Form.Control.Feedback type='invalid'>
          {error}
        </Form.Control.Feedback> }
    </Form.Group>
  )
}

export default FormInput;
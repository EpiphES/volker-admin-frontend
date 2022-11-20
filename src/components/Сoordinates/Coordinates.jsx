import { Row, Col, InputGroup, Form} from 'react-bootstrap';
import { LAT_REGEX, LON_REGEX } from '../../utils/constants';

function Coordinates({onChange, latitudeValue, longitudeValue, latitudeError, longitudeError}) {
  return (
    <>
      <h6 className='mb-3'>Координаты</h6>
      <Row className='mb-3'>
        <InputGroup as={Col} hasValidation className='align-items-start'>
          <InputGroup.Text>
            Lat:
          </InputGroup.Text>
          <Form.Control 
            type='text'
            name='latitude' 
            placeholder='Широта'
            required
            pattern={LAT_REGEX}
            onChange={onChange}
            value={latitudeValue}
          />
          <Form.Control.Feedback type='invalid'>
            {latitudeError}
          </Form.Control.Feedback>
        </InputGroup>
        
        <InputGroup as={Col} hasValidation className='align-items-start'>
          <InputGroup.Text>
            Lon:
          </InputGroup.Text>
          <Form.Control 
          type='text'
          name='longitude' 
          placeholder='Долгота'
          required
          pattern={LON_REGEX}
          onChange={onChange}
          value={longitudeValue} 
          />
          <Form.Control.Feedback type='invalid'>
            {longitudeError}
          </Form.Control.Feedback>
        </InputGroup>          
      </Row>
    </>
  )
}

export default Coordinates;
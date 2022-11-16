import { Card, Dropdown } from 'react-bootstrap';

function TypeCard({item, onUpdate, onDelete}) {
  return (
    <Card      
      className='shadow-sm w-100 h-100 ' 
      border='success'>

      <Card.Header style={{backgroundColor: item.colorOnMap}} />

      <Card.Body className='d-flex flex-column align-items-center gap-2 text-center'>
        <Card.Img src={item.iconOnMap} className='w-50' />                
        <Card.Text as='h6' className='mt-auto w-100' style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
          <small >{item.title}</small>
        </Card.Text>        
        <Dropdown>
          <Dropdown.Toggle variant="success">
            Изменить
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onUpdate(item.id)}>Редактировать</Dropdown.Item>
            <Dropdown.Item onClick={() => onDelete(item.id)}>Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> 
      </Card.Body>        
    </Card>
  )
}

export default TypeCard;
import { Card, Dropdown } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

function TypeCard({
  item, onUpdate, onDelete, place,
}) {
  return (
    <Card
      className='shadow-sm w-100 h-100'
      border='success'
      style={place === 'marker' ? { cursor: 'pointer' } : {}}
      onClick={() => {
        if (place === 'marker') {
          return onDelete(item.id);
        }
      }}
    >

      <Card.Header style={{ backgroundColor: item.colorOnMap }} />

      <Card.Body className='d-flex flex-column align-items-center gap-2 text-center'>
        <Card.Img src={item.iconOnMap} className='w-50' />
        <Card.Text as='h6' className='mt-auto w-100' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <small >{item.title}</small>
        </Card.Text>
        { place === 'marker' && <MdDelete className='position-absolute top-0 end-0 p-1' size={40} />}
        { place === 'mode'
        && <Dropdown>
            <Dropdown.Toggle variant="success">
              Изменить
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onUpdate(item.id)}>Редактировать</Dropdown.Item>
              <Dropdown.Item onClick={() => onDelete(item.id)}>Удалить</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> }
      </Card.Body>
    </Card>
  );
}

export default TypeCard;

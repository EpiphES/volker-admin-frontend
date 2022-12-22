import './MarkerCard.css';
import { Card } from 'react-bootstrap';

function MarkerCard({item, onClick}) {
  const markerTypesString = (item.markerTypes || item.markerToTypes).map(i => i.title).join(', ');
  return (
    <Card
      className='shadow-sm w-100 h-100'
      border='success'
      onClick={() => onClick(item.id)}
      style={{cursor: 'pointer'}}>
      <Card.Img
        src={item.images[0]}
        variant='top'
        style={{height: '150px', objectFit: 'contain'}}
      />
      <Card.Body className='p-2'>
        <Card.Text className='mb-1 marker-card__title' >
          <strong>{item.title}</strong>
        </Card.Text>
        <Card.Text style={{fontSize: '12px', lineHeight: 1.2}} className='mb-1 text-secondary' >
          {markerTypesString}
        </Card.Text>
        <Card.Text style={{fontSize: '12px', lineHeight: 1.2, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
          {item.address}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default MarkerCard;
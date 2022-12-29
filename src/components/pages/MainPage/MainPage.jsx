import { Card } from 'react-bootstrap';

import PushSection from '../../PushSection/PushSection.jsx';

function Main() {
  return (
    <Card
        body
        className='shadow-sm mb-3 mt-2 mx-auto'
        border='primary'
        style={{ maxWidth: '800px' }}>
      <PushSection />
    </Card>
  );
}

export default Main;

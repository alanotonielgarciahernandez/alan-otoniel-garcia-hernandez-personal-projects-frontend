// TreePage.jsx
// Lists the files inside a folder.

// Import third-party component.
import { Card, Col, Container, Row } from 'react-bootstrap';

// Import custom component.
import { ListFiles } from '../components';

export const TreePage = () =>
{

  return (
    <Container fluid className='d-flex flex-column'>
      <Card>
        <Card.Header>
          <Row>
            <Col>Name</Col>
            <Col>Last Commit Message</Col>
            <Col className='text-end'>Last Commit Date</Col>
          </Row>
        </Card.Header>
        { /* Files tree. */ }
        <ListFiles className='d-flex' />
      </Card>
    </Container>
  )
}

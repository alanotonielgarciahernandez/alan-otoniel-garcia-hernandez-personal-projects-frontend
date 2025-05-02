// BranchesPage.jsx
// Displays all project branches with its last update and ahead/behind data.

// Import third-party components.
import { Badge, Card, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Import custom components
import { getTime } from '../helpers/getTime';
import { useFetchProject } from '../hooks/useFetchProject';

export const BranchesPage = () =>
{
  // Get route navigator and route parameters.
  const navigate = useNavigate();
  const { proj } = useLoaderData();

  // Get the selected project brances.
  const { project, isLoading } = useFetchProject( `projects ( page: 1 filter: { keyword: "${ proj ?? '' }" } ) { images { logo } name { original } defaultBranch { name } issueCount } branches( page: 0 project: "${ proj ?? '' }" ) { hash aheadbehind { ahead behind } name date }` );

  return (
    <Container className='py-4'>
      <Card>
        { /* Header */ }
        <Card.Header>
          <Row className='text-body-secondary'>
            <Col>Branch</Col>
            <Col>
              <Row>
                <Col>Updated</Col>
                <Col className='d-flex justify-content-center'>
                  <span>Behind</span>
                  <span className='mx-1'>|</span>
                  <span>Ahead</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className='p-0'>
          <ListGroup variant='flush'>
            {
              isLoading
              ?
              <div className='d-flex w-100 align-items-center justify-content-center p-4'>
                <Spinner />
              </div>
                // Build a button for every branch when data loaded.
              : project.references.branches
              // Place the default branch first.
              .sort(
                br =>
                {
                  if ( br.name == project.data.defaultBranch.name ) return -1;
                  return 1;
                }
              )
              .map(
                br =>
                {

                  return (
                    <ListGroup.Item
                      key={ br.hash }
                      action
                      onClick=
                      { () =>
                        navigate( `/${ proj }/tree/${ br.name }` )
                      }
                    >
                      <Row>
                        <Col>
                          { /* Branch name. */ }
                          <span>{ br.name }</span>
                        </Col>
                        <Col>
                          <Row>
                            <Col>
                              { /* Branch last updated. */ }
                              <span>{ getTime( br.date ) } ago</span>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                              {
                                // Check if the actual branch is the default branch.
                                br.name === project.data.defaultBranch.name
                                ? <Badge pill bg='secondary'>default</Badge>
                                :
                                // If not display ahead/behind data.
                                <>
                                  <span>{ br.aheadbehind.behind }</span>
                                  <span className='mx-1'>|</span>
                                  <span>{ br.aheadbehind.ahead }</span>
                                </>
                              }
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                }
              )
            }
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

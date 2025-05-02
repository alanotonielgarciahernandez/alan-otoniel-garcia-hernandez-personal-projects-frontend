// IssuesPage.jsx
// Displays a paginated list of project issues.

import { useContext, useEffect } from 'react';

// Import third-party components.
import { Alert, Badge, Card, Container, Image, ListGroup, Spinner } from 'react-bootstrap';
import { LuCircleDot } from 'react-icons/lu';
import { BsExclamationCircle } from 'react-icons/bs';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Import custom components.
import { SectionContext } from '../context/SectionContext';
import { getTime } from '../helpers/getTime';
import { useFetchProject } from '../hooks/useFetchProject';

export const IssuesPage = () =>
{
  // Get route navigator, route parameters and section context variables.
  const navigate = useNavigate();
  const { proj } = useLoaderData();
  const { setSection } = useContext( SectionContext );

  // Backend petition.
  const { project, isLoading } = useFetchProject( `projects ( page: 1 filter: { keyword:"${ proj }" } ) { images { logo } issueCount name { original } } issues( page: 1 filter: { project:"${ proj ?? '' }" } ) { date labels number status title id }` );

  useEffect( () =>
    {
      setSection( 1 );
    },
    []
  );

  return (
    <Container
      fluid
      className='d-flex flex-row py-4'
      style={ { height: '100vh' } }
    >
      {
        // Renders after getting issues list.
        isLoading
        ? <Spinner />
        :
        <Container className='d-flex flex-column align-items-center'>
          <Alert className='d-flex align-items-center'>
            <BsExclamationCircle className='me-2' />
            <span className='me-1'>If you want to report a new issue, see the</span>
            <a
              className='sha-link'
              onClick=
              { () =>
                navigate( '/contributing' )
              }
            >
              Contributing Guidelines.
            </a>
          </Alert>
          <Card style={ { minWidth:'1000px' } }>
            <Card.Body className='p-0'>
              <ListGroup variant='flush'>
                {
                  project.issues.length == 0
                  ? 
                  <Container className='d-flex flex-column align-items-center py-3'>
                    <Image
                      src='/not-found.svg'
                      height='500px'
                    />
                    <span>There are no issues for this project.</span>
                  </Container>
                  :
                  // Build a button for each issue.
                  project.issues.map(
                    i =>
                    {

                      return (
                        <ListGroup.Item
                          key={ i.id }
                          action
                          className='d-flex'
                          onClick=
                          { () =>
                            navigate( i.number.toString() )
                          }
                        >
                          <div className='me-2'>
                            <LuCircleDot
                              color=
                              {
                                // Paint the icon based on its status.
                                i.status
                                ? 'LimeGreen'
                                : 'Gray'
                              }
                            />
                          </div>
                          <div className='d-flex flex-column'>
                            <div className='d-flex align-items-center'>
                              <span className='fs-4 me-2'>{ i.title }</span>
                              {
                                // Build a badge for each issue label.
                                i.labels.map(
                                  l =>
                                  {
                                    return (
                                      <Badge
                                        key={ l }
                                        pill
                                        className='me-2 border badge-issue'
                                        bg=''
                                      >
                                        { l }
                                      </Badge>
                                    )
                                  }
                                )
                              }
                            </div>
                            <div>
                              { /* Issue date opened. */ }
                              <span className='text-secondary fs-6'>#{ i.number } Opened { getTime( i.date ) } ago</span>
                            </div>
                          </div>
                        </ListGroup.Item>
                      )
                    }
                  )
                }
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      }
    </Container>
  )
}

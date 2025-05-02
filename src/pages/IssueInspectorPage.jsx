// IssueInspectorPage.jsx
// Displays the selected issue information.

// Import third-party components.
import { Badge, Container, Spinner } from 'react-bootstrap';
import { LuCircleDot } from 'react-icons/lu';
import { useLoaderData } from 'react-router-dom';

// Import custom components.
import { getTime } from '../helpers';
import { useFetchProject } from '../hooks/useFetchProject';

export const IssueInspectorPage = () =>
{
  const { proj, iss } = useLoaderData();
  
  const { project, isLoading } = useFetchProject( `projects ( page: 1 filter: { keyword:"${ proj }" } ) { images { logo } name { original } } issues( page: 1 filter: { project:"${ proj ?? '' }" number:${ iss } } ) { date labels number status title richText }` );

  return (
    // Render when data is loaded.
    isLoading
    ? <Spinner />
    :
    <Container className='d-flex flex-column py-4'>
      <div className='pb-2'>
        { /* Title row. */ }
        <span className='fs-2 me-2'>{ project.issues[ 0 ].title }</span>
        <span className='fs-2 text-secondary'>#{ project.issues[ 0 ].number }</span>
      </div>
      <div>
        <Badge
          // Status badge.
          pill
          bg={
            project.issues[ 0 ].status
            ? 'success'
            : 'secondary'
          }
          className='fs-6 me-2'
        >
          <LuCircleDot className='me-2' />
          <span>{ project.issues[ 0 ].status ? 'Open' : 'Closed' }</span>
        </Badge>
        { /* Date opened. */ }
        <span className='text-secondary'>Opened { getTime( project.issues[ 0 ].date ) }</span>
      </div>
      <hr />
      <div dangerouslySetInnerHTML=
      // Issue rich text.
      {
        {
          __html: project.issues[ 0 ].richText
        } 
      } />
    </Container>
  )
}

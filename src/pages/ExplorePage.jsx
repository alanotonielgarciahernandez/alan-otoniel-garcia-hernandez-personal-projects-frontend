// ExplorePage.jsx
// Lists available projects based on user selected filters.

import { useContext, useEffect } from 'react';

// Import third-party components.
import { Col, Container, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

// Import custom components.
import { ExploreProjectCard } from '../components';
import { ProjectContext } from '../context/ProjectContext';
import { useFetchProjects } from '../hooks/useFetchProjects';

export const ExplorePage = () =>
{
  // Get route params, and project context variables.
  const [ searchParams ] = useSearchParams( { page: 1 } );
  const { setProject } = useContext( ProjectContext );

  // Requests projects to the backend.
  const { projects, isLoading } = useFetchProjects( `projects( page: ${ searchParams.get( 'page' ) } filter: { keyword: "${ searchParams.get( 'search' ) ?? '' }" } ) { id description images { background logo } language lastUpdated name { display original } url }` );

  // Sets an empty project to hide <AppNavbar /> project tabs in case of returning from <ProjectPage />.
  // useEffect is used to prevent an app crash.
  useEffect(
    () =>
      setProject( {} ),
    []
  );

  return (
    <Container
      fluid
      className='d-flex flex-row p-0'
    >
      {
        // Renders after getting project list.
        isLoading
        ?
        <div className='d-flex w-100 align-items-center justify-content-center mt-5'>
          { /* Spinner is displayed while waiting for projects. */ }
          <Spinner />
        </div>
        :
        // Resulting projects space.
        <Col>
          <Container className='py-4'>
            <span className='fs-5'>{ projects.length } projects available</span>
          </Container>
          <Container
            className='d-flex flex-column align-items-center'
            style={ { maxWidth:'1000px' } }
          >
            {
              // Builds a <ExploreProjectCard /> component for every available project.
              projects.map(
                project =>
                {
                  return <ExploreProjectCard key={ project.id } className='mb-5' project={ project } />
                }
              )
            }
          </Container>
        </Col>
      }
    </Container>
  );
}

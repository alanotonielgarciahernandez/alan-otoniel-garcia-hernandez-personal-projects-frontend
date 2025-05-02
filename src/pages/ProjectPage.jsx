// ProjectPage.jsx
// Displays the data of the project and the root of the files tree and its
// important files.

import { useContext, useEffect } from 'react';

// Import third-party components.
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

// Import custom components.
import { ImportantFilesViewer, ProjectCard } from '../components';
import { SectionContext } from '../context/SectionContext';
import { getIconByLanguage } from '../helpers';
import { useFetchProject } from '../hooks/useFetchProject';

export const ProjectPage = () =>
{
  // Get the URL params and section context variables.
  const { proj } = useLoaderData();
  const { setSection } = useContext( SectionContext );

  // Get the selected project data.
  const { project, isLoading } = useFetchProject( `projects( page: 1 filter:{ keyword: "${ proj ?? '' }" } ) { id description defaultBranch { hash name } branchCount tagCount commitCount images { background logo } issueCount language name { display original } technologies url } branches( page: 1 project: "${ proj ?? '' }" ) { name } tags( page: 1 project: "${ proj ?? '' }" ) { name }` );

  // Sets the section to "Code" by default.
  useEffect(
    () =>
      setSection( 0 ),
    []
  );

  return(
    <Container className='my-5'>
    {
      // Renders after getting project data.
      isLoading
      ?
      <div className='d-flex w-100 align-items-center justify-content-center'>
        { /* Loading animation while getting project data. */ }
        <Spinner />
      </div>
      :
      <Row>
        { /* First column to display the card components. */ }
        <Col>
          { /* First card with the project data and the root of the files tree. */ }
          <ProjectCard />
          { /* Second card displaying the important files of the project. */ }
          <ImportantFilesViewer />
        </Col>
        { /* Second column to display the project description and used technologies. */ }
        <Col>
          <Container className='d-flex flex-column'>
            <span className='fs-2'>About</span>
            { /* Project description. */ }
            <span>{ project.data.description }</span>
            <hr />
            {
              // List all the project used technologies.
              project.data.technologies.map(
                t =>
                {
                  
                  return (
                    <div key={ t }>
                      <Image
                        src={ getIconByLanguage( t ) }
                        height='20px'
                        className='me-2'
                        onErrorCapture=
                        { e =>
                          e.target.style.display = 'none'
                        }
                      />
                      <span>{ t }</span>
                    </div>
                  )
                }
              )
            }
          </Container>
        </Col>
      </Row>
    }
    </Container>
  );
}

// AppNavbar.jsx
// Navbar with the project and search buttons.

import { useContext } from 'react';

// Import third-party components.
import { Badge, Breadcrumb, Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { LuCircleDot, LuCode } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

// Import custom components.
import { ProjectContext } from '../context/ProjectContext';
import { SectionContext } from '../context/SectionContext';
import { NavbarSearchButton } from './NavbarSearchButton';

export const AppNavbar = () =>
{
  // Get route navigator and project context variables,
  const navigate = useNavigate();
  const { section } = useContext( SectionContext );
  const { project, setProject } = useContext( ProjectContext );
  
  return (
    <Navbar
      // Navbar component with dark colors.
      bg='dark'
      className='d-flex flex-column border-bottom pb-0'
    >
      <Container
        // First row of the Navbar, containing the application
        // logo, project and search buttons.
        fluid
        className={ `d-flex align-items-center ${ Object.entries( project ) == 0 ? 'mb-2' : '' }` }
      >
        <Breadcrumb>
          {
            // Breadcrumb placed at the start of the Navbar that separates the application logo and
            // the project button with a slash.
          }
          <Breadcrumb.Item
            // Contains the application logo button to travel to the <HomePage /> component.
            onClick=
            { () =>
              {
                navigate( '/' );
                setProject( {} );
              }
            }
          >
            <Image
              // Displays the application logo.
              className='p-1'
              src='/logo.svg'
              alt='Alan Otoniel García Hernández Personal Projects'
              height='40px'
            />
          </Breadcrumb.Item>
          {
            // Displays another Breadcrumb item if there is project data on <ProjectContext />
            Object.entries( project ) == 0
            ? <></>
            :
            <Breadcrumb.Item className='d-flex align-items-center'>
              { /* Project button to travel to the <ProjectPage /> component. */ }
              <Button
                // Transparent button style.
                className='btn-transparent d-flex align-items-center'
                onClick=
                { () => 
                  navigate( `/${ project.data.name.original ?? p }` )
                }
              >
                <Image
                  // Displays the selected project icon.
                  src={ `${ import.meta.env.VITE_API_URL }/${ project.data.images.logo }` }
                  height='25px'
                  className='me-2'
                  onErrorCapture={ e => e.target.style.display = 'none' }
                />
                <span>{ project.data.name.original }</span>
              </Button>
            </Breadcrumb.Item>
          }
        </Breadcrumb>

        { /* Project Search Button placed at the end of the Navbar. */ }
        <NavbarSearchButton />

      </Container>
      {
        // Displays the project tabs if there is project data on <ProjectContext />.
        Object.entries( project ) == 0
        ? <></>
        :
        <Container fluid>
          <Nav>
            <Nav.Item>
              { /* Code tab to travel to the <ProjectPage /> component. */ }
              <div className={ `p-2 ${ section == 0 ? 'border-bottom border-2 border-white' : '' }` }>
                <Button
                  className='btn-transparent d-flex align-items-center'
                  onClick=
                  { () =>
                    navigate( `/${ project.data.name.original }` )
                  }
                >
                  <LuCode
                    // Code icon.
                    className='me-2'
                    size='20px'
                  />
                  <span>Code</span>
                </Button>
              </div>
            </Nav.Item>
            <Nav.Item>
              { /* Issue tab to travel to the <IssuesPage /> component. */ }
              <div className={ `p-2 ${ section == 1 ? 'border-bottom border-2 border-white' : '' }` }>
                <Button
                  className='btn-transparent d-flex align-items-center'
                  onClick=
                  { () =>
                    navigate( `/${ project.data.name.original }/issues` )
                  }
                >
                  <LuCircleDot
                    // Issues icon.
                    className='me-2'
                    size='20px'
                  />
                  <span className='me-2'>Issues</span>
                  <Badge
                    pill
                    bg='secondary'
                  >
                    { project.data.issueCount }
                  </Badge>
                </Button>
              </div>
            </Nav.Item>
          </Nav>
        </Container>
      }
    </Navbar>
  );
}

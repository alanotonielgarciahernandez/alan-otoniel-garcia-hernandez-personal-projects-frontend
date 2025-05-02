// AppFooter.jsx
// Footer with quick links.

// Import third-party components.
import { Container, Image, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const AppFooter = () =>
{
  // Route navigator.
  const navigate = useNavigate();
  
  return (
    // Footer with dark colors.
    <footer className='bg-dark py-4 mt-auto'>
      <Container fluid>
        <div className='d-flex justify-content-between'>
          <Image
            // Logo placed at the start of the footer.
            src='/logo.svg'
            alt='Alan Otoniel García Hernández Personal Projects'
            height='40px'
          />
          <Nav className='align-items-center'>
            {
              // Nav component to align the links
            }
            <Nav.Item
              // Contributing Guidelines link.
              className='me-2'
              onClick=
              { () =>
                navigate( '/contributing' )
              }
            >
              <span className='footer-link'>Contributing</span>
            </Nav.Item>
            <Nav.Item
              // Privacy Policy link.
              className='me-2'
              onClick=
              { () =>
                navigate( '/privacy' )
              }
            >
              <span className='footer-link'>Privacy</span>
            </Nav.Item>
          </Nav>
        </div>
      </Container>
    </footer>
  )
}

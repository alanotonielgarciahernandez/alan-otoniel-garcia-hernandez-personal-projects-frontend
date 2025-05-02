// ExploreProjectCard.jsx
// Button card used to display some information of a project on <ExplorePage /> component.

// Import third-party components.
import PropTypes from 'prop-types';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Import custom components.
import { getIconByLanguage } from '../helpers/getIcon';
import { getTime } from '../helpers';

export const ExploreProjectCard = ( { className, project } ) =>
{
  // Get route navigator and project context variables.
  const navigate = useNavigate();

  // Gets the programming language icon based on its name.
  const iconPath = getIconByLanguage( project.language );

  // Navigate to project setting the project data into the project context.
  const onNavigate = () =>
  {
    navigate( '/' + project.name.original );
  }

  return (
    <Card
      // Button card.
      className={ className }
      style={ { minWidth: '1000px' } }
      onClick={ onNavigate }
    >
      <Card.Body
        // Card body with the project background image.
        style=
        {
          {
            backgroundImage: `linear-gradient( to right, rgb( 15, 15, 15, 1), transparent ), url( '${ import.meta.env.VITE_API_URL }/${ project.images.background }' )`,
            backgroundPosition: 'right center',
            backgroundSize: 'cover'
          }
        }
      >
        <Col>
          { /* Vertical alignment. */ }
          <div className='d-flex align-items-center'>
            { /* First row, placed on top. */ }
            <Image
              // Project logo.
              rounded
              src={ `${ import.meta.env.VITE_API_URL }/${ project.images.logo }` }
              height='80px'
              className='me-2'
              onErrorCapture={ e => e.target.style.display = 'none' }
            />
            <div className='d-flex flex-column'>
              { /* Project original and display names. */ }
              <h2 className='mb-0'>{ project.name.display }</h2>
              <p>{ project.name.original }</p>
            </div>
          </div>
          { /* Second Row with the project description placed on middle. */ }
          <span className='d-flex mb-0'>{ project.description }</span>
          <Image
            // Programming language icon.
            src={ iconPath }
            height='20px'
            className='me-2'
            onErrorCapture={ e => e.target.style.display = 'none' }
          />
          { /* Programming language. */ }
          <span className='mb-0 me-1'>{ project.language } •</span>
          { /* Project last update. */ }
          <span>Updated { getTime( project.lastUpdated ) }</span>
        </Col>
      </Card.Body>
    </Card>
  )
}

ExploreProjectCard.propTypes =
{
  className: PropTypes.string,
  project: PropTypes.object
}

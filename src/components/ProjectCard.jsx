// ProjectCard.jsx
// Card displaying the names, logo, background, branches, tags and commits
// with its count, download options and files tree.

import { useContext } from 'react';

// Import third-party component.
import { Card } from 'react-bootstrap';

// Import custom components.
import { ProjectContext } from '../context/ProjectContext';
import { ListFiles } from './ListFiles';
import { ProjectCardHeader } from './ProjectCardHeader';

export const ProjectCard = () =>
{
  // Get project context variables.
  const { project } = useContext( ProjectContext );

  return (
    <Card
      className='mb-5'
      style=
      { 
        {
          minWidth: '1000px',
          maxWidth: '1000px'
        }
      }
    >
      <Card.Header style=
      {
        // Project background image.
        {
          backgroundImage: `linear-gradient( to right, rgb( 15, 15, 15, 1), transparent ), url( '${ import.meta.env.VITE_API_URL }/${ project.data.images.background }' )`,
          backgroundPosition: 'right center',
          backgroundSize: 'cover'
        }
      }
      >
        {
          // Header containing the project short name, logo, branch, tag and commit count, and
          // download options.
        }
        <ProjectCardHeader />
      </Card.Header>
      <Card.Body className='p-0'>
        { /* Root files tree. */ }
        <ListFiles />
      </Card.Body>
    </Card>
  )
}

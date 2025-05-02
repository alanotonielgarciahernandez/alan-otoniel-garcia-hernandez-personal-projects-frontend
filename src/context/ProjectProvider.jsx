// ProjectProvider.jsx
// Initializes and exposes the project data variables.

import { useState } from 'react';

// Import third-party component.
import PropTypes from 'prop-types';

// Import context component.
import { ProjectContext } from './ProjectContext';

export const ProjectProvider = ( { children } ) =>
{
  // Will contain the current project under inspection.
  const [ project, setProject ] = useState( {} );

  return (
    // Exposes the variables to be used by any child.
    <ProjectContext.Provider value={ { project, setProject } }>
      { children }
    </ProjectContext.Provider>
  );
}

ProjectProvider.propTypes =
{
  children: PropTypes.element
}

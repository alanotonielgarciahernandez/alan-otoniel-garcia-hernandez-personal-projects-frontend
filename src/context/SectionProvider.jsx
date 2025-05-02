// SectionProvider.jsx
// Initializes and exposes the project section variables.

import { useState } from 'react';

// Import third-party component.
import PropTypes from 'prop-types';

// Import context component.
import { SectionContext } from './SectionContext';

export const SectionProvider = ( { children } ) =>
{
  // Will contain the current section of the project.
  const [ section, setSection ] = useState( 0 );

  return (
    // Exposes the variables to be used by any child.
    <SectionContext.Provider value={ { section, setSection } }>
      { children }
    </SectionContext.Provider>
  );
}

SectionProvider.propTypes =
{
  children: PropTypes.arrayOf( PropTypes.element )
}

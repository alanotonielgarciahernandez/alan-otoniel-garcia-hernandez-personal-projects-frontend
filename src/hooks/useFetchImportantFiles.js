// useFetchImportantFiles.js
// Custom hook processing the content response of every important file of a project.

import { useEffect, useState } from 'react';

// Import backend petition helper.
import { getImportantFiles } from '../helpers';

export const useFetchImportantFiles = ( request ) =>
{
  const [ importantFiles, setImportantFiles ] = useState( {} );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () =>
      {
        getImportantFiles( request )
        .then( data =>
          {
            setImportantFiles( data );
  
            setIsLoading( false );
          }
        );
      },
      [ request.Reference ]
    );
  
  return {
    importantFiles,
    isLoading
  }
}

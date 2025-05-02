// useFetchFiles.js
// Custom hook processing the files tree response from the backend.

import { useEffect, useState } from 'react';

// Import backend petition helper.
import { getFiles } from '../helpers';

export const useFetchFiles = request =>
{
  const [ tree, setTree ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () =>
    {
      getFiles( request )
      .then( data =>
        {
          setTree( data );

          setIsLoading( false );
        }
      );
    },
    [ request.Reference ]
  );

  return {
    tree,
    isLoading
  }
}

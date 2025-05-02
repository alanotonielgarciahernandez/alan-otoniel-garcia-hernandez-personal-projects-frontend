// useFetchContent.js
// Custom hook processing the file content from query.

import { useEffect, useState } from 'react';

// Import backend petition helper.
import { getContent } from '../helpers';

export const useFetchContent = request =>
{
  const [ content, setContent ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () =>
    {
      getContent( request )
      .then( data =>
        {
          setContent( data );

          setIsLoading( false );
        }
      );
    },
    [ request.Path, request.Reference ]
  );
  
  return {
    content,
    isLoading
  }
}

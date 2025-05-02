// useFetchRelease.js
// Custom hook processing the release response from the backend.

import { useEffect, useState } from 'react';

// Backend petition helper.
import { getData } from '../helpers';

// Requests release data.
export const useFetchRelease = query =>
{
  const [ release, setRelease ] = useState( {} );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () =>
    {
      getData( query )
      .then( response =>
        {
          setRelease( response.release );
          
          setIsLoading( false );
        }
      );
    },
    []
  );
  
  return {
    release,
    isLoading
  }
}

// useFetchCommit.js
// Custom hook processing the commit data response from query.

import { useEffect, useState } from 'react';

// Import backend petition helper.
import { getCommit } from '../helpers';

export const useFetchCommit = request =>
{
  const [ commit, setCommit ] = useState( {} );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () =>
    {
      getCommit( request )
      .then( data =>
        {
          setCommit( data );

          setIsLoading( false );
        }
      );
    },
    [ request.Reference ]
  );

  return {
    commit,
    isLoading
  }
}

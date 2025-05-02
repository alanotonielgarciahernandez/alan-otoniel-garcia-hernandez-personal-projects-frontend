// useFetchProjects.js
// Custom hook processing the projects response from the backend.

import { useEffect, useState } from 'react';

// Backend petition helper.
import { getData } from '../helpers';

// Requests and list projects data.
export const useFetchProjects = query =>
{
  const [ projects, setProjects ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () =>
    {
      getData( query )
      .then( response =>
        {
          setProjects( response.projects );
          
          setIsLoading( false );
        }
      );
    },
    []
  );
  
  return {
    projects,
    isLoading
  }
}

// useFetchProject.js
// Custom hook processing the project, references and issues response.

import { useContext, useEffect, useState } from 'react';

// Import custom component.
import { ProjectContext } from '../context/ProjectContext';

// Import backend petition helper.
import { getData } from '../helpers';

// Requests and list projects data.
export const useFetchProject = query =>
{
  // Get project context variables.
  const { project, setProject } = useContext( ProjectContext );
  
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () =>
    {
      getData( query )
      .then( response =>
        {
          // Create pretty model TO CHANGE.
          var model = { references: {} }

          if ( response.projects ) model[ 'data' ] = response.projects[ 0 ];
          if ( response.branches ) model[ 'references' ][ 'branches' ] = response.branches;
          if ( response.commits ) model[ 'references' ][ 'commits' ] = response.commits;
          if ( response.tags ) model[ 'references' ][ 'tags' ] = response.tags;
          if ( response.issues ) model[ 'issues' ] = response.issues;
          if ( response.release ) model[ 'release' ] = response.release;

          setProject( model );
          
          setIsLoading( false );
        }
      );
    },
    [ query ]
  );
  
  return {
    project,
    isLoading
  }
}

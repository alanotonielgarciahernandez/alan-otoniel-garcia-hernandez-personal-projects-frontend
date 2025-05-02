// useFetchCommits.js
// Custom hook processing the commits data from query.

import { useContext, useEffect, useState } from 'react';

// Import backend petition helper.
import { getData } from '../helpers';

// Import custom component.
import { ProjectContext } from '../context/ProjectContext';

const buildFetch = data =>
{
  var result = '';

  data.forEach(
    element =>
    {
      if ( typeof element == 'object' )
      {
        result += ' {';

        result += ` ${ buildFetch( element ) }`;

        result += ' }';
      }
      else result += ` ${ element }`;
    }
  );

  return result;
}

export const useFetchCommits = query =>
{
  const { project, setProject } = useContext( ProjectContext );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () =>
    {
      getData( query )
      .then( response =>
        {
          var model = { data: '', references: { branches: '', commits: '', tags: '' } };
          var map = {};
          
          response.commits.forEach( c =>
            {
              const commitDate = new Date( c.date );
              
              const date = commitDate.toLocaleString( 'en', { year: 'numeric', month: 'short', day: 'numeric' } );
              
              if ( map[ date ] == undefined ) map[ date ] = []
              
              map[ date ].push( c );
              
            }
          );
          
          if ( response.projects ) model.data = response.projects[ 0 ];
          if ( response.commits ) model.references.commits = map;
          model.references.branches = response.branches;
          model.references.tags = response.tags;

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

// useFetchArchive.js
// Custom hook to download a project compressed file.

import { getArchive } from '../helpers';

export const useFetchArchive = () =>
{
  return ( request ) =>
  {
    getArchive( request )
    .then(
      res =>
      {
        const href = window.URL.createObjectURL( new Blob( [ res ] ) );
        const link = document.createElement( 'a' );
  
        link.href = href;
        link.setAttribute( 'download', `${ request.Project }-${ request.Reference }.${ request.Extension }` );
        document.body.appendChild( link );
        link.click();
  
        document.body.removeChild( link );
        URL.revokeObjectURL( href );
      }
    )
  }
}

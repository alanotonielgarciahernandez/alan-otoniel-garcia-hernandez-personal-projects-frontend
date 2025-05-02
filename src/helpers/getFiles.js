// getFiles.js
// Makes an asyncronous petition to the backend specified in the environment variables to get a file
// tree.

import axios from 'axios';

// Backend request.
export const getFiles = async headers =>
{
  const url = `${ import.meta.env.VITE_API_URL }/get-files`;

  const res = await axios.get( url, { headers: { ...headers } } );

  return res.data;
}

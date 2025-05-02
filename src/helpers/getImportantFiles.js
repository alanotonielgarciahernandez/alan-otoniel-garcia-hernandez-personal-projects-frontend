// getImportantFiles.js
// Makes an asyncronous petition to the backend specified in the environment variables to get all
// the important files of the current reference.

import axios from 'axios';

// Backend request.
export const getImportantFiles = async headers =>
{
  const url = `${ import.meta.env.VITE_API_URL }/get-importantfiles`;

  const res = await axios.get( url, { headers: { ...headers } } );

  return res.data;
}

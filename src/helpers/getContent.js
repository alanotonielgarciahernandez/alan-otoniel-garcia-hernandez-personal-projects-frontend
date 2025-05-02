// getContent.js
// Makes an asyncronous petition to the backend specified in the environment variables to get a file
// content.

import axios from 'axios';

export const getContent = async headers =>
{
  // API route.
  const url = `${ import.meta.env.VITE_API_URL }/get-content`;

  // API petition.
  const res = await axios.get( url, { headers: { ...headers } } );

  return res.data;
}

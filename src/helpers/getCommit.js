// getCommit.js
// Makes an asyncronous petition to the backend specified in the environment variables to get a commit
// data.

// Import third-party component.
import axios from 'axios';

// Backend request.
export const getCommit = async headers =>
{
  const url = `${ import.meta.env.VITE_API_URL }/get-commit`;

  const res = await axios.get( url, { headers: { ...headers } } );

  return res.data;
}

// getArchive.js
// Makes an asyncronous petition to the backend specified in the environment
// variables to get the project zipped file.

// Import third-party component.
import axios from 'axios';

// Backend request.
export const getArchive = async headers =>
{
  const url = `${ import.meta.env.VITE_API_URL }/get-archive`;

  const res = await axios.get(
    url,
    {
      headers: { ...headers },
      responseType: 'blob'
    }
  );

  return res.data;
}

// getData.js
// Makes an asyncronous petition to the backend specified in the environment variables based on
// the query parameter.

import axios from 'axios';

export const getData = async query =>
{
  // API route.
  const url = `${ import.meta.env.VITE_API_URL }/query`;

  // API petition.
  const res = await axios.post( url,
    {
      // GraphQL query.
      'query': `query GetData { ${ query } }`,
      'operationName':'GetData'
    }
  );

  return res.data.data;
}

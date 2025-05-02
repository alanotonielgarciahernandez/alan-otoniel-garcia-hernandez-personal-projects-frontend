// PrivacyPage.jsx
// Users Privacy Policy.

import { useContext, useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import Markdown from 'react-markdown';
import { ProjectContext } from '../context/ProjectContext';

export const PrivacyPage = () =>
{
  // Project data.
  const { setProject } = useContext( ProjectContext );

  // Contributing Guidelines content.
  const [ md, setMd ] = useState( '' );

  // Get markdown file content and set to "md" state.
  useEffect(
    () =>
    {
      // Restart project data.
      setProject( {} );

      // Get PRIVACY.md content.
      fetch( `/PRIVACY.md` )
      .then( res => res.text() )
      .then( text => setMd( text ) )
    }, []
  );
  

  return (
    <Container className='d-flex flex-column my-3'>
      { /* Privacy Policy */ }
      <Markdown>
        { md }
      </Markdown>
    </Container>
  )
}

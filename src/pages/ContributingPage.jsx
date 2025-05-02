// ContributingPage.jsx
// Contributing Guidelines and contact form.

import { useContext, useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import Markdown from 'react-markdown';
import { ProjectContext } from '../context/ProjectContext';

export const ContributingPage = () =>
{
  const { setProject } = useContext( ProjectContext );

  // Contributing Guidelines content.
  const [ md, setMd ] = useState( '' );

  // Get markdown file content and set to "md" state.
  useEffect(
    () =>
    {
      // Restart project data.
      setProject( {} );

      // Get CONTRIBUTING.md content.
      fetch( `/CONTRIBUTING.md` )
      .then( res => res.text() )
      .then( text => setMd( text ) )
    }, []
  );

  return (
    <Container className='d-flex flex-column my-3'>
      { /* Contributing Guidelines */ }
      <Markdown>
        { md }
      </Markdown>
    </Container>
  )
}

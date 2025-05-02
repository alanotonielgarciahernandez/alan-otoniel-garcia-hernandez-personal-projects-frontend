// ErrorScreen.jsx
// Displays when encountering an error.

import { useContext, useEffect } from 'react';

import { Container, Image } from 'react-bootstrap';

import { ProjectContext } from '../context/ProjectContext';

export const ErrorScreen = () =>
{
  const { setProject } = useContext( ProjectContext );

  useEffect(
    () =>
      setProject( {} ),
    []
  );

  return (
    <Container
      className='d-flex flex-column justify-content-center align-items-center'
      style={ { height: '100vh' } }
    >
      <Image
        // Error illustration.
        src='/not-found.svg'
        height='500px'
      />
      <span className='fs-3'>Error encountered</span>
    </Container>
  );
}

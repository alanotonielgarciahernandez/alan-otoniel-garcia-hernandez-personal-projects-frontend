// HomeScreen.jsx
// Index route of the application, containing the logo of the application.

import { Container, Image } from 'react-bootstrap';

export const HomeScreen = () =>
{

  return (
    <Container
      className='d-flex flex-column justify-content-center align-items-center'
      style={ { height: '100vh' } }
    >
      { /* Container with the home background image. */ }
      <Image
        // Application logo.
        src='/logo.svg'
        alt='Alan Otoniel García Hernández Personal Projects'
      />
      <span className='fs-3'>My skill in action, one project at a time</span>
    </Container>
  );
}

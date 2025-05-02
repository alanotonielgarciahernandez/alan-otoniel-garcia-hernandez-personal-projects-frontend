// App.jsx
// Base component used in all pages.

import { Outlet } from 'react-router-dom';

// Import custom components.
import { AppFooter, AppNavbar } from './components';
import { ProjectProvider } from './context/ProjectProvider';
import { SectionProvider } from './context/SectionProvider';
import { loadIcons } from './helpers';

export const App = () =>
{
  // Load material-icons.
  loadIcons();

  return (
    // Use all the screen height.
    <div
      className='d-flex flex-column'
      style={ { minHeight:'100vh' } }
    >
      { /* Initialize the Project and Section context */ }
      <ProjectProvider>
        <SectionProvider>
          { /* Display Navbar on top */ }
          <AppNavbar />

          { /* Display the children passed by the router */ }
          <Outlet />

          { /* Display the Footer on bottom */ }
          <AppFooter />
        </SectionProvider>
      </ProjectProvider>
    </div>
  );
}

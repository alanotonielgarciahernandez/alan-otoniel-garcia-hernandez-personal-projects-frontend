// ProjectCardHeader.jsx
// Card header containing the project short name, logo, branch, tag and commit count, and
// download options.

import { useContext } from 'react';

// Import third-party components.
import { Button, Image } from 'react-bootstrap';
import { BsTag } from 'react-icons/bs';
import { FaClockRotateLeft, FaCodeBranch } from 'react-icons/fa6';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Import custom components.
import { BranchListing } from './BranchListing';
import { CodeOptions } from './CodeOptions';
import { ProjectContext } from '../context/ProjectContext';

export const ProjectCardHeader = () =>
{
  // Get route navigator, route parameters and project context variables.
  const navigate = useNavigate();
  const { proj, ref } = useLoaderData();
  const { project } = useContext( ProjectContext );

  return (
    <>
      <div className='d-flex align-items-center'>
        { /* First row placed on top. */ }
        <Image
          // Project logo image.
          src={ `${ import.meta.env.VITE_API_URL }/${ project.data.images.logo }` }
          height='50px'
          className='m-2'
          onErrorCapture={ e => e.target.style.display = 'none' }
        />
        { /* Project short name. */ }
        <span className='fs-2'>{ project.data.name.display }</span>
      </div>
      <div className='d-flex justify-content-between mt-2'>
        { /* Second Row placed on bottom. */ }
        <div className='d-flex'>
          { /* Dropdown listing project branches and tags. */ }
          <BranchListing className='me-2' />

          <Button
            // Project branch count button which redirects to the <BranchesPage />.
            size='sm'
            className='d-flex align-items-center btn-transparent me-2'
            onClick=
            { () =>
              navigate( `/${ proj }/branches` )
            }
          >
            <FaCodeBranch />
            <span className='d-none d-xl-flex ms-2'>{ project.data.branchCount } Branches</span>
          </Button>
          <Button
            // Project tag count which redirects to the <TagsPage /> component.
            size='sm'
            className='d-flex align-items-center btn-transparent me-2'
            onClick=
            { () =>
              navigate( `/${ proj }/tags` )
            }
          >
            <BsTag />
            <span className='d-none d-xl-flex ms-2'>{ project.data.tagCount } Tags</span>
          </Button>
          <Button
            // Project commit count button which redirects to the <CommitsPage /> component.
            size='sm'
            className='d-flex align-items-center btn-transparent me-2'
            onClick=
            { () =>
              navigate( `/${ proj }/commits/${ ref ?? project.data.defaultBranch.name }` )
            }
          >
            <FaClockRotateLeft />
            <span className='d-none d-xl-flex ms-2'>{ project.data.commitCount } Commits</span>
          </Button>
        </div>

        <div className='d-flex align-items-center'>
          { /* Download options dropdown placed at the end. */ }
          <CodeOptions />
        </div>
      </div>
    </>
  )
}
// FilesTree.jsx
// Displays a tree of the project files with the option to expand folders.

import { useContext, useState } from 'react'

// Import third-party components.
import { Accordion, Button, Card, Container, Spinner, useAccordionButton } from 'react-bootstrap';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Import custom components.
import { ProjectContext } from '../context/ProjectContext'
import { getEntryIcon } from '../helpers';
import { useFetchFiles } from '../hooks/useFetchFiles';

export const FilesTree = () =>
{
  // Get route navigator, route segments and project context variables.
  const navigate = useNavigate();
  const { proj, ref, '*': path } = useLoaderData();
  const { project } = useContext( ProjectContext );

  // Backend petition.
  const { tree, isLoading } = useFetchFiles(
    {
      project: proj,
      path: path,
      Reference: ref ?? project.references.default.id
    }
  );

  const [ openTrees, setOpenTrees ] = useState( [] );

  // Folder expand button.
  const CustomToggle = ( { children, eventKey, type, path } ) =>
  {
    const onClick = useAccordionButton( eventKey,
      () =>
      {
        setOpenTrees(
          openedTrees =>
          {
            if ( openedTrees.includes( eventKey ) )
            {
              return openedTrees.filter((key) => key !== eventKey);
            } else {
              return [ ...openedTrees, eventKey ];
            }
          }
        )
      }
    )

    return (
      <Container className='d-flex p-0'>
        {
          type === 'Tree'
          ? 
          <Button
            className='px-0 btn-transparent'
            onClick={ onClick }
          >
            {
              openTrees.includes( eventKey )
              ? <LuChevronDown />
              : <LuChevronRight />
            }
          </Button>
          : <div className='me-3'/>
        }
        <Button
          className='d-flex w-100 btn-transparent'
          onClick=
          { () =>
            navigate(`/${ proj }/${ type.toLowerCase() }/${ ref ?? project.data.defaultBranch.name }/${ path }`)
          }
        >
          { children }
        </Button>
      </Container>
    );
  }

  // Tree builder.
  const buildTree = ( tree, route ) =>
  {
    
    return Object.keys( tree ).map( e =>
      {
        const fullPath = getEntryIcon( tree[ e ].name, tree[ e ].type )

        return (
          <Card key={ tree[ e ].name } className='files-tree'>
            <Card.Header className='p-0'>
              <CustomToggle eventKey={ tree[ e ].name } type={ tree[ e ].type } path={ route + tree[ e ].name }>
                <img src={ fullPath } className='me-2' width='20px' object-fit='contain' />
                <span className='text-truncate'>{ tree[ e ].name }</span>
              </CustomToggle>
            </Card.Header>
            {
              tree[ e ].type != 'Tree'
              ? <></>
              :
              <Accordion.Collapse eventKey={ tree[ e ].name }>
                <div className='d-flex flex-row'>
                  <div className='vr d-flex align-items-center mx-2' />
                  <Card.Body className='d-flex flex-column p-0'>
                    { buildTree( tree[ e ].tree, route + tree[ e ].name + '/' ) }
                  </Card.Body>
                </div>
              </Accordion.Collapse>
            }
          </Card>
        )
      }
    )
  }

  return (
    <Accordion alwaysOpen>
      {
        isLoading
        ? <Spinner />
        : buildTree( tree, '' )
      }
    </Accordion>
  )
}

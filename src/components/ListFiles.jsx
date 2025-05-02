// ListFiles.jsx
// Displays a button list of file inside a tree.

import { useContext } from 'react';

// Import third-party compoments.
import PropTypes from 'prop-types';
import { ListGroup, Col, Row, Spinner } from 'react-bootstrap';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Import custom components.
import { ProjectContext } from '../context/ProjectContext';
import { getEntryIcon } from '../helpers';
import { useFetchFiles } from '../hooks/useFetchFiles';

export const ListFiles = ( { className } ) =>
{
  // Get route navigator, route parameters and project context variables.
  const navigate = useNavigate();
  const { proj, ref, '*': path } = useLoaderData();
  const { project } = useContext( ProjectContext );

  // Get files tree.
  const { tree, isLoading } = useFetchFiles(
    {
      Project: proj,
      Reference: ref ?? project.data.defaultBranch.hash,
      //Path: r ?? '',
    }
  );

  var current = {};

  // Tree navigate function.
  const onNavigate = ( fileName, fileType ) =>
  {
    var route;

    route = `/${ proj }/${ fileType.toLowerCase() }/${ ref ?? project.data.defaultBranch.name }/${ path ?? fileName }`;

    if ( path ) route += `/${ fileName }`;
    
    navigate( route );
  }
  
  // Find the tree to display from the provided tree response.
  const findDirectory = () =>
  {
    current = tree;
    if ( path != undefined )
    {
      path.split( '/' ).forEach( e =>
      {
        Object.keys( current ).forEach( v =>
        {
          if ( v == e )
          {
            current = current[ v ].tree;
          }
        });
      });
    }

    return current;
  }

  return (
    <ListGroup
      variant='flush'
      className={ className }
    >
      {
        // Renders when files tree are ready.
        isLoading
        ?
        <div className='d-flex w-100 align-items-center justify-content-center p-4'>
          <Spinner />
        </div>
        :
        Object.keys( findDirectory() ).map(
          e =>
          {
            // Builds a button for every entry on tree.
            const f = current[ e ];
            const fullPath = getEntryIcon( f.name, f.type );

            return (
              <ListGroup.Item
                action
                key={ f.name }
                onClick=
                {
                  () =>
                  onNavigate( f.name, f.type )
                }
              >
                <Row>
                  <Col className='d-flex align-items-center'>
                    { /* Entry icon and name. */ }
                    <img src={ fullPath } className='me-2' width='20px' object-fit='contain' />
                    <span className='text-body'>{ f.name }</span>
                  </Col>
                  <Col className='d-flex align-items-center'>
                    { /* Entry last commit message. */ }
                    { /* <span>{ f.lastCommit.message[ 0 ] }</span> */ }
                  </Col>
                  <Col className='d-flex align-items-center justify-content-end'>
                    { /* Entry last commit time ago. */ }
                    { /* <span>{ getTime( f.lastCommit.date ) } ago</span> */ }
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          }
        )
      }
    </ListGroup>
  )
}

ListFiles.propTypes =
{
  className: PropTypes.string
}

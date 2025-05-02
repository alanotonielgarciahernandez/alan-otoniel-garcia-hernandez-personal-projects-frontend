// ImportantFilesViewer.jsx
// Card displaying the content of a project important files.

import { useContext, useState } from 'react';

// Import third-party components.
import { Card, Image, Nav } from 'react-bootstrap';
import Markdown from 'react-markdown';
import { useLoaderData } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Import custom components.
import { getIconByFilename } from '../helpers';
import { useFetchImportantFiles } from '../hooks/useFetchImportantFiles';
import { ProjectContext } from '../context/ProjectContext';

export const ImportantFilesViewer = () =>
{
  const { proj, ref } = useLoaderData();
  const [ fileIndex, setFileIndex ] = useState( 'README.md' );
  const { project } = useContext( ProjectContext );

  // Backend petition.
  const { importantFiles, isLoading } = useFetchImportantFiles(
    {
      project: proj,
      reference: ref ?? project.data.defaultBranch.hash
    }
  );

  // If there are no important files, don't display nothing.
  if ( Object.keys( importantFiles ).length == 0 ) return <></>

  return (
    <Card style={ { maxWidth: '1000px' } }>
      <Card.Header className='px-2 py-0'>
        <Nav
          variant='underline'
          defaultActiveKey='README.md'
          onSelect={ setFileIndex }
        >
          {
            Object.keys( importantFiles )
            // Place README.md on first tab.
            .sort(
              i =>
              {
                if ( i.toLowerCase() == 'readme.md' ) return -1;
                return 1;
              }
            )
            // Build a tab for every important file.
            .map( i =>
              {
                const iconPath = getIconByFilename( i );
                return (
                  <Nav.Item key={ i }>
                    <Nav.Link
                      eventKey={ i }
                      className='d-flex align-items-center text-body'
                    >
                      <Image
                        src={ iconPath }
                        width='20px'
                        className='me-2'
                      />
                      <span>{ i }</span>
                    </Nav.Link>
                  </Nav.Item>
                )
              }
            )
          }
        </Nav>
      </Card.Header>
      <Card.Body>
        {
          // Displays the important file content when is loaded.
          isLoading
          ? <></>
          :
          <Markdown
            remarkPlugins={ [ remarkGfm ] }
            rehypePlugins={ [ rehypeRaw ] }
          >
            { importantFiles[ fileIndex ].join( '\n' ) }
          </Markdown>
        }
      </Card.Body>
    </Card>
  );
}

// BlobPage.jsx
// Displays the selected file content with syntax highlighted.

import { useContext } from 'react';

// Import third-party components.
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Import custom components.
import { ProjectContext } from '../context/ProjectContext';
import { getLanguageByExtension } from '../helpers';
import { useFetchContent } from '../hooks/useFetchContent';

export const BlobPage = () =>
{
  // Get route segments and project context variables.
  const { proj, ref, '*': path } = useLoaderData();
  const { project } = useContext( ProjectContext );

  // Backend petition.
  const { content, isLoading } = useFetchContent(
    {
      Project: proj,
      Path: path,
      Reference: ref ?? project.defaultBranch.name
    }
  );

  var segments = path.split( '/' );
  var fileName = segments[ segments.length - 1 ]
  var extensionIndex = fileName.indexOf( '.' );

  return (
    <Container>
      {
        // Render after loading data.
        isLoading
        ? <></>
        :
        <Card>
          <Card.Body className='p-0'>
            <Row>
              <Col>
                { /* File content with syntax highlighter. */ }
                <SyntaxHighlighter
                  showLineNumbers
                  language={ getLanguageByExtension( fileName.slice( extensionIndex + 1 ) ) }
                  style={ vs2015 }
                  customStyle={ { marginBottom: '0px' } }
                >
                  { content.join( '\n' ) }
                </SyntaxHighlighter>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      }
    </Container>
  )
}

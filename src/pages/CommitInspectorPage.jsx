// CommitInspectorPage.jsx
// Displays commit information.

import { useState } from 'react';

// Import third-party components.
import { Badge, Button, Card, Container, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import { BsCopy } from 'react-icons/bs';
import { LuFolderTree } from 'react-icons/lu';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Import custom components.
import { useFetchCommit } from '../hooks/useFetchCommit';
import { useFetchProject } from '../hooks/useFetchProject';

export const CommitInspectorPage = () =>
{
  // Get route navigator and route parameters.
  const navigate = useNavigate();
  const { proj, ref } = useLoaderData();
  const [ tooltipValue, setTooltipValue ] = useState( '' );

  useFetchProject( `projects( page: 1 filter:{ keyword: "${ proj ?? '' }" } ) { id images { logo } issueCount name { original } } branches( page: 1 project: "${ proj ?? '' }" ) { name } tags( page: 1 project: "${ proj ?? '' }" ) { name }` );

  // Backend petition.
  const { commit, isLoading } = useFetchCommit(
    {
      Project: proj,
      Reference: ref,
    }
  );

  // Copy to device clipboard function.
  const copyToClipboard = value =>
  {
    const data = [ new ClipboardItem( { [ 'text/plain' ]: value } ) ];
    navigator.clipboard.write( data );
    
    setTooltipValue( 'Copied to clipboard!' );
  }

  // Clipboard tooltip.
  const tooltip = props => <Tooltip { ...props }>{ tooltipValue }</Tooltip>

  return (
    isLoading
    ?
    <div className='d-flex w-100 justify-content-center p-4'>
      <Spinner />
    </div>
    :
    // Render when data is loaded.
    <>
      <Container
        fluid
        className='d-flex flex-column mt-4 px-4'
      >
        <div className='d-flex justify-content-between'>
          <div className='fs-3'>
            { /* Title. */ }
            <span className='me-2'>Commit</span>
            <Badge bg='dark'>{ ref.slice( 0, 7 ) }</Badge>
          </div>
          <Button
            // Travel to the files tree.
            className='d-flex align-items-center btn-outline'
            variant='dark'
            onClick=
            { () =>
              navigate( `/${ proj }/${ ref }` )
            }
          >
            <LuFolderTree className='me-1' />
            <span>Browse Files</span>
          </Button>
        </div>
        { /* Commit date. */ }
        <span className='text-body-secondary mb-3'>Commited on { new Date( commit.date ).toLocaleString( 'en', { year: 'numeric', month: 'short', day: 'numeric' } ) }</span>
        { /* Commit message card. */ }
        <Card>
          <Card.Body
            className='font-monospace'
            style={ { whiteSpace: 'pre-line' } }
          >
            { commit.message.join( '\n' ) }
          </Card.Body>
          <Card.Footer>
            <Container
              fluid
              className='d-flex justify-content-end'
            >
              {
                commit.parent === ''
                ? <span className='me-2 text-body-secondary'>No parent</span>
                :
                <>
                  <span className='me-1 text-body-secondary'>Parent</span>
                  <a
                    className='me-2 sha-link'
                    onClick=
                    { () =>
                      navigate( `/${ proj }/commit/${ commit.parent }` )
                    }
                  >
                    { commit.parent.slice( 0, 7 ) }
                  </a>
                </>
              }
              <span className='me-1 text-body-secondary'>Commit</span>
              <span className='text-body me-1'>{ ref.slice( 0, 7 ) }</span>
              <OverlayTrigger
                placement='bottom'
                overlay={ tooltip }
              >
                <Button
                  className='d-flex align-items-center p-1 btn-transparent'
                  onMouseEnter=
                  { () =>
                    setTooltipValue( `Copy full SHA for ${ ref.slice( 0, 7 ) }` )
                  }
                  onClick=
                  { () =>
                    copyToClipboard( ref )
                  }
                >
                  <BsCopy />
                </Button>
              </OverlayTrigger>
            </Container>
          </Card.Footer>
        </Card>
      </Container>
      <hr className='mb-0' />
      <Container className='mt-3'>
        { /* Change summary. */ }
        <div>
          <span className='fs-5 me-2'>{ Object.keys( commit.diff ).length } files changed</span>
          <span className='text-success me-1'>+{ commit.linesChanged.added }</span>
          <span className='text-danger me-2'>-{ commit.linesChanged.deleted }</span>
          <span className='text-body-secondary'>lines changed</span>
        </div>
        {
          // Build a card for every file changed with the content changed.
          Object.keys( commit.diff ).map(
            n =>
            {
              var content = commit.diff[ n ];

              // Format content.
              content.forEach( ( e, i ) =>
                {
                  if ( e.startsWith( 'Context' ) )
                  {
                    content[ i ] = e.replace( 'Context', '\t' );
                  }
                  else if ( e.startsWith( 'Addition' ) )
                  {
                    content[ i ] = e.replace( 'Addition', '+' );
                  } if ( e.startsWith( 'Deletion' ) )
                  {
                    content[ i ] = e.replace( 'Deletion', '-' );
                  }
                }
              );

              return (
                <Card
                  key={ n }
                  className='my-4'
                >
                  <Card.Header className='d-flex flex-row'>
                    { /* File path. */}
                    <span className='me-2'>{ n }</span>
                    <OverlayTrigger
                      placement='top'
                      overlay={ tooltip }
                    >
                      <Button
                        className='d-flex align-items-center p-1 btn-transparent'
                        onMouseEnter=
                        { () =>
                          setTooltipValue( 'Copy file name to clipboard' )
                        }
                        onClick=
                        { () =>
                          copyToClipboard( n )
                        }
                      >
                        <BsCopy />
                      </Button>
                    </OverlayTrigger>
                  </Card.Header>
                  <Card.Body className='p-0'>
                    { /* Syntax Highilghter. */ }
                    <SyntaxHighlighter
                      showLineNumbers
                      language='diff'
                      style={ vs2015 }
                      customStyle={ { marginBottom: '0px' } }
                    >
                      { commit.diff[ n ].join( '\n' ) }
                    </SyntaxHighlighter>
                  </Card.Body>
                </Card>
              )
            }
          )
        }
      </Container>
    </>
  )
}

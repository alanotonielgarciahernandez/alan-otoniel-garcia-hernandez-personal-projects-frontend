// CommitsPage.jsx
// Displays a paginated list of the project commits grouped by its date.

import { useState } from 'react';

// Import third-party components.
import { Accordion, Button, Card, Col, Container, ListGroup, OverlayTrigger, Row, Spinner, Tooltip, useAccordionButton } from 'react-bootstrap';
import { LuGitCommitHorizontal } from 'react-icons/lu';
import { BsCode, BsCopy } from 'react-icons/bs';
import { PiDotsThreeFill } from 'react-icons/pi';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

// Import custom component.
import { useFetchCommits } from '../hooks/useFetchCommits';
import { BranchListing } from '../components/BranchListing';

export const CommitsPage = () =>
{
  // Get route navigator and route parameters.
  const navigate = useNavigate();
  const { proj } = useLoaderData();
  const [ searchParams, setSearchParams ] = useSearchParams( { page: '1' } );
  const [ tooltipValue, setTooltipValue ] = useState( 'Copy full SHA' );

  // Backend petition.
  const { project, isLoading } = useFetchCommits( `projects ( page: 1 filter: { keyword: "${ proj }" } ) { images { logo } name { original } defaultBranch { name } commitCount issueCount } branches( page: 1 project: "${ proj ?? '' }" ) { name } commits( page: ${ searchParams.get( 'page' ) } project: "${ proj ?? '' }" ) { hash date message } tags( page: 1 project: "${ proj ?? '' }" ) { name }` );

  // Copy to device clipboard function.
  const copyToClipboard = value =>
  {
    const data = [ new ClipboardItem( { [ 'text/plain' ]: value } ) ];
    navigator.clipboard.write( data );
    
    setTooltipValue( 'Copied to clipboard!' );
  }

  // Tooltip for clipboard button.
  const clipboardTooltip = props => <Tooltip { ...props }>{ tooltipValue }</Tooltip>

  // Tooltip for commit tree button.
  const codeTooltip = props => <Tooltip { ...props }>Browse project at this point</Tooltip>

  // Tooltip for commit button
  const commitTooltip = props => <Tooltip { ...props }>View commit details</Tooltip>

  // Tooltip for expand message button.
  const descriptionTooltip = ( commitId, props ) => <Tooltip { ...props }>Show description for { commitId }</Tooltip>

  // Message button.
  const CustomToggle = ( { commit, eventKey } ) =>
  {
    // Get accordion button hook.
    const onClick = useAccordionButton( eventKey, () => {} )

    return <>
      <a
        className='commit-link me-1'
        onClick=
        { () =>
          navigate( `/${ proj }/commit/${ commit.hash }` )
        }
      >
        { commit.message[ 0 ] }
      </a>
      {
        // If message is long, display an expand button.
        commit.message.length > 1
        ?
        <OverlayTrigger
          placement='top'
          overlay={ descriptionTooltip( commit.hash.slice( 0, 7 ) ) }
        >
          <Button
            className='btn-transparent text-body-secondary p-1'
            onClick={ onClick }
          >
            <PiDotsThreeFill />
          </Button>
        </OverlayTrigger>
        : <></>
      }
    </>
  }

  return (
    // Render when data is loaded.
    isLoading
    ?
    <div className='d-flex w-100 justify-content-center p-4'>
      <Spinner />
    </div>
    :
    <Container className='py-4'>
      <span className='fs-4'>Commits</span>
      <hr />
      <BranchListing className='mb-2' />
      <Container>
        {
          // Group commits by date.
          Object.keys( project.references.commits ).map(
            k =>
            {

              return <div key={ k }>
                <div className='d-flex align-items-center flex-row text-secondary'>
                  <LuGitCommitHorizontal size='32px' className='me-2' />
                  <span>Commits on { k }</span>
                </div>
                <div className='d-flex flex-row'>
                  <div className='d-flex mx-3'>
                    <div className='vr' />
                  </div>
                  <Card className='outlined w-100'>
                    <ListGroup variant='flush'>
                      {
                        // Build a button for every commit.
                        project.references.commits[ k ].map(
                          c =>
                          {
                            return (
                              <ListGroup.Item
                                key={ c.hash }
                                className='list-group-commit'
                              >
                                <Row>
                                  <Col className='d-flex align-items-center'>
                                    <Accordion>
                                      { /* Commit message. */ }
                                      <CustomToggle eventKey={ c.hash } commit={ c } />
                                      <Accordion.Collapse eventKey={ c.hash }>
                                        <span
                                          className='text-body-secondary font-monospace'
                                          style={ { fontSize: '0.75rem', whiteSpace: 'pre-line' } }
                                        >
                                          { c.message.slice( 1 ).join( '\n' ) }
                                        </span>
                                      </Accordion.Collapse>
                                    </Accordion>
                                  </Col>
                                  <Col className='d-flex flex-row justify-content-end'>
                                    { /* Commit short hash button redirecting to commit details. */ }
                                    <OverlayTrigger
                                      placement='top'
                                      overlay={ commitTooltip }
                                    >
                                      <Button
                                        className='btn-transparent d-flex align-items-center me-2'
                                        onClick=
                                        {
                                          () =>
                                          navigate( `/${ proj }/commit/${ c.hash }` )
                                        }
                                      >
                                        <span className='text-body-secondary'>{ c.hash.slice( 0, 7 ) }</span>
                                      </Button>
                                    </OverlayTrigger>
                                    { /* Clipboard button. */ }
                                    <OverlayTrigger
                                      placement='top'
                                      overlay={ clipboardTooltip }
                                    >
                                      <Button
                                        className='btn-transparent d-flex align-items-center me-2'
                                        onMouseLeave=
                                        { () =>
                                          setTooltipValue( 'Copy full SHA' )
                                        }
                                        onClick=
                                        { () =>
                                          copyToClipboard( c.hash )
                                        }
                                      >
                                        <BsCopy className='text-body-secondary' />
                                      </Button>
                                    </OverlayTrigger>
                                    { /* Commit tree button. */ }
                                    <OverlayTrigger
                                      placement='top'
                                      overlay={ codeTooltip }
                                    >
                                      <Button
                                        className='btn-transparent d-flex align-items-center'
                                        onClick=
                                        { () =>
                                          navigate( `/${ proj }/${ c.hash }` )
                                        }
                                      >
                                        <BsCode className='text-body-secondary' />
                                      </Button>
                                    </OverlayTrigger>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            )
                          }
                        )
                      }
                    </ListGroup>
                  </Card>
                </div>
              </div>
            }
          )
        }
      </Container>
      <Container className='d-flex justify-content-center mt-3'>
        { /* Pagination buttons. */ }
        <Button
          className='btn-transparent'
          disabled={ searchParams.get( 'page' ) == '1' }
          onClick=
          { () =>
            setSearchParams( { page: parseInt( searchParams.get( 'page' ) ) - 1 } )
          }
        >
          Previous
        </Button>
        {
          isLoading
          ? <></>
          :
          <Button
            className='btn-transparent'
            disabled={ parseInt( searchParams.get( 'page' ) ) * 10 >= project.data.commitCount }
            onClick=
            { () =>
              setSearchParams( { page: parseInt( searchParams.get( 'page' ) ) + 1 } )
            }
          >
            Next
          </Button>
        }
      </Container>
    </Container>
  )
}

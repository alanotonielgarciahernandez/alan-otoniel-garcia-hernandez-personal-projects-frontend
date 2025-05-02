// TagsPage.jsx
// Displays a list of tags.

// Import third-party components.
import { Accordion, Button, Card, Container, Image, ListGroup, OverlayTrigger, Spinner, Tooltip, useAccordionButton } from 'react-bootstrap';
import { BsClock, BsTag } from 'react-icons/bs';
import { LuFile, LuGitCommitHorizontal } from 'react-icons/lu';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { GoFileZip } from 'react-icons/go';
import { PiDotsThreeFill } from 'react-icons/pi';

// Import custom component.
import { useFetchProject } from '../hooks/useFetchProject';
import { useFetchArchive } from '../hooks/useFetchArchive';

export const TagsPage = () =>
{
  // Get route navigator and parameters.
  const navigate = useNavigate();
  const { proj } = useLoaderData();
  const [ searchParams, setSearchParams ] = useSearchParams( { page: '1' } );
  
  // File download function.
  const onFileDownload = useFetchArchive();

  // Backend petition.
  const { project, isLoading } = useFetchProject( `projects ( page: 1 filter: { keyword:"${ proj }" } ) { images { logo } name { original } defaultBranch { name } tagCount issueCount } tags( page: 1 project: "${ proj ?? '' }" ) { hash name date message }` );

  // Pagination handle function.
  const onPageChange = ( value ) =>
  {
    setSearchParams( { page: parseInt( searchParams.get( 'page' ) ) + value } );
  }

  // Display commit message button.
  const CustomToggle = ( { tag, eventKey } ) =>
  {
    const onClick = useAccordionButton( eventKey, () => {} )

    return <Container className='d-flex align-items-center p-0'>
      <a
        className='tag-link fs-5 me-1'
        onClick=
        { () =>
          navigate( `/${ proj }/releases/tag/${ tag.name }` )
        }
      >
        { tag.name }
      </a>
      <OverlayTrigger
        placement='top'
        overlay=
        {
          <Tooltip>
            Toggle { tag.name }'s commit message
          </Tooltip>
        }
      >
        <Button
          className='btn-transparent text-body-secondary p-1'
          onClick={ onClick }
        >
          <PiDotsThreeFill />
        </Button>
      </OverlayTrigger>
    </Container>
  }

  return (
    <Container className='py-4'>
      <Card>
        <Card.Header>
          <BsTag />
          <span>Tags</span>
        </Card.Header>
        <Card.Body className='p-0'>
          <ListGroup variant='flush'>
            {
              // Render when data is loaded.
              isLoading
              ? <Spinner />
              : project.references.tags < 1
              ? <Container className='d-flex flex-column align-items-center py-3'>
                <Image
                  src='/not-found.svg'
                  height='250px'
                />
                  <span>There are no tags in this project.</span>
                </Container>
              :
              // Build a button for every project tag.
              project.references.tags.map( ( t ) =>
              {
                const tagDate = new Date( t.date )

                return (
                  <ListGroup.Item
                    key={ t.hash }
                    className='d-flex flex-column'
                  >
                    <Accordion>
                      { /* Tag title. */ }
                      <CustomToggle eventKey={ t.hash } tag={ t } />
                      <Accordion.Collapse eventKey={ t.hash }>
                        <span
                          className='text-body-secondary font-monospace'
                          style={ { fontSize: '0.75rem', whiteSpace: 'pre-line' } }
                        >
                          { t.message.join( '\n' ) }
                        </span>
                      </Accordion.Collapse>
                    </Accordion>
                    <div className='d-flex flex-row'>
                      <div className='text-body-secondary me-2'>
                        { /* Tag date created. */ }
                        <BsClock className='me-1' />
                        <span>on { tagDate.toLocaleString( 'default', { month: 'short' } ) } { tagDate.getDate() }</span>
                      </div>
                      <a
                        // Commit redirecting button.
                        className='link me-2'
                        onClick=
                        { () =>
                          navigate( `/${ proj }/commit/${ t.hash }` )
                        }
                      >
                        <LuGitCommitHorizontal className='me-1' />
                        <span>{ t.hash.slice( 0, 7 ) }</span>
                      </a>
                      <a
                        // ZIP file download button.
                        className='link me-2'
                        onClick=
                        { () =>
                          onFileDownload(
                            {
                              Project: proj,
                              Reference: t.name,
                              Extension: 'zip'
                            }
                          )
                        }
                      >
                        <GoFileZip className='me-1' />
                        <span>zip</span>
                      </a>
                      <a
                        // TAR.GZ file download button.
                        className='link me-2'
                        onClick=
                        { () =>
                          onFileDownload(
                            {
                              Project: proj,
                              Reference: t.name,
                              Extension: 'tar.gz'
                            }
                          )
                        }
                      >
                        <GoFileZip className='me-1' />
                        <span>tar.gz</span>
                      </a>
                      {
                        // Render note button if there are tag notes.
                        !t.note
                        ? <></>
                        :
                        <a
                          className='link me-2'
                          onClick=
                          { () =>
                            navigate( `/${ proj }/releases/${ t.name }` )
                          }
                        >
                          <LuFile className='me-1' />
                          <span>Notes</span>
                        </a>
                      }
                    </div>
                  </ListGroup.Item>
                )
              } )
            }
          </ListGroup>
        </Card.Body>
      </Card>

      <Container className='d-flex justify-content-center mt-3'>
        { /* Pagination buttons. */ }
        <Button
          className='btn-transparent'
          disabled={ searchParams.get( 'page' ) == '1' }
          onClick=
          { () =>
            onPageChange( -1 )
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
            disabled={ parseInt( searchParams.get( 'page' ) ) * 10 >= project.data.tagCount }
            onClick=
            { () =>
              onPageChange( 1 )
            }
          >
            Next
          </Button>
        }
      </Container>
    </Container>
  )
}

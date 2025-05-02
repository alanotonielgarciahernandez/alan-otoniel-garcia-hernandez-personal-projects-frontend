// ReleaseNotesPage.jsx
// Displays the notes of a project tag.

// Import third-party components.
import { Breadcrumb, BreadcrumbItem, Card, Container, ListGroup } from 'react-bootstrap';
import { BsClock, BsTag } from 'react-icons/bs';
import { GoFileZip } from 'react-icons/go';
import { LuGitCommitHorizontal } from 'react-icons/lu';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Import custom component.
import { useFetchProject } from '../hooks/useFetchProject';
import { useFetchArchive } from '../hooks/useFetchArchive';

export const ReleaseNotesPage = () =>
{
  const navigate = useNavigate();
  const { proj, ref } = useLoaderData();
  const { project, isLoading } = useFetchProject( `projects ( page: 1 filter: { keyword: "${ proj ?? '' }" } ) { images { logo } name { original } defaultBranch { name } issueCount } release ( project: "${ proj }" reference: "${ ref }" ) { date hash message }` );

  const onFileDownload = useFetchArchive();

  return (
    <Container className='my-3'>
      <Breadcrumb className='mb-3'>
        <BreadcrumbItem>Releases</BreadcrumbItem>
        <BreadcrumbItem>{ ref }</BreadcrumbItem>
      </Breadcrumb>

      {
        isLoading
        ? <></>
        :
        <Card>
          <Card.Body>
            <span className='fs-2'>{ ref }</span>
            <div className='d-flex flex-row'>
              <div className='me-4'>
                <BsClock className='me-2' />
                <span>{ new Date( project.release.date ).toLocaleDateString() }</span>
              </div>
              <a
                className='tag-link me-4'
                onClick=
                { () =>
                  navigate( `/${ proj }/${ ref }` )
                }
              >
                <BsTag className='me-2' />
                <span>{ ref }</span>
              </a>
              <a
                className='tag-link me-4'
                onClick=
                { () =>
                  navigate( `/${ proj }/commit/${ project.release.hash }` )
                }
              >
                <LuGitCommitHorizontal className='me-2' />
                <span>{ project.release.hash.slice( 0, 7 ) }</span>
              </a>
            </div>
            <hr />
            <span style={ { whiteSpace: 'pre-line' } } >{ project.release.message.join( '\n' ) }</span>
          </Card.Body>
          <Card.Footer>
            <ListGroup>
              <span className='fs-2 mb-2'>Assets</span>
              <ListGroup.Item className='d-flex align-items-center'>
                <GoFileZip />
                <a
                  className='file-link'
                  onClick=
                  { () =>
                    onFileDownload(
                      {
                        Project: proj,
                        Reference: ref,
                        Extension: 'zip'
                      }
                    )
                  }
                >
                  Source Code (zip)
                </a>
              </ListGroup.Item>
              <ListGroup.Item className='d-flex align-items-center'>
                <GoFileZip />
                <a
                  className='file-link'
                  onClick=
                  { () =>
                    onFileDownload(
                      {
                        Project: proj,
                        Reference: ref,
                        Extension: 'tar.gz'
                      }
                    )
                  }
                >
                  Source Code (tar.gz)
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Card.Footer>
        </Card>
      }
    </Container>
  )
}

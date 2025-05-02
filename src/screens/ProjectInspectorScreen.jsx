// ProjectInspectorScreen.jsx
// Screen displaying files tree and entry content.

// Import third-party components.
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

// Import custom components.
import { BranchListing, FilesTree } from '../components';
import { useFetchProject } from '../hooks/useFetchProject';
import { BlobPage, TreePage } from '../pages';

export const ProjectInspectorScreen = () =>
{
  // Get route segments.
  const { proj, typ } = useLoaderData();

  // Backend petition.
  const { project, isLoading } = useFetchProject( `projects( page: 1 filter:{ keyword:"${ proj }" } ) { id description defaultBranch { hash name } branchCount tagCount commitCount images { background logo } issueCount language name { display original } technologies url } branches( page: 1 project: "${ proj }" ) { name } tags( page: 1 project: "${ proj }" ) { name }` );

  return (
    <Container fluid className='py-4'>
      {
        // Render after data is loaded.
        isLoading
        ? <></>
        :
        <Row>
          { /* First column. */ }
          <Col xs='2' className='border-end'>
            { /* Branch listing dropdown button. */ }
            <BranchListing className='mb-2' references={ project.references } />

            { /* Files tree based on the current reference. */ }
            <FilesTree />
          </Col>
          <Col>
            {
              // Content displayed based on the target entry.
              typ === 'blob'
              ? <BlobPage />
              : <TreePage />
            }
          </Col>
        </Row>
      }
    </Container>
  )
}


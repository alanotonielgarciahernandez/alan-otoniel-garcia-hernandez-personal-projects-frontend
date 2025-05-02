// NavbarSearchButton.jsx
// Search button to explore all the available projects.

import { memo, useState } from 'react';

// Import third-party components.
import { Button, Form, Modal } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// Import custom component.
import { useForm } from '../hooks/useForm';

export const NavbarSearchButton = memo(
  () =>
  {
    const navigate = useNavigate();
    const [ searchBar, setSearchBar ] = useState( false );
    
    const { searchQuery, onInputChange, onFormReset } = useForm
    (
      {
        searchQuery: '',
      }
    );

    const onNavigate = newRoute =>
    {
      onFormReset();
      setSearchBar( false );
      navigate( newRoute );
    }
    
    return (
      <>
        { /* Navbar Search Button */ }
        <Button
          className='btn-search d-flex align-items-center'
          onClick=
          { () =>
            {
              setSearchBar( true );
            }
          }
          active
          >
          <BsSearch />
          <span className='d-none d-xl-flex ms-2'>Search for a project...</span>
        </Button>
        
        { /* Project Search Overlay */ }
        <Modal
          show={ searchBar }
          onHide=
          { () =>
            {
              setSearchBar( false );
            }
          }
          size='lg'
        >
          <Modal.Body>
            <Form.Control
              autoFocus
              name='searchQuery'
              size='sm'
              className='form-search'
              value={ searchQuery }
              onChange={ onInputChange }
            />
            <hr/>
            {
              searchQuery.length > 0
              ?
              <>
                <Button
                  className='btn-transparent d-flex align-items-center mb-2'
                  style={ { minWidth:'100%', textAlign:'start' } }
                  onClick=
                  { () =>
                    {
                      onNavigate( 'explore?search=' + searchQuery );
                    }
                  }
                  >
                  <BsSearch className='me-2' />
                  <span>{ searchQuery }</span>
                </Button>
              </>
              : <></>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button
              className='btn-transparent m-0'
              style={ { minWidth:'100%', textAlign:'start' } }
              onClick=
              { () =>
                {
                  onNavigate( 'explore' );
                }
              }
              >
              <span>Explore all projects</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
);
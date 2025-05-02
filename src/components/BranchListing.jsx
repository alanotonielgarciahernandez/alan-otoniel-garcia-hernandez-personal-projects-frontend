// BranchListing.jsx
// Dropdown button displaying a list of project branches and tags.

import { useContext, useState } from 'react';

// Import third-party components.
import PropTypes from 'prop-types';
import { Dropdown, Form, ListGroup, Tab, Tabs } from 'react-bootstrap';
import { FaCodeBranch } from 'react-icons/fa6';
import { LuCheck, LuTag } from 'react-icons/lu';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

// Import custom components.
import { ProjectContext } from '../context/ProjectContext';
import { useForm } from '../hooks/useForm';

export const BranchListing = ( { className } ) =>
{
  // Get route navigator, project context variables, subject state and route parameters.
  const navigate = useNavigate();
  const { project } = useContext( ProjectContext );
  const [ subject, setSubject ] = useState( '0' );
  const location = useLocation();
  const { ref } = useLoaderData();

  const onNavigate = newReference =>
  {
    var route = location.pathname;

    if ( route.includes( ref ) )
    {
      route = route.replace( ref, newReference );
    }
    else
    {
      route += '/' + newReference;
    }

    navigate( route );
  }

  // Form state.
  const { searchQuery, onInputChange } = useForm(
    {
      searchQuery: '',
    }
  );

  // Transform singular text into plural.
  const getSubjectName = ( plural = false ) =>
  {
    switch( subject )
    {
      case '0':
        if ( plural ) return 'branches';
        else return 'branch';
      case '1':
        if ( plural ) return 'tags';
        else return 'tag';
    }
  }

  return (
    <Dropdown className={ className }>
      <Dropdown.Toggle
        // Dropdown button containing the current reference displayed.
        size='sm'
        variant='secondary'
        className='d-flex align-items-center'
      >
        {
          subject == 1
          ? <LuTag className='me-2' />
          : <FaCodeBranch className='me-2' />
        }
          <span
            className='text-truncate'
            style={ { maxWidth: '200px' } }
          >
            { ref ?? project.data.defaultBranch.name }
          </span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        // Menu displaying the list of the selected reference type.
        align='start'
        className='px-2'
        style={ { width: '300px' } }
      >
        <Dropdown.ItemText className='mb-2'>
          Switch between branches or tags
        </Dropdown.ItemText>
        <Form.Control
          // Searchbar to look for a specific reference.
          size='sm'
          name='searchQuery'
          className='form-search'
          placeholder={ `Find a ${ getSubjectName() }...` }
          value={ searchQuery }
          onChange={ onInputChange }
        />
        <Dropdown.Divider></Dropdown.Divider>
        <Tabs
          className='mb-2'
          onSelect={ setSubject }
        >
          <Tab
            // Branches tab.
            eventKey='0'
            title='Branches'
          >
            <ListGroup variant='flush'>
              {
                // Builds a button for every project branch.
                project.references.branches.map(
                  br =>
                  {
                    if ( searchQuery && !br.name.toLowerCase().includes( searchQuery.toLowerCase() ) ) return;

                    return (
                      <ListGroup.Item
                        key={ br.name }
                        action
                        className='list-group-item-branch d-flex align-items-center p-1'
                        onClick=
                        { () =>
                          onNavigate( br.name )
                        }
                      >
                        {
                          // If the branch is equal to the current displaying reference mark a check.
                          !ref
                          ? br.name == project.data.defaultBranch.name
                            ? <LuCheck />
                            : <div className='me-3' />
                          :
                          br.name == ref
                          ? <LuCheck />
                          : <div className='me-3' />
                        }
                        <span>{ br.name }</span>
                      </ListGroup.Item>
                    )
                  }
                )
              }
            </ListGroup>
          </Tab>
          <Tab
            // Tags tab.
            eventKey='1'
            title='Tags'
          >
            <ListGroup variant='flush'>
              {
                // Check if there are tags on the project.
                project.references.tags.length == 0
                ?
                <span className='d-flex justify-content-center text-secondary fw-bold'>There are no tags.</span>
                :
                // Builds a button for every project tag.
                project.references.tags.map(
                  t =>
                  {
                    if ( searchQuery )
                    {
                      if ( !t.name.toLowerCase().includes( searchQuery.toLowerCase() ) ) return;
                    }

                    return (
                      <ListGroup.Item
                        key={ t.name }
                        action
                        className='list-group-item-branch d-flex align-items-center p-1'
                        onClick=
                        { () =>
                          onNavigate( t.name )
                        }
                      >
                        {
                          // If the tag is equal to the current displaying reference mark a check.
                          t.name == ref
                          ? <LuCheck />
                          : <div className='ms-3' />
                        }
                        <span>{ t.name }</span>
                      </ListGroup.Item>
                    )
                  }
                )
              }
            </ListGroup>
          </Tab>
        </Tabs>
        <Dropdown.Divider></Dropdown.Divider>
        <Dropdown.Item
          // Button redirecting to <BranchesPage /> or <TagsPage /> depending on the active tab.
          onClick=
          { () =>
            navigate( getSubjectName( subject ) )
          }
          className='rounded'
        >
          <span>View all { getSubjectName( subject ) }</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

BranchListing.propTypes =
{
  className: PropTypes.string
}


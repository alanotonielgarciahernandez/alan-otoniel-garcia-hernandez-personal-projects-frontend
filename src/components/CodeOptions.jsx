// CodeOptions.jsx
// Dropdown button displaying downloading options.

import { useContext, useRef, useState } from 'react';

// Import third-party components.
import { Button, Dropdown, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsClipboard, BsCode, BsFileEarmarkZip } from 'react-icons/bs';

// Import custom components.
import { ProjectContext } from '../context/ProjectContext';
import { useFetchArchive } from '../hooks/useFetchArchive';
import { useLoaderData } from 'react-router-dom';

export const CodeOptions = () =>
{
  // Get project context variables, state of clipboard tooltip.
  const { project } = useContext( ProjectContext );
  const { proj, ref } = useLoaderData();
  const [ tooltipValue, setTooltipValue ] = useState( 'Copy URL to clipboard' );
  const onFileDownload = useFetchArchive();  

  const clipboard = useRef();
  
  // Copy to device clipboard function.
  const copyToClipboard = () =>
  {
    const data = [ new ClipboardItem( { [ 'text/plain' ]: clipboard.current.value } ) ];
    navigator.clipboard.write( data );
    
    setTooltipValue( 'Copied to clipboard!' );
  }

  // Tooltip for clipboard button.
  const clipboardTooltip = props => <Tooltip { ...props }>{ tooltipValue }</Tooltip>

  // Download project compressed file.
  
    
  return (
    <Dropdown>
      <Dropdown.Toggle
        // Dropdown button.
        size='sm'
        variant='success'
        className='d-flex align-items-center'
      >
        <BsCode className='me-2' />
        <span>Code</span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        // Dropdown menu displaying git repository path and download button.
        align='end'
        className='px-2'
        style={ { width: '300px' } }
      >
        <Form.Label>Clone using WEB URL</Form.Label>
        <InputGroup
          // Copy to clipboard row.
          size='sm'
          className='mb-3'
        >
          <OverlayTrigger
            // Button tooltip.
            placement='top'
            overlay={ clipboardTooltip }
          >
            <Button
              // Clipboard button.
              variant='outline'
              className='d-flex align-items-center'
              onClick={ copyToClipboard }
              onMouseLeave=
              {
                () =>
                setTooltipValue( 'Copy URL to clipboard' )
              }
            >
              <BsClipboard />
            </Button>
          </OverlayTrigger>
          <Form.Control
            // Git repository path.
            className='text-truncate'
            ref={ clipboard }
            type='text'
            value={ project.data.url }
            readOnly
          />
        </InputGroup>
        <Dropdown.Divider />
        <Dropdown.Item
          // Download button.
          className='d-flex align-items-center rounded'
          onClick={ () =>
            onFileDownload(
            {
              Project: proj,
              Reference: ref ?? project.data.defaultBranch.name,
              Extension: 'zip'
            }
          ) }
        >
          <BsFileEarmarkZip className='me-2' />
          <span>Download ZIP</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
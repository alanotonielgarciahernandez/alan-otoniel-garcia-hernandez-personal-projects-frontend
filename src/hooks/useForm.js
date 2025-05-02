// useForm.js
// Custom hook handling necessary form functions.

import { useState } from 'react';

export const useForm = ( initialForm = {} ) =>
{
  
  const [ formState, setFormState ] = useState( initialForm );

  // Handles every keyboard input.
  const onInputChange = ( { target } ) =>
  {
    const { name, value } = target;

    setFormState
    ( 
      {
        ...formState,
        [ name ]: value,
      }
    );
  }

  // Resets the form to its initial form.
  const onFormReset = () => 
  {
    setFormState( initialForm );
  }

  return {
    ...formState,
    onInputChange,
    onFormReset,
  }
}


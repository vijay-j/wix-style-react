import React from 'react';
import {Autocomplete as BOAutocomplete} from 'wix-ui-backoffice/Autocomplete';
import {default as OldAutocomplete} from '../Deprecated/AutoComplete';
import {string} from 'prop-types';

const Autocomplete = props => {
  if (props.theme === 'amaterial') {
    return <OldAutocomplete {...props}/>;
  }

  return <BOAutocomplete {...props}/>;
};

Autocomplete.createOption = BOAutocomplete.createOption;
Autocomplete.createDivider = BOAutocomplete.createDivider;
Autocomplete.propTypes = {
  theme: string,
  ...BOAutocomplete.propTypes
};

export default Autocomplete;

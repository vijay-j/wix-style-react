import React from 'react';
import {children, optional, once} from '../';
import Label from '../../Label';
import Autocomplete from '../../AutoComplete';
import InputAreaWithLabelComposite from '../InputAreaWithLabelComposite/InputAreaWithLabelComposite';

const AutocompleteComposite = ({...props, children}) => (
  <InputAreaWithLabelComposite {...props}>
    {children}
  </InputAreaWithLabelComposite>
);

AutocompleteComposite.propTypes = {
  children: children(optional(Label), once(Autocomplete))
};

AutocompleteComposite.displayName = 'AutocompleteComposite';

export default AutocompleteComposite;

import inputAreaWithLabelCompositeDriverFactory from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite.driver';
import dropdownDriverFactory from '../Dropdown/Dropdown.driver';

const dropdownCompositeDriverFactory = ({element, wrapper}) => {
  const dropdown = element && Array.from(element.childNodes).slice(-1)[0];

  return {
    ...inputAreaWithLabelCompositeDriverFactory({element, wrapper}),
    ...dropdownDriverFactory({element: dropdown, wrapper: dropdown})
  };
};

export default dropdownCompositeDriverFactory;

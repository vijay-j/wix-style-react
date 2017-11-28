const testComponentDriverFactory = component => ({
  click: () => component.click(),
  getLabel: () => component.$(`label`),
  getInput: () => component.$(`input`),
  isChecked: () => component.$(`input`).isSelected(),
  isDisabled: () => !!component.$(`input`).getAttribute('disabled'),
  element: () => component
});

export default testComponentDriverFactory;

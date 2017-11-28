# TestComponent Testkits

> TestComponent

## TestComponent TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| getInput | - | element | returns testComponent input element |
| getLabel | - | element | returns testComponent label element |
| isChecked | - | bool | fulfilled if element has class '.checked' |
| isDisabled | - | bool | fulfilled if element has class '.disabled' |
| isIndeterminate | - | bool | fulfilled if element has class '.indeterminate' |
| click | - | - | clicks on the testComponent |
| exists (Only in Unit Test) | - | bool | fulfilled if element in the DOM |
| element (Only in E2E) | - | element | returns the driver element |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {testComponentTestkitFactory} from 'wix-style-react/dist/testkit';
  import {testComponentTestkitFactory as enzymeTestComponentTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><TestComponent dataHook={dataHook}/></div>);
  const testkit = enzymeTestComponentTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><TestComponent dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = testComponentTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```
> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <TestComponent dataHook='myDataHook'/>

  /*******************
   protractor example
  *******************/

  import {testComponentTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = testComponentTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find TestComponent')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });
```

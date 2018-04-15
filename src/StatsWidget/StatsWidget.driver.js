import React from 'react';
import ReactDOM from 'react-dom';
import dropdownLayoutDriver from '../ButtonWithOptions/ButtonWithOptions.driver';
import headerDriverFactory from '../Card/Header/Header.driver';

const byHook = (wrapper, hook) => wrapper.querySelector(`[data-hook="${hook}"]`);

const statsWidgetDriverFactory = ({element, wrapper, component}) => {
  const getStatistic = index => byHook(element, 'stats-widget-content-wrapper').childNodes[index];

  const headerElement = byHook(element, 'stats-widget-title');

  const headerDriver = headerDriverFactory({wrapper: element, element: headerElement});

  const driver = {
    exists: () => !!element,

    titleText: () => headerDriver.title(),

    isStatisticsContentExists: () => !!byHook(element, 'stats-widget-content-wrapper'),

    isEmptyStateExists: () => !!byHook(element, 'stats-widget-empty-state'),

    getStatisticTitle: index => byHook(getStatistic(index), 'statistics-item-title').textContent,

    getStatisticSubTitle: index => byHook(getStatistic(index), 'statistics-item-subtitle').textContent,

    getStatisticPercentValue: index => byHook(getStatistic(index), 'percent-value').textContent,

    getStatisticPercentClass: index => byHook(getStatistic(index), 'percent-wrapper').className,

    getFilterDriver: dataHook => {
      const optionElement = byHook(element, dataHook);
      return dropdownLayoutDriver({wrapper: element, element: optionElement});
    },

    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };

  return driver;
};

export default statsWidgetDriverFactory;

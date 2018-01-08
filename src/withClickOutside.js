'use strict';
import reject from 'lodash/reject';
import forEach from 'lodash/forEach';
import assign from 'lodash/assign';
import isElement from 'lodash/isElement';
import uniqueId from 'lodash/uniqueId';
import React from 'react';
import ReactDOM from 'react-dom';

const listeners = {};
let initialized = false;

const onClickOutside = e => {
  forEach(listeners, listener => {
    const isClickInside = isElement(e.target) && listener.node.contains(e.target);
    if (!isClickInside) {
      listener.method(e);
    }
  });
};


const withClickOutside = Component => {

  class ClickOutside extends React.Component {
    constructor(props) {
      super(props);
      this.callbacks = [];
      this.registerOnClickOutside = (method, node) => {
        const id = uniqueId();
        this.callbacks.push(assign({method, id}, node ? {node} : {}));
        return id;
      };

      this.clearOnClickOutside = id => {
        this.callbacks = reject(this.callbacks, {id});
        delete listeners[id];
      };

      this.createListeners = () => {
        const rootNode = ReactDOM.findDOMNode(this); //eslint-disable-line react/no-find-dom-node
        forEach(this.callbacks, callback => {
          listeners[callback.id] = assign({node: rootNode}, callback);
        });
      };

      this.initialize = () => {
        if (!initialized) {
          window.addEventListener('click', onClickOutside, true);
          initialized = true;
        }
      };
    }

    componentDidMount() {
      this.initialize();
      this.createListeners();
    }

    componentWillUnmount() {
      forEach(this.callbacks, callback => {
        delete listeners[callback.id];
      });
    }

    render() {
      const props = assign({}, this.props, {
        onClickOutside: this.registerOnClickOutside,
        clearOnClickOutside: this.clearOnClickOutside
      });
      return React.createElement(Component, props);
    }
  }
  return ClickOutside;
};

export default withClickOutside;

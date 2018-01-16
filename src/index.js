import { StyleSheet } from 'react-native';

var properties = require('./css-properties.js');
var PropTypes = require('prop-types');

module.exports = function(props, propName, componentName) {
  var styles = props[propName];
  if (!styles) {
    return;
  }

  /* Resolve ID-to-object mapping issue under Windows build */
  if (typeof styles === 'number') {
      styles = StyleSheet.flatten(styles)
  }

  var failures = [];
  Object.keys(styles).forEach(function(styleKey){
    if (properties.indexOf(styleKey) === -1) {
      failures.push(styleKey);
    }
  });
  if (failures.length) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
  }
};

module.exports.isRequired = function(props, propName, componentName) {
  if (!props[propName]) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
  }
  return module.exports(props, propName, componentName);
};

module.exports.supportingArrays = PropTypes.oneOfType([
  PropTypes.arrayOf(module.exports),
  module.exports
]);

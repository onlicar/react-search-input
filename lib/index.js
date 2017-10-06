'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      searchTerm: _this.props.value || ''
    };
    _this.updateSearch = _this.updateSearch.bind(_this);
    _this.clear = _this.clear.bind(_this);
    _this.filter = _this.filter.bind(_this);
    return _this;
  }

  _createClass(Search, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
        var e = {
          target: {
            value: nextProps.value
          }
        };
        this.updateSearch(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          onChange = _props.onChange,
          onClear = _props.onClear,
          caseSensitive = _props.caseSensitive,
          sortResults = _props.sortResults,
          _props$clearable = _props.clearable,
          clearable = _props$clearable === undefined ? false : _props$clearable,
          throttle = _props.throttle,
          filterKeys = _props.filterKeys,
          value = _props.value,
          fuzzy = _props.fuzzy,
          InputComponent = _props.inputComponent,
          inputClassName = _props.inputClassName,
          inputProps = _objectWithoutProperties(_props, ['className', 'onChange', 'onClear', 'caseSensitive', 'sortResults', 'clearable', 'throttle', 'filterKeys', 'value', 'fuzzy', 'inputComponent', 'inputClassName']); // eslint-disable-line no-unused-vars


      inputProps.type = inputProps.type || 'search';
      inputProps.value = this.state.searchTerm;
      inputProps.onChange = this.updateSearch;
      inputProps.className = inputClassName;
      inputProps.placeholder = inputProps.placeholder || 'Search';
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(InputComponent, inputProps),
        value && clearable && _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.clear,
            className: 'react-search-input--clearable'
          },
          _react2.default.createElement(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '12',
              height: '12',
              viewBox: '-6 -6 12 12'
            },
            _react2.default.createElement('circle', { fill: '#CCC', r: '6' }),
            _react2.default.createElement('line', {
              fill: 'none',
              stroke: '#FFF',
              strokeWidth: '.667',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              x1: '2',
              y1: '-2',
              x2: '-2',
              y2: '2'
            }),
            _react2.default.createElement('line', {
              fill: 'none',
              stroke: '#FFF',
              strokeWidth: '.667',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              x1: '-2',
              y1: '-2',
              x2: '2',
              y2: '2'
            })
          )
        )
      );
    }
  }, {
    key: 'updateSearch',
    value: function updateSearch(e) {
      var _this2 = this;

      var searchTerm = e.target.value;
      this.setState({
        searchTerm: searchTerm
      }, function () {
        if (_this2._throttleTimeout) {
          clearTimeout(_this2._throttleTimeout);
        }

        _this2._throttleTimeout = setTimeout(function () {
          return _this2.props.onChange(searchTerm);
        }, _this2.props.throttle);
      });
    }
  }, {
    key: 'filter',
    value: function filter(keys) {
      var _props2 = this.props,
          filterKeys = _props2.filterKeys,
          caseSensitive = _props2.caseSensitive,
          fuzzy = _props2.fuzzy,
          sortResults = _props2.sortResults;

      return (0, _util.createFilter)(this.state.searchTerm, keys || filterKeys, {
        caseSensitive: caseSensitive,
        fuzzy: fuzzy,
        sortResults: sortResults
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (typeof this.props.onClear == 'function') {
        this.props.onClear();
      }
    }
  }]);

  return Search;
}(_react.Component);

Search.defaultProps = {
  className: '',
  onChange: function onChange() {},

  caseSensitive: false,
  fuzzy: false,
  throttle: 200,
  inputComponent: 'input'
};

Search.propTypes = {
  className: _propTypes2.default.string,
  inputClassName: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  caseSensitive: _propTypes2.default.bool,
  sortResults: _propTypes2.default.bool,
  fuzzy: _propTypes2.default.bool,
  throttle: _propTypes2.default.number,
  filterKeys: _propTypes2.default.oneOf([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  value: _propTypes2.default.string
};

exports.default = Search;
exports.createFilter = _util.createFilter;
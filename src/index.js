import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createFilter} from './util'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: this.props.value || ''
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.clear = this.clear.bind(this)
    this.filter = this.filter.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (
      typeof nextProps.value !== 'undefined' &&
      nextProps.value !== this.props.value
    ) {
      const e = {
        target: {
          value: nextProps.value
        }
      }
      this.updateSearch(e)
    }
  }

  render () {
    const {
      className,
      onChange,
      onClear,
      caseSensitive,
      sortResults,
      clearable = false,
      throttle,
      filterKeys,
      value,
      fuzzy,
      inputComponent: InputComponent,
      inputClassName,
      ...inputProps
    } = this.props // eslint-disable-line no-unused-vars
    inputProps.type = inputProps.type || 'search'
    inputProps.value = this.state.searchTerm
    inputProps.onChange = this.updateSearch
    inputProps.className = inputClassName
    inputProps.placeholder = inputProps.placeholder || 'Search'
    return (
      <div className={className}>
        <InputComponent {...inputProps} />
        {value && clearable && <button
          type="button"
          onClick={this.clear}
          className="react-search-input--clearable"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="-6 -6 12 12"
          >
            <circle fill="#CCC" r="6" />
            <line
              fill="none"
              stroke="#FFF"
              strokeWidth=".667"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="2"
              y1="-2"
              x2="-2"
              y2="2"
            />
            <line
              fill="none"
              stroke="#FFF"
              strokeWidth=".667"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="-2"
              y1="-2"
              x2="2"
              y2="2"
            />
          </svg>
        </button>}
      </div>
    )
  }

  updateSearch (e) {
    const searchTerm = e.target.value
    this.setState(
      {
        searchTerm: searchTerm
      },
      () => {
        if (this._throttleTimeout) {
          clearTimeout(this._throttleTimeout)
        }

        this._throttleTimeout = setTimeout(
          () => this.props.onChange(searchTerm),
          this.props.throttle
        )
      }
    )
  }

  filter (keys) {
    const {filterKeys, caseSensitive, fuzzy, sortResults} = this.props
    return createFilter(this.state.searchTerm, keys || filterKeys, {
      caseSensitive,
      fuzzy,
      sortResults
    })
  }

  clear () {
    if(typeof this.props.onClear == 'function') {
      this.props.onClear();
    }
  }
}

Search.defaultProps = {
  className: '',
  onChange () {},
  caseSensitive: false,
  fuzzy: false,
  throttle: 200,
  inputComponent: 'input'
}

Search.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  onChange: PropTypes.func,
  caseSensitive: PropTypes.bool,
  sortResults: PropTypes.bool,
  fuzzy: PropTypes.bool,
  throttle: PropTypes.number,
  filterKeys: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  value: PropTypes.string
}

export default Search
export {createFilter}

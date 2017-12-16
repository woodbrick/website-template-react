import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

const calculateRange = arg => {
  const { total, current, display } = arg;
  let end = total;
  let start = 1;
  if (display < end) {
    // rounded to the nearest integer smaller
    let beforeNumber = Math.round(display / 2 - 0.5);
    const afterNumber = beforeNumber;
    if (display % 2 === 0) {
      beforeNumber -= 1;
    }

    if (current <= beforeNumber + 1) {
      end = display;
    } else if (current >= (total - afterNumber)) {
      start = total - display + 1;
    } else {
      start = current - beforeNumber;
      end = current + afterNumber;
    }
  }

  return { end, start };
};

const buttonStyle = active => ({
  minWidth: 42,
  padding: '8px 12px',
  fontWeight: active ? 'bold' : 'normal'
})

const getStateFromProps = props => {
  let { total, current, display } = props;
  total = total > 0 ? total : 1;
  current = current > 0 ? current : 1;
  display = display > 0 ? display : 1;
  current = current < total ? current : total;
  display = display < total ? display : total;
  return { current, display, total };
};

const Page = ({ value, isActive, onClick }) => {
  return (
    <Button
      style = { buttonStyle(isActive) }
      color = { isActive ? 'primary' : 'default' }
      onClick = { onClick }
      >{value}</Button>
  )

};
Page.propTypes = {
  value: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

const PageLink = ({ onClick, iconName }) => {
  return (
    <Button style = { buttonStyle(false) } onClick = { onClick }>
      <i className="material-icons">{iconName}</i>
    </Button>
  );
};

PageLink.propTypes = {
  onClick: PropTypes.func,
  iconName: PropTypes.string.isRequired
}

function PageList(props) {
  return props.pages.map((page, k) => (
    <Page
      key = { k }
      value = { page }
      isActive = { props.current === page }
      onClick = { () => props.setCurrent(page) }
    />
  ))
}

class Pagination extends React.Component {

  setCurrent(current) {
    this.props.onChange(current)
  }

  render() {
    const array = [];
    let {current, display, total} = getStateFromProps(this.props)
    let {end, start} = calculateRange({current, display, total})
    for (let i = start; i <= end; i += 1) {
      array.push(i);
    }
    return (
      <div style={{display: 'flex'}}>
        <PageLink onClick={ this.setCurrent.bind(this, 1) } iconName="first_page" />
        <PageList setCurrent={ this.setCurrent.bind(this) } pages={array} current={current} />
        <PageLink onClick={ this.setCurrent.bind(this, total) } iconName="last_page" />
      </div>
    );
  } // render
}

Pagination.propTypes = {

  // eslint-disable-next-line react/no-unused-prop-types
  total: PropTypes.number,

  // eslint-disable-next-line react/no-unused-prop-types
  current: PropTypes.number,

  // eslint-disable-next-line react/no-unused-prop-types
  display: PropTypes.number,
  onChange: PropTypes.func,

  styleRoot: PropTypes.object,
};

Pagination.defaultProps = {
  styleRoot: null
};

Pagination.displayName = 'Pagination';

function PaginateComponent(WrappedComponent) {
  return class pagedComponent extends React.Component{
    constructor(props) {
      super(props)
      this.changePage = this.changePage.bind(this)
    }
    changePage(current) {
      this.props.changePage &&
      this.props.changePage(current)
    }
    render() {
      return (
        <div className="paged-component">
          <WrappedComponent ref="WrappedComponent" {...this.props}/>
          <Pagination
            total = { this.props.total }
            current = { this.props.current }
            display = { this.props.display }
            onChange = { current => this.changePage(current) }
          />
        </div>
      )
    }
  }
}

export {PaginateComponent}

export default Pagination

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

const buttonStyle = active => ({
  minWidth: 42,
  padding: '8px 12px',
  fontWeight: active ? 'bold' : 'normal'
})

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

const PageList = ({pages, current, setCurrent}) => {
  return pages.map((page, k) => (
    <Page
      key = { k }
      value = { page }
      isActive = { current === page }
      onClick = { () => setCurrent(page) }
    />
  ))
}

const getStateFromProps = ({ total, current, range }) => {
  total = total > 0 ? total : 1;
  current = current > 0 ? current : 1;
  range = range > 0 ? range : 1;
  current = current < total ? current : total;
  range = range < total ? range : total;
  return { total, current, range };
}

const calculateRange = ({ total, current, range }) => {
  let end = total;
  let start = 1;
  if (range < end) {
    // rounded to the nearest integer smaller
    let beforeNumber = Math.round(range / 2 - 0.5);
    const afterNumber = beforeNumber;
    if (range % 2 === 0) {
      beforeNumber -= 1;
    }
    if (current <= beforeNumber + 1) {
      end = range;
    } else if (current >= (total - afterNumber)) {
      start = total - range + 1;
    } else {
      start = current - beforeNumber;
      end = current + afterNumber;
    }
  }
  return { start, end };
}

class Pagination extends React.Component {
  setCurrent(current) {
    this.props.onChange(current)
  }
  
  render() {
    const array = [];
    let {current, range, total} = getStateFromProps(this.props)
    let {start, end} = calculateRange({current, range, total})
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
  total: PropTypes.number,
  current: PropTypes.number,
  range: PropTypes.number,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  total: 1,
  current: 1,
  range: 1,
  onChange: () => {throw "Pagination onChange not defined!"}
};

Pagination.displayName = 'Pagination';

function PaginateComponent(WrappedComponent) {
  class PagedComponent extends React.Component{
    render() {
      return (
        <div className="paged-component">
          <WrappedComponent {...this.props}/>
          <Pagination
            total = { this.props.total }
            current = { this.props.current }
            range = { this.props.range }
            onChange = { this.props.changePage }
          />
        </div>
      )
    } // render
  }

  PagedComponent.propTypes = {
    changePage: PropTypes.func.isRequired,
    total: PropTypes.number,
    current: PropTypes.number,
    range: PropTypes.number
  };

  return PagedComponent
}


export {PaginateComponent}

export default Pagination

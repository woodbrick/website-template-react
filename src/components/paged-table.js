
import React from 'react'
import PropTypes from 'prop-types'
import {PaginateComponent} from './pagination'
import {observer} from 'mobx-react'
import Table from './table'

const PagedTable = PaginateComponent(Table)

const getInt = (num, defaultValue=0) => {
  num = parseInt(num, 10)
  return num === +num ? num : defaultValue
}

@observer
class PagedSyncTable extends React.Component {
  constructor(props) {
    super(props);
    this.setTotal = this.setTotal.bind(this);
    this.setRange = this.setRange.bind(this);
  }
  setTotal(total) {
    this.props.store.total = getInt(total)
  }
 
  setRange(range) {
    range = parseInt(range, 10)
    range = range === +range ? range : 0
    this.props.store.range = range
  }
 
  render() {
    return (
      <div>
          <PagedTable
            total = { this.props.store.total }
            current = { this.props.store.number }
            range = { this.props.store.range }
            changePage = { number => this.props.store.number = number }
            rows = {this.props.rows}
            cols = {this.props.cols}
          />
      </div>
    )
  } // render
}

PagedSyncTable.propTypes = {
  store: PropTypes.object,
  rows: PropTypes.array,
  cols: PropTypes.array
};

export default PagedSyncTable

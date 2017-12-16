
import React from 'react'
import Table from './table'
import {PaginateComponent} from './pagination'

const PagedTable = PaginateComponent(Table)

class PagedSyncTable extends React.Component {
  constructor(props) {
    super(props);
    this.setTotal = this.setTotal.bind(this);
    this.setRange = this.setRange.bind(this);
    this.state = {
      total: 20,
      range: 10,
      number: 1,
    };
  }
  setTotal(event, total) {
    // eslint-disable-next-line no-param-reassign
    total = total.trim();
    if (total.match(/^\d*$/)) {
      if (total !== '') {
        // eslint-disable-next-line no-param-reassign
        total = parseInt(total, 10);
      } else {
        // eslint-disable-next-line no-param-reassign
        total = 0;
      }
      this.setState({ total })
    }
  }
 
  setRange(range) {
    range = parseInt(range, 10)
    range = range === +range ? range : 0
    this.setState({ range })
  }
 
  render() {
    return (
      <div>
          <PagedTable
            total = { this.state.total }
            current = { this.state.number }
            range = { this.state.range }
            changePage = { number => this.setState({ number }) }
            rows = {this.props.rows}
            cols = {this.props.cols}
          />
      </div>
    )
  } // render
}

export default PagedSyncTable

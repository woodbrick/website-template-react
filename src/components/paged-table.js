
import React from 'react'
import Table from './table'
import {PaginateComponent} from './pagination'

const PagedTable = PaginateComponent(Table)

class PagedSyncTable extends React.Component {
  constructor(props) {
    super(props);
    this.setTotal = this.setTotal.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.state = {
      total: 20,
      display: 7,
      number: 7,
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
 
  setDisplay(event, display) {
    // eslint-disable-next-line no-param-reassign
    display = display.trim();
    if (display.match(/^\d*$/)) {
      if (display !== '') {
        // eslint-disable-next-line no-param-reassign
        display = parseInt(display, 10);
      } else {
        // eslint-disable-next-line no-param-reassign
        display = 0;
      }
 
      this.setState({ display })
    }
  }
 
  render() {
    return (
      <div>
          <PagedTable
            total = { this.state.total }
            current = { this.state.number }
            display = { this.state.display }
            changePage = { number => this.setState({ number }) }
            rows = {this.props.rows}
            cols = {this.props.cols}
          />
      </div>
    )
  }
}

export default PagedSyncTable

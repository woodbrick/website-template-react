import Pagination from '../../components/pagination'
import Table from '../../components/table'
import React from 'react'

class Issue extends React.Component {
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
      this.setState({ total });
      console.log(this.state)
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
 
      this.setState({ display });
      console.log(this.state)
    }
  }
 
  render() {
    return (
      <div>
          <div> issue </div>
          <Table />
          <Pagination
            total = { this.state.total }
            current = { this.state.number }
            display = { this.state.display }
            onChange = { number => this.setState({ number }) }
          />
      </div>
    )
  }
}

export default Issue

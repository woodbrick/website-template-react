import {PaginateComponent} from '../../components/pagination'
import Table from '../../components/table'
import React from 'react'

let PagedTable = PaginateComponent(Table)


let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

let cols = [
  {title: 'Dessert (100g serving)', prop:'name', numeric: false},
  {title: 'Calories', prop:'calories', numeric: true},
  {title: 'Fat (g)', prop:'fat', numeric: true},
  {title: 'Carbs (g)', prop:'carbs', numeric: true},
  {title: 'Protein (g)', prop:'protein', numeric: true}
]


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
          <PagedTable
            total = { this.state.total }
            current = { this.state.number }
            display = { this.state.display }
            onChange = { number => this.setState({ number }) }
            rows = {rows}
            cols = {cols}
          />
      </div>
    )
  }
}

export default Issue

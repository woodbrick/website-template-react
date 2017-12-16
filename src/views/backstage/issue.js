import PagedTable from '../../components/paged-table'
import React from 'react'
import {observable} from 'mobx'

let store = observable({
  total: 20,
  range: 10,
  number: 1,
})


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
    super(props)
    console.log(props)
  }
  render() {
    return (
      <div>
          <div> issue </div>
          <PagedTable
            store = {store}
            rows = {rows}
            cols = {cols}
          />
      </div>
    )
  }
}

export default Issue

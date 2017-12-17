import React from 'react'
import PropTypes from 'prop-types'
import {FieldTypes} from '../../components/fields'
import { Provider } from 'mobx-react';
import PagedTable from '../../components/paged-table'
import { pageStore } from './stores';

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
  createData('Frozen yoghurt2', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich2', 237, 9.0, 37, 4.3),
  createData('Eclair2', 262, 16.0, 24, 6.0),
  createData('Cupcake2', 305, 3.7, 67, 4.3),
  createData('Gingerbread2', 356, 16.0, 49, 3.9),
];

let cols = [
  {title: 'Dessert (100g serving)', prop:'name', numeric: false},
  {title: 'Calories', prop:'calories', numeric: true},
  {title: 'Fat (g)', prop:'fat', numeric: true},
  {title: 'Carbs (g)', prop:'carbs', numeric: true},
  {title: 'Protein (g)', prop:'protein', numeric: true}
]
pageStore.cols = cols
pageStore.loadRows = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        rows: rows,
        total: 10
      })
    }, 100)
  })
}
pageStore.changePage(1)

const uppercaseFirst = str => 
  str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  })
class EditTable extends React.Component {
  componentWillMount() {
    let {Model} = this.props
    let cols = []
    Model.fields.forEach((value, key) => {
      console.log(value)
      let suffix = value.unit ? `(${value.unit})` : ''
      cols.push({
        title: `${uppercaseFirst(key)} ${suffix}`,
        prop: key,
        numeric: value.type === FieldTypes.number
      })
      pageStore.cols = cols
    })
    // let cols = [
    //   {title: 'Dessert (100g serving)', prop:'name', numeric: false},
    //   {title: 'Calories', prop:'calories', numeric: true},
    //   {title: 'Fat (g)', prop:'fat', numeric: true},
    //   {title: 'Carbs (g)', prop:'carbs', numeric: true},
    //   {title: 'Protein (g)', prop:'protein', numeric: true}
    // ]
    console.log(cols)
  }
  render() {
    let {Model} = this.props
    let name = Model._table_name
    return (
      <Provider pageStore={pageStore}>
      <div>
          <div> {name} </div>
          <PagedTable />
      </div>
      </Provider>
    )
  }
}
EditTable.propTypes = {
  Model: PropTypes.object
}

export default EditTable

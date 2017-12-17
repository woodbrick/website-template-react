import {FieldTypes} from '../components/fields'

let fieldMap = new Map()
fieldMap.set('name', {
  type: FieldTypes.string,
  unit: '100g serving'
})
fieldMap.set('calories', {
  type: FieldTypes.number,
  unit: ''
})
fieldMap.set('fat', {
  type: FieldTypes.number,
  unit: 'g'
})
fieldMap.set('carbs', {
  type: FieldTypes.number,
  unit: 'g'
})
fieldMap.set('protein', {
  type: FieldTypes.number,
  unit: 'g'
})
const Issue = {
  name: 'Issue',
  fields: fieldMap
}

export default Issue

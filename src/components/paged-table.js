
import React from 'react'
import PropTypes from 'prop-types'
import {PaginateComponent} from './pagination'
import {observer, inject} from 'mobx-react'
import Table from './table'

const PagedTable = PaginateComponent(Table)
@inject('pageStore')
@observer
class PagedSyncTable extends React.Component {
  render() {
    let {pageStore} = this.props
    return (
      <div>
          <PagedTable
            total = {pageStore.total}
            current = {pageStore.current}
            range = {pageStore.range}
            changePage = {pageStore.changePage}
            rows = {this.props.rows}
            cols = {this.props.cols}
          />
      </div>
    )
  } // render
}

PagedSyncTable.propTypes = {
  pageStore: PropTypes.object,
  rows: PropTypes.array,
  cols: PropTypes.array
};

export default PagedSyncTable

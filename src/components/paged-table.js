
import React from 'react'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'
import { Table } from 'antd';
import { Pagination } from 'antd';

@inject('pageStore')
@observer
class PagedSyncTable extends React.Component {
  render() {
    let {pageStore} = this.props
    return (
      <div>
          {/* <Table cols={pageStore.cols} rows = {pageStore.rows} /> */}
          <Table columns={pageStore.cols} dataSource={pageStore.rows} onChange={this.handleChange} />
          <Pagination 
            defaultCurrent={1}
            total={pageStore.total} 
            pageSize={pageStore.pageSize}
            onChange={pageStore.changePage}
            onShowSizeChange={pageStore.changePageSize} />
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

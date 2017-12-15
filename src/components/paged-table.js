import Pagination from './pagination';
import React from 'react'

class PagedTable extends React.Component {
  render() {
    return (
      <div className="paged-table">
        <Pagination />
      </div>
    )
  }
}

export default PagedTable

import { observable, action, computed } from 'mobx';
const getInt = (num, defaultValue=0) => {
  num = parseInt(num, 10)
  return num === +num ? num : defaultValue
}
class TablePageStore {
  @observable displayPage = 10
  @observable totalPage = 10
  @observable currentPage = 1
  @observable pageSize = 2
  @observable _rows = []
  @observable _cols = []
  @computed get rows() {
    return [...this._rows]
  }
  @computed get cols() {
    return [...this._cols]
  }
  @computed get colsConunt() {
    return this.cols.length
  }
  set cols(cols) {
    this._cols = cols
  }
  set rows(rows) {
    this._rows = rows
  }
  loadRows() {
    return new Promise((resolve, reject) => {
      reject("load rows not defined")
    })
  }
  updateData(res) {
    let rows = res.rows
    if (!rows && !Array.isArray(rows)) return
    let start = (this.currentPage - 1) * this.pageSize
    this._rows = rows.slice(start, start + this.pageSize)
    this.totalPage = getInt(res.total / this.pageSize)
    console.log(JSON.stringify(this.rows))
  }
  @action.bound
  changePage(current) {
    this.currentPage = getInt(current)
    this.loadRows(this.currentPage, this.pageSize)
    .then(res => {
      this.updateData(res)
    })
  }
}

const pageStore = new TablePageStore();
export {pageStore};

import { observable, action, computed } from 'mobx';
const getInt = (num, defaultValue=0) => {
  num = parseInt(num, 10)
  return num === +num ? num : defaultValue
}
class PageStore {
  @observable range = 10
  @observable total = 20
  @observable current = 1
  @computed get half() {
    return this.total / 2
  }
  @action.bound
  changePage(current) {
    this.current = getInt(current)
    console.log('changePage', this.current)
  }
}

const pageStore = new PageStore();
export {pageStore};

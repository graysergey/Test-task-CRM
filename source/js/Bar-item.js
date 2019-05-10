
export default class BarItem {
  constructor(i) {
    this._id = i;

    this._element = null;
  }

  template() {
    return `<li class="side-bar__item" data-id="${this._id}">Элемент списка - ${this._id}</li>`;
  }

  render() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.template();
    this._element = newElement.firstChild;
    return this._element;
  }
}

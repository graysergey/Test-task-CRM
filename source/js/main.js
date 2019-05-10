import BarItem from './Bar-item';
import {getrandomColor, getPosition, getRandomInteger} from './utils';
import contextMenuTemplate from './context-menu-template';


const COUNT_SIDEBAR_ITEMS = getRandomInteger(3, 11); // Количество пунктов sidebar (min / max)

// отрисовка боковой панели:
const getSideBarItems = (count) => {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i < count + 1; i++) {
    const element = new BarItem(i);
    const renderedElement = element.render();
    fragment.appendChild(renderedElement);
  }
  return fragment;
};

const getSideBarList = () => {
  const list = document.createElement(`ul`);
  list.classList.add(`side-bar__list`);
  list.appendChild(getSideBarItems(COUNT_SIDEBAR_ITEMS));
  return list;
};
const sideBar = document.querySelector(`.side-bar`);
sideBar.insertAdjacentElement(`beforeend`, getSideBarList());


// отрисовывает основной список, с реализацией рандомного цвета по нажатию на пункт списка:
const mainContent = document.querySelector(`.main-content`);
const mainContentTemplate = document.querySelector(`#content-list`).content;
const listElement = mainContentTemplate.cloneNode(true);
const list = listElement.querySelector(`.main-content__list`);

const onContentItem = (evt) => {
  let target = evt.target;
  if (target !== null) {
    evt.preventDefault();
    while (target.tagName !== `UL`) {
      if (target.tagName === `LI`) {
        setColor(target);
        return;
      }
      target = target.parentNode;
    }
  }
};

const setContentListListener = () => {
  list.addEventListener(`click`, onContentItem);
};

// устанавливает цвет для пункта списка
const setColor = (node) => {
  const color = getrandomColor();
  node.style.backgroundColor = `hsl${color.background}`;
  node.style.color = `hsl${color.text}`;
};

const renderMainContentList = () => {
  mainContent.appendChild(list);
  setContentListListener();
};
renderMainContentList();


// отрисовывает панель - добавления нового текста:
const getSearchForm = () => {
  return `
  <form class="search-bar__form" action="" method="GET">
    <input class="search-bar__input" type="search" placeholder="Введите ваш текст">
    <button class="search-bar__btn">Добавить</button>
  </form>`;
};

const searchBar = document.querySelector(`.search-bar`);
const renderSearchForm = () => {
  searchBar.insertAdjacentHTML(`beforeend`, getSearchForm());
};
renderSearchForm();

// реализация добавления новых пунктов списка:
const submitButton = searchBar.querySelector(`.search-bar__btn`);
const renderNewItem = (text) => {
  const li = document.createElement(`li`);
  li.classList.add(`main-content__item`);
  li.innerHTML = text;
  list.appendChild(li);
};

const onSubmit = (evt) => {
  evt.preventDefault();
  const input = searchBar.querySelector(`.search-bar__input`);
  if (input.value) {
    renderNewItem(input.value);
    input.value = ``;
  }
};

const setSubmitListener = () => {
  submitButton.addEventListener(`click`, onSubmit);
};
setSubmitListener();


// работа с контекстным меню:
const mainPage = document.querySelector(`.page-main`);
mainPage.insertAdjacentHTML(`beforeend`, contextMenuTemplate());
const contextMenu = mainPage.querySelector(`.context-menu`);

const onListItem = (evt) => {
  let target = evt.target;
  while (target.tagName !== `BODY`) {
    if (target.tagName === `LI`) {
      evt.preventDefault();
      contextMenu.classList.add(`context-menu--show`);
      setCloseContextMenu();
      positionContextMenu(evt);
      return;
    } else if (target.tagName === `BODY`) {
      return;
    }
    target = target.parentNode;
  }
};

const onDocument = (evt) => {
  console.log(evt.target);
  const element = evt.srcElement || evt.target;
  if (!element.classList.contains(`context-menu__item` || !element.classList.contains(`context-menu__link`))) {
    contextMenu.classList.remove(`context-menu--show`);
    removeCloseContestMenuListener();
  }
};

const onEscapePress = (evt) => {
  if (evt.keyCode === 27) {
    contextMenu.classList.remove(`context-menu--show`);
    removeCloseContestMenuListener();
  }
};

const setCloseContextMenu = () => {
  document.addEventListener(`click`, onDocument);
  document.addEventListener(`keydown`, onEscapePress);
};

const removeCloseContestMenuListener = () => {
  document.removeEventListener(`keydown`, onEscapePress);
  document.removeEventListener(`click`, onDocument);
};


const setContextMenu = () => {
  document.addEventListener(`contextmenu`, onListItem);
};
setContextMenu();

let menuPosition = 0;
let menuPositionX = 0;
let menuPositionY = 0;

const positionContextMenu = (evt) => {
  menuPosition = getPosition(evt);
  menuPositionX = menuPosition.x + `px`;
  menuPositionY = menuPosition.y + `px`;
  contextMenu.style.left = menuPositionX;
  contextMenu.style.top = menuPositionY;
};

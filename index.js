'use strict';

const store = {
  items:[],
  hideChecked:false,
  searchTerm:false
};

let addItem = () => {
  let userInput = $('.js-shopping-list-entry').val();
  $('.js-shopping-list-entry').val('');
  store.items.push({name:userInput,checked:false,isEditing:false});
  renderList();
};


const handleNewItemAdded = () => {
//1. Get input value user
//2. Push user input to STORE.items
//3. Regenerate html for Dom
//4. Render Html to the DOM'
  $('#js-shopping-list-form').on('submit',(event) => {
    if ( $('.js-shopping-list-entry').val()==='') {
      event.preventDefault();
      $('.js-shopping-list-entry').attr('placeholder','You must enter an Item');
    } else {
      event.preventDefault();
      addItem();
      $('.js-shopping-list-entry').attr('placeholder','e.g., broccoli');
    }
  });
};


const handleTitleEdit = () => {
  $('.js-shopping-list').on('click','.js-shopping-item',(event) => {
    let index = $(event.target).closest('li').attr('data-item-index');
    store.items[index].isEditing = !store.items[index].isEditing;
    renderList();
  });
};

const handleAcceptEdit = () => {
  $('.js-shopping-list').on('submit','.edit-item-name-form',(event) => {
    event.preventDefault();
    let index = $(event.target).closest('li').attr('data-item-index');
    let userInput = $('.edit-item-name-input').val();
    // console.log(userInput);
    console.log(store.items[index]);
    store.items[index].name = userInput;
    store.items[index].isEditing = !store.items[index].isEditing;
    renderList();
  });
};


const handleShowCheckedItemsToggle = () => {
  $('.toggle-show-checked').on('click',(event) => {
    console.log('run');
    event.preventDefault();
    store.hideChecked = !store.hideChecked;
    renderList();
  });
};


const toggleCheck = (event) => {
  let index = $(event.target).closest('li').attr('data-item-index');
  store.items[index].checked = !store.items[index].checked; 
  renderList();
};


const handleItemChecked = () => {
//1. Get html index attribute from item that was clicked
//2. set store.items[index from clicked item].checked to true
//2. Regenerate html for Dom
//3. Render Html to the DOM
  $('.js-shopping-list').on('click','.js-item-toggle', (event) => {
    event.preventDefault();
    toggleCheck(event);
  });
};


const deleteItem = () => {
  let index = $(event.target).closest('li').attr('data-item-index');
  delete store.items[index];
  renderList();
  // console.log('deleted');
};
const handleItemDeleted = () => {
//1. Get html index attribute from item that was clicked
//2. remove store.items[index of clicked item] 
//2. Regenerate html for Dom
//3. Render Html to the DOM
  $('.js-shopping-list').on('click','.js-item-delete', (event) => {
    event.preventDefault();
    // console.log('got here');
    deleteItem();

  });
};


let generateEditTemplate = (item) => {
  if (item.isEditing === true) {
    return `<form class='edit-item-name-form'>
      <input class='edit-item-name-input' placeholder='edit title...'>
      <button type='submit' class='accept-edit'>Ok</button>
      <button>Cancel</button>
    </form>
    `; 
  } else {
    return `<span class = "shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked': ''}">
    ${item.name}
    </span>`;
  }
};

const checkedItemsClassGenerator = (item) => {
  let cssClass;
  if (store.hideChecked === true) {
    cssClass = item.checked ? 'hidden' : ''; 
  } else {
    cssClass = '';
  }
  return cssClass;
};

const createListString = (arrayOfItems) => {
//1. declare a variable and set the value to an empty array.
//2. Iterate over each member of the array, pushing an 'li' with traits
// based on whether they are checked or not
//3. JOIN and return the initially declared array, which now has all of the 'li's pushed to it
  let storeLiArr = [];
  arrayOfItems.forEach((item,index)=> {
    storeLiArr.push(`
      <li class='js-item-index-element ${checkedItemsClassGenerator(item)}' data-item-index="${index}">
        ${generateEditTemplate(item)} 
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>
    `);
  });
  return storeLiArr.join('');
};

const renderList = () => {
  const domData = createListString(store.items);
  $('.js-shopping-list').html(domData);
};


const initiateQuiz = () => {
  renderList();
  handleNewItemAdded();
  handleItemChecked();
  handleItemDeleted();
  handleTitleEdit();
  handleAcceptEdit();
  handleShowCheckedItemsToggle();
};


$(initiateQuiz());
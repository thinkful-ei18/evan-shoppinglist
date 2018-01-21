'use strict';

const store = {
  items:[],
  hideChecked:false,
  isSearching:false
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
    $('.edit-item-name-input').focus();
  });
};

const handleAcceptEdit = () => {
  $('.js-shopping-list').on('submit','.edit-item-name-form',(event) => {
    event.preventDefault();
    let index = $(event.target).closest('li').attr('data-item-index');
    let userInput = $('.edit-item-name-input').val();
    store.items[index].name = userInput;
    store.items[index].isEditing = !store.items[index].isEditing;
    renderList();
  });
};


const handleCancelEdit = () => {
  $('.js-shopping-list').on('click','.cancel-edit',(event) => {
    event.preventDefault();
    let index = $(event.target).closest('li').attr('data-item-index');
    store.items[index].isEditing = !store.items[index].isEditing;
    renderList();
  });
};



const handleShowCheckedItemsToggle = () => {
  $('.toggle-show-checked').on('click',(event) => {
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
  store.items.splice(index,1);
  renderList();
};
const handleItemDeleted = () => {
//1. Get html index attribute from item that was clicked
//2. remove store.items[index of clicked item] 
//2. Regenerate html for Dom
//3. Render Html to the DOM
  $('.js-shopping-list').on('click','.js-item-delete', (event) => {
    event.preventDefault();
    deleteItem();

  });
};


let handleShowButton = () => {
  $('.search-input').css('display','none');
  $('.search-dropdown').on('click', (event) => {
    event.preventDefault();
    $('.search-input').slideToggle();
  });
};

let generateEditTemplate = (item) => {
  if (item.isEditing) {
    return `<form class='edit-item-name-form'>
      <input class='edit-item-name-input' placeholder='edit title...'>
      <button type='submit' class='accept-edit'>Ok</button>
      <button class='cancel-edit'>Cancel</button>
    </form>
    `; 
  } else {
    return `<span class = "shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked': ''}">
    ${item.name}
    </span>`;
  }
};

let handleSearchItem = () => {
  $('.search-input').on('keydown',(event) => {
    if (event.key === 'Enter') {
      store.isSearching = true;
      renderList();
    }
  });
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
  // let storeLiArr = [];
  return arrayOfItems.map((item,index)=> {
    return `
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
      </li>`;
  });
};

const createSearchListString = (arrayOfItems) => {
  let userSearchInput = $('.search-input').val().toLowerCase();
  $('.search-input').val('');
  return arrayOfItems.map((item,index) => {
    let itemName = item.name.toLowerCase();
    if (itemName.includes(userSearchInput)) {
      return `<li class='js-item-index-element ${checkedItemsClassGenerator(item)}' data-item-index="${index}">
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
      `;
    }
  });
};



const renderList = () => {
  if (store.isSearching === false) {
    const domData = createListString(store.items);
    $('.js-shopping-list').html(domData);
  } else {
    const domData = createSearchListString(store.items);
    $('.js-shopping-list').html(domData);
  }
};


const initiateQuiz = () => {
  renderList();
  handleNewItemAdded();
  handleItemChecked();
  handleItemDeleted();
  handleTitleEdit();
  handleAcceptEdit();
  handleShowCheckedItemsToggle();
  handleShowButton();
  handleSearchItem();
  handleCancelEdit();
};


$(initiateQuiz());


/**
 * In order to implement search for item by name:
 * Set an event listener on search input form, for 'submit'
 * On submit, store's 'isSearching' should be set to true
 * there should be a separate function for generating the dom data that will filter a different array
 * this array will be a result of a .filter function which $('')'s the search field's input and iterates through each item instance in store, filtering
 * out anything whose item name does not contain the string specified.
 * We should then make a link or button to reset the is Searching to false so that the user van view all items again.
 */
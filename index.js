'use strict';

const store = {
  items:[],
  hideChecked:false,
  searchTerm:false
};

let addItem = () => {
  console.log('item has been queued');
  let userInput = $('.js-shopping-list-entry').val();
  $('.js-shopping-list-entry').val('');
  store.items.push({name:userInput,checked:false});
  renderList();
};


const handleNewItemAdded = () => {
//1. Get input value user
//2. Push user input to STORE.items
//3. Regenerate html for Dom
//4. Render Html to the DOM'
  $('#js-shopping-list-form').on('submit',(event) => {

    event.preventDefault();
    addItem();
  });
};



const handleItemChecked = () => {
//1. Get html index attribute from item that was clicked
//2. set store.items[index from clicked item].checked to true
//2. Regenerate html for Dom
//3. Render Html to the DOM
};

const handleItemDeleted = () => {
//1. Get html index attribute from item that was clicked
//2. remove store.items[index of clicked item] 
//2. Regenerate html for Dom
//3. Render Html to the DOM
};


const createListString = (arrayOfItems) => {
//1. declare a variable and set the value to an empty array.
//2. Iterate over each member of the array, pushing an 'li' with traits
// based on whether they are checked or not
//3. JOIN and return the initially declared array, which now has all of the 'li's pushed to it
  let storeLiArr = [];
  arrayOfItems.forEach((item,index)=> {
    storeLiArr.push(`
      <li class='js-item-index-element' data-item-index="${index}">
        <span class = "shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked': ''}">
        ${item.name}
        </span> 
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
  // console.log(storeLiArr.join(''));
  return storeLiArr.join('');
};

const renderList = () => {
  const domData = createListString(store.items);
  $('.js-shopping-list').html(domData);
};


const initiateQuiz = () => {
  renderList();
  handleNewItemAdded();
};







$(initiateQuiz());
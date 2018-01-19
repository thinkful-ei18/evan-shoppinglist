'use strict';

const store = {
  items:[],
  hideChecked:false,
  searchTerm:false
};



const handleNewItemAdded = () => {
//1. Get input value user
//2. Push user input to STORE.items
//3. Regenerate html for Dom
//4. Render Html to the DOM
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


const renderList = (arrayofItems) => {
//1. declare a variable and set the value to an empty string.
//2. Iterate over each member of the array, pushing an 'li' with traits
// based on whether they are checked or not
//3. return the initially declared variable 

};

const pushToDom = (domData) => {
//1 Push domData to the shopping LI container

};


const initiateQuiz = () => {

};







$(initiateQuiz());
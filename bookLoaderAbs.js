import { authors, books, genres, BOOKS_PER_PAGE } from './data.js';
// import { createBookDisplay} from './bookDisplayAbs.js';
//import { bookListDisplayFactory } from './scripts.js';
import './components/book-display.js'


const dataListButton = document.querySelector('[data-list-button]') // The 'Show More' button

/**
 * The code below (excluding the code commented out at the end of this document) is a mixture between my original code which actually
 * had good abtraction initially by having separate functions for each small purpose, 
 * and a slightly new twist on it with my new DWA6+7 knowledge.
 */

/**
 * The amount of books that are left to load after the first page load.
 * This is before clicking on the 'Show more' button, where it is updated in a later function.
 */
let remainingBooks = books.length - BOOKS_PER_PAGE // Gets the original number of books in the data.js file

/**
 * SHOW MORE BUTTON CODE REGARDING TEXT AND FUNCTIONALITY
 * Adding "Show more" text onto the button that updates the remaining number every time it is clicked
 */
dataListButton.innerText = `Show more (${remainingBooks})` // Displays the number of books available to load

/** 
 * A function that updates the dataListButton text after each time the 'Show more' button is clicked
 */ 
function updateShowMore () {
  if (remainingBooks >= BOOKS_PER_PAGE || remainingBooks > 0)
    dataListButton.innerText = `Show more (${remainingBooks})`
}

/**
 * A function that checks to see if there are <= 0 books left to load and then 
 * disables the 'Show more' button if that statement is true
 */ 
function checkButtonStatus() {
    if (remainingBooks <= 0) {
        loadMoreBooks()
      dataListButton.disabled = true; // Disable the button
    } else {
      dataListButton.disabled = false; // Enable the button
    }
  }

/**
 * A function that updates the remaining books value each time dataListButton is clicked
 */
function updateRemaining () {
  remainingBooks -= BOOKS_PER_PAGE;

if (remainingBooks <= 0) { 
dataListButton.innerText = `Show more (0)` // Sets remaining books to 0 so a user knows there is nothing more to load 
dataListButton.disabled = true
}
updateShowMore(); // Calls this function again to update it each time the button is clicked
checkButtonStatus() // Checks to see if the button is active or disabled after each click 
}

export { updateRemaining }



let x = 0; // Define the initial start index
let y = BOOKS_PER_PAGE; // Define the initial end index
let increment = BOOKS_PER_PAGE; // Define how many more books to load each time

// const bookDisplayFactory = createBookDisplay(); // Create the book display factory
// renderBooks(x, y)

/**
 * A function that allows more books to be loaded with the correct incrementation each time 
 */ 
function loadMoreBooks() {
  // Update the start and end indices for the next batch of books
  x = y; // Move the start index to the previous end index
  y += increment; // Increase the end index by the increment value

  renderBooks(x, y); 

  // Check if there are more books to load
  if (y >= books.length) {
    updateShowMore();
    dataListButton.disabled = true;
  }
};

// Initial display of books
//bookDisplayFactory(x, y);

export { loadMoreBooks }
//export { bookDisplayFactory }


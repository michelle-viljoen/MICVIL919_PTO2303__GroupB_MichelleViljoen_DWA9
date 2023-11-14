import { authors, books, genres, BOOKS_PER_PAGE } from './data.js'
import { BookFilter } from './bookFilterAbs.js'
import { chooseDarkHandler } from './themeHandler.js'
import { BookDetailsHandler } from './bookMoreDetailsAbs.js'
import "./components/book-display.js"



 const matches = books
 let page = 1 ;
 const range = [0, BOOKS_PER_PAGE]

 if (!books && !Array.isArray(books)) {
  throw new Error('Source required') 
 }
if (!range && range.length < 2) {
  throw new Error('Range must be an array with two numbers')
}

// A list of everything that is needed to be fetched from the html document 
const dataHeaderSearch = document.querySelector('[data-header-search]') // The button that opens the search form
const dataHeaderOverlay = document.querySelector('[data-search-overlay]') // The overlay containing the search form 
const dataSearchForm = document.querySelector('[data-search-form]'); // The actual search form
const dataSearchCancel = document.querySelector('[data-search-cancel]') // The cancel button in the search form
const dataHeaderSettings = document.querySelector('[data-header-settings]') // The button to open the settings
const dataSettingsCancel = document.querySelector('[data-settings-cancel]') // The cancel button in the settings form

const settingsForm = document.getElementById('settings') // 
const genreSearch = document.querySelector('[data-search-genres]') // The genre section of the search form
const authorSearch = document.querySelector('[data-search-authors]') // The author section of the search form
const dataListButton = document.querySelector('[data-list-button]') // The 'Show More' button
const dataListItems = document.querySelector('[data-list-items]') // The books loaded in the preview created
const dataListActive = document.querySelector('[data-list-active]') // An active book that has been clicked on 
const dataListCancel = document.querySelector('[data-list-close]') // Closes the active/ selected book
const dataListImage = document.querySelector('[data-list-image]') // the image within each list item
const dataListTitle = document.querySelector('[data-list-title]') // the title of each book
const dataListDescription = document.querySelector('[data-list-description]') // the description of each book
const dataListSubtitle = document.querySelector('[data-list-subtitle]') // This becomes the author's name
const dataListBlur = document.querySelector('[data-list-blur]') // This is the background of the dataListActive overlay
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const dataListMessage = document.querySelector('[data-list-message]')



// Opens the search overlay to allow a user to search books by title, genre or author.//
dataHeaderSearch.addEventListener('click', () =>
dataHeaderOverlay.show()
)

// Closes the search overlay when cancel is clicked. //
dataSearchCancel.addEventListener('click', () =>
dataHeaderOverlay.close(),
)

// Opens the settings overlay to allow user to choose light or dark theme. //
dataHeaderSettings.addEventListener('click', () =>
dataSettingsOverlay.show()
)

// Closes the settings overlay. //
dataSettingsCancel.addEventListener('click', () =>
dataSettingsOverlay.close()
)
// Closes the dataListActive overlay when you click on close
dataListCancel.addEventListener('click', () =>
dataListActive.close()
)
 

/**  Changes the theme of the website based on whether day or night is selected.
 *   'day' is a light coloured screen and 'night' is a dark coloured screen. 
 */
settingsForm.addEventListener('submit', chooseDarkHandler)


 // CODE TO CREATE THE VALUES FOR "GENRES" AND "AUTHORS" WITHIN THE SEARCH FORM  
 /**  
  * Allows the user to select the genre they want from a drop down list of preselected genres
  */
  const genre = Object.values(genres) // Gets the values of the key value pair in the genres object of data.js
  let genreElement = document.createElement("option") // Creates the area where the options can be listed
    genreElement.innerHTML = 'All Genres' // The original text within the genre element
    genreElement.value = 'any' // Sets the value to any to be used later
    genreSearch.appendChild(genreElement) // Gives the genre search area the value of the genre element we just created
  for (let i = 0; i < genre.length; i++) { 
    let options = genre[i] // The options are from the list of genres 
    let genreElement = document.createElement("option") 
    genreElement.innerHTML = options // The drop down list created will have the values of the names of the genres
    genreElement.value = options 
    genreSearch.appendChild(genreElement) // The list will be as long as the list of possible genres and amends to this 
  }

  /**  Allows the user to select the author they want from a drop down list of all available authors
   * The descriptions are the same as for creating the genres list above, but for authors 
   */
  const authorOption = Object.values(authors) 
  let element = document.createElement("option")
    element.innerHTML = 'All Authors'
    element.value = 'any'
    authorSearch.appendChild(element)
  for (let i = 0; i < authorOption.length; i++) {
    let options = authorOption[i]
    let element = document.createElement("option")
    element.innerHTML = options
    element.value = options
    authorSearch.appendChild(element)
  }

/** 
 * USES THE bookMoreDetailsAbs.js TO SHOW FURTHER DETAILS ABOUT EACH BOOK WHEN CLICKED ON
 */ 
const bookDetailsHandler = new BookDetailsHandler(dataListItems, dataListActive, dataListImage, dataListBlur, dataListTitle, dataListSubtitle, dataListDescription, dataListCancel, books, authors);

/**
 * USES THE bookFilterAbs.js TO DISPLAY BOOKS THAT MATCH THE SEARCH CRITERIA 
 *  
 */ 
const newBookFilter = new BookFilter(dataSearchForm, dataListItems, dataHeaderOverlay, dataSearchCancel, dataHeaderSearch, dataListMessage, books, authors, genres)


 
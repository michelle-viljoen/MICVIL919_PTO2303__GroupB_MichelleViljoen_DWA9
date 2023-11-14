import { books, authors, genres, BOOKS_PER_PAGE} from '../data.js'

let x = 0; 
let y = BOOKS_PER_PAGE;
const increment = BOOKS_PER_PAGE;
let remaining = books.length - BOOKS_PER_PAGE


/**
 * @return {HTMLElement}
 */
class DisplayBooks extends HTMLElement {
 constructor() {
  super()
 }
  connectedCallback() {
    this.renderBooks(x, y); 
    this.loadMoreBooks(x, y)
    this.loadMoreBooks = this.loadMoreBooks.bind(this); // Binds 'this' to loadMoreBooks to call function properly
    document.querySelector('[data-list-button]').addEventListener('click', this.loadMoreBooks); // Adds event to button to load more books
  }

  renderBooks(x, y) { // Shows the initial 36 books on the webpage
    const bookList = books; 

    const fragment = document.createDocumentFragment();

    for (let i = x; i < y && i < bookList.length; i++) {
      const { author, image, title, id } = bookList[i];
      const element = document.createElement('button');
      element.classList = 'preview';
      element.setAttribute('data-preview', id);
      element.innerHTML = /* html */ `
            <style>
            * {
              box-sizing: border-box;
            }
      .preview {
        border-width: 0;
        width: 100%;
        font-family: Roboto, sans-serif;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-align: left;
        border-radius: 8px;
        border: 1px solid rgba(var(--color-dark), 0.15);
        background: rgba(var(--color-light), 1);
       
      }

      @media (min-width: 60rem) {
        .preview {
          padding: 1rem;
        }
      }

      .preview_hidden {
        display: none;
      }

      .preview:hover {
        background: rgba(var(--color-blue), 0.05);
      }

      .image {
        width: 48px;
        height: 70px;
        object-fit: cover;
        background: grey;
        border-radius: 2px;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
      }

      .info {
        padding: 1rem;
      }

      .title {
        margin: 0 0 0.5rem;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        color: rgba(var(--color-dark), 0.8)
      }

      .author {
        color: rgba(var(--color-dark), 0.4);
      }

    
     
      </style>
   
              <img class="image" src="${image}" />
              <div class="info">
                <h3 class="title">${title}</h3>
                <div class="author">${authors[author]}</div>
              </div>`;
      fragment.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(fragment); 
  }

  loadMoreBooks () { // Allows more books to be loaded with each click of the Show More button
    x = y; // Move the start index to the previous end index
    y += BOOKS_PER_PAGE; // Increase the end index by the increment value
   
    this.renderBooks(x, y); 

    
    // Check if there are more books to load, load more if yes, disable button if no
    if (y >= books.length) {
      document.querySelector('[data-list-button]').disabled = true;
    }

      if (remaining >= BOOKS_PER_PAGE || remaining > 0) {
      document.querySelector('[data-list-button]').innerText = `Show more (${remaining})`
      
  }

    this.updateRemaining()
  }

  updateRemaining () {
    remaining -= BOOKS_PER_PAGE
    if (remaining <= 0) { 
      this.renderBooks(x, y);
      document.querySelector('[data-list-button]').innerText = `Show more (0)` // Sets remaining books to 0 so a user knows there is nothing more to load 
      document.querySelector('[data-list-button]').disabled = true
      }
  }
}

customElements.define("book-display", DisplayBooks);

export { DisplayBooks }

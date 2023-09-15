import { UI } from './classes/UI'
import { $addedBooks, $booksAvailable } from './selectors'
import { ReadingList } from './classes/ReadingList'
import { SECTION_TITLE_ACTION, animateCSS } from './utlis'

const readingList = new ReadingList()
const ui = new UI()

function printBooks (data) {
  ui.renderBooks(data)
}

function clickHandler (isbn, isOnBooksAvailable, event) {
  const elementToAnimate = event.target.parentNode.parentNode
  const animationName = 'bounceOut'

  if (isOnBooksAvailable) {
    const book = readingList.booksAvailable.find(elem => elem.ISBN === isbn)
    readingList.addBook(book)
    $booksAvailable.textContent = `Libros disponibles (${readingList.booksAvailable.length})`
    $addedBooks.textContent = `Lista de lectura (${readingList.addedBooks.length})`
    animateCSS(elementToAnimate, animationName)
    setTimeout(() => ui.renderBooks(readingList.booksAvailable), 750)
    return
  }

  const book = readingList.addedBooks.find(elem => elem.ISBN === isbn)
  readingList.removeBook(book)
  $booksAvailable.textContent = `Libros disponibles (${readingList.booksAvailable.length})`
  $addedBooks.textContent = `Lista de lectura (${readingList.addedBooks.length})`
  animateCSS(elementToAnimate, animationName)
  setTimeout(() => ui.renderBooks(readingList.addedBooks), 750)
}

function renderAddedBooks () {
  $booksAvailable.classList.remove(SECTION_TITLE_ACTION.ACTIVE)
  $addedBooks.classList.add(SECTION_TITLE_ACTION.ACTIVE)
  ui.isOnBooksAvailable = false
  ui.renderBooks(readingList.addedBooks)
}

function backToBooksAvailable () {
  $booksAvailable.classList.add(SECTION_TITLE_ACTION.ACTIVE)
  $addedBooks.classList.remove(SECTION_TITLE_ACTION.ACTIVE)
  ui.isOnBooksAvailable = true
  ui.renderBooks(readingList.booksAvailable)
}

export {
  printBooks,
  clickHandler,
  renderAddedBooks,
  backToBooksAvailable
}

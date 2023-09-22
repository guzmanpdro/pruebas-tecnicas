// eslint-disable-next-line import/no-absolute-path
import arrowUpIcon from '/arrow_up.svg'

import {
  $booksContainer,
  $booksTemplate,
  $fragment
} from '../selectors'

import { clearHTMl } from '../utlis'

import { clickHandler } from '../functions'

class UI {
  constructor () {
    this.isOnBooksAvailable = true
    this.checkedGenre = 'Todos'
    this.booksContainer = document.querySelector('#booksContainer')
  }

  renderBooks (data) {
    const $listBooks = document.createElement('ul')
    $listBooks.classList.add('book-list')
    $listBooks.id = 'listBooks'

    data.forEach(book => {
      const { ISBN, cover, title } = book

      const $bookClone = $booksTemplate.content.cloneNode(true)
      const $bookImage = $bookClone.querySelector('#bookImage')
      const $bookTitle = $bookClone.querySelector('#bookTitle')
      const $bookButton = $bookClone.querySelector('#addBook')

      $bookImage.src = cover
      $bookTitle.textContent = title
      $bookButton.setAttribute('data-isbn', ISBN)
      $bookButton.addEventListener('click', (event) => clickHandler(ISBN, this.isOnBooksAvailable, event))

      this.isOnBooksAvailable ? $bookButton.textContent = 'Agregar' : $bookButton.textContent = 'Eliminar'

      $fragment.appendChild($bookClone)
    })

    clearHTMl($booksContainer)
    $listBooks.appendChild($fragment)
    $booksContainer.appendChild($listBooks)
  }

  renderEmptyLibrary (title, desc) {
    const $emptyLibrary = document.createElement('div')
    $emptyLibrary.classList.add('empty-library')

    const $infoContainer = document.createElement('div')
    $infoContainer.classList.add('info-container')

    const $arrowUpImage = document.createElement('img')
    $arrowUpImage.classList.add('arrow-up-animation')
    $arrowUpImage.src = `${arrowUpIcon}`
    $arrowUpImage.setAttribute('width', '180')
    $arrowUpImage.setAttribute('height', '180')

    const $emptyLibraryTitle = document.createElement('h2')
    $emptyLibraryTitle.classList.add('empty-library__title')
    $emptyLibraryTitle.textContent = title

    const $emptyLibraryDesc = document.createElement('p')
    $emptyLibraryDesc.classList.add('empty-library__text')
    $emptyLibraryDesc.textContent = desc

    $infoContainer.append($emptyLibraryTitle, $emptyLibraryDesc)

    $emptyLibrary.append($arrowUpImage, $infoContainer)

    $booksContainer.appendChild($emptyLibrary)
  }
}

export { UI }

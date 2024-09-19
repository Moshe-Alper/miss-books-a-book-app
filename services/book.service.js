import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minPrice: '' }
// _createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy
}
// later remove argument
function query(filterBy = {}) { 
    return new Promise((resolve, reject) => {
        let books = demoBooks()

        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            books = books.filter(book => regex.test(book.title))
        }
        if (filterBy.minPrice) {
            books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
        }

        resolve(books)
    })
    // return storageService.query(BOOK_KEY)
    //     .then(books => {
    //         if (gFilterBy.txt) {
    //             const regex = new RegExp(gFilterBy.txt, 'i')
    //             books = books.filter(book => regex.test(book.name))
    //         }
    //         if (gFilterBy.minPrice) {
    //             books = books.filter(book => book.maxPrice >= gFilterBy.minPrice)
    //         }
    //         return books
    //     })
}

function get(bookId) {
    return new Promise((resolve, reject) => {
        const books = demoBooks()
        const book = books.find(book => book.id === bookId)

        if (book) {
            resolve(book)
        } else {
            reject(`no id`)
        }
    })

    // return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(name = '', maxPrice = 0) {
    return { id: '', name, maxPrice }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

// function _createBooks() {
//     let books = utilService.loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = []
//         books.push(_createBook('audu', 300))
//         books.push(_createBook('fiak', 120))
//         books.push(_createBook('subali', 100))
//         books.push(_createBook('mitsu', 150))
//         utilService.saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createBook(name, maxPrice = 250) {
//     const book = getEmptyBook(name, maxPrice)
//     book.id = utilService.makeId()
//     return book
// }

function demoBooks() {
    return [
        {
            id: "OXeMG8wNskc",
            title: "Secret Histroy",
            listPrice: {
                amount: 109,
                currencyCode: "EUR",
                isOnSale: false
            }
        },
        {
            id: "JUbMihTkSrb",
            title: "Firestarter",
            listPrice: {
                amount: 50,
                currencyCode: "USD",
                isOnSale: true
            }
        },
        {
            id: "5zRrFSHbxMb",
            title: "Lord of the Rings",
            listPrice: {
                amount: 78,
                currencyCode: "NIS",
                isOnSale: false
            }
        }
    ]
}
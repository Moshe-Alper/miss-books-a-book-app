const { useEffect, useState } = React

import { BookDetails } from "./BookDetails.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "./BookFilter.jsx"
import { AppLoader } from "../cmps/AppLoader.jsx"
import { BookEdit } from "./BookEdit.jsx"

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())
    const [isEdit, setIsEdit] = useState(false)


    useEffect(() => {
        loadBooks()

    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting books:', err)
            })
    }


    function onSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onEditBook() {
        setIsEdit(true)
    }

    function onSaveBook(bookToSave) {
        bookService.save(bookToSave)
            .then(() => {
                setIsEdit(false)
                setSelectedBookId(null)
                loadBooks()
            })
            .catch(err => {
                console.log('Problem saving book:', err)
            })
    }


    function onRemoveBook(bookId) {
        const isConfirmed = confirm('Are you sure?')
        if (!isConfirmed) return
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }


    if (!books) return <AppLoader />

    return (
        <section className="book-index">

            <BookFilter
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy}
            />
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />

        </section>
    )
}
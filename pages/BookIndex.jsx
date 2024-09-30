const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM


import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "./BookFilter.jsx"
import { AppLoader } from "../cmps/AppLoader.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTruthyValues } from "../services/util.service.js"

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchPrms))


    useEffect(() => {
        console.log('books:', books)
        loadBooks()
        setSearchPrms(getTruthyValues(filterBy))
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting books:', err)
            })
    }


    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onRemoveBook(bookId) {
        const isConfirmed = confirm('Are you sure?')
        if (!isConfirmed) return
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg('Book removed successfully')
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg(`Problems removing book ${bookId}`)
            })
    }

    if (!books) return <AppLoader />

    return (
        <section className="book-index">

            <BookFilter
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy}
            />
            <section className="index-actions">
                <Link to="/BookIndex/edit" className="btn">Add Book</Link>
            </section>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}
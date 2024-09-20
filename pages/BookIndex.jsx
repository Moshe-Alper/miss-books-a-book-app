const { useEffect, useState } = React

import { BookDetails } from "./BookDetails.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "./BookFilter.jsx"
import { AppLoader } from "../cmps/AppLoader.jsx"

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())


    useEffect(() => {
        loadBooks()
        
    }, [filterBy])

    async function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problem getting books:', err)
            })
    }

    function onSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <AppLoader />
    return (
        <section className="book-index">
            {selectedBookId
                ? <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
                : <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList onSelectedBookId={onSelectedBookId} books={books} />
                </React.Fragment>
            }
        </section>
    )
}
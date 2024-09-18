const { useEffect, useState } = React

import { BookDetails } from "./BookDetails.jsx"
import { BookList } from "../assets/style/cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "./BookFilter.jsx"

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    async function loadBooks() {
        bookService.query()
            .then(setBooks)
            .catch(err => {
                console.log('Problem getting books:', err)
            })
    }

    function onSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <p>Loading...</p>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter />
                    <BookList onSelectedBookId={onSelectedBookId} books={books} />
                </React.Fragment>
            }
            {selectedBookId && <BookDetails bookId={selectedBookId} />}
        </section>
    )
}
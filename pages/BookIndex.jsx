const { useEffect, useState } = React

import { BookDetails } from "./BookDetails.jsx"
import { BookList } from "../assets/style/cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

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

    if (!books) return <p>Loading...</p>
    return (
        <section className="book-index">
            <BookList books={books} />
            {selectedBookId && <BookDetails bookId={selectedBookId}/>}
        </section>
    )
}
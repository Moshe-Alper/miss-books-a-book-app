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

    async function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.error('Problem getting books:', err)
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

    function onRemoveBook(bookId) {
        const isConfirmed = confirm('Are you sure?')
        if (!isConfirmed) return
        bookService.remove(bookId)
            .then(() => {
                setBooks(prev => [...prev.filte(book => book.id !== bookId)])
                    .catch(err => {
                        console.error('Problem deleting books:', err)
                    })
            })
    }

    if (!books) return <AppLoader />

    return (
        <section className="book-index">
            {isEdit && selectedBookId 
            ? (
                <BookEdit 
                bookId={selectedBookId} 
                onBack={() => setSelectedBookId(null)}
                />
            ) : selectedBookId ? (
                <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setSelectedBookId(null)}
                    onEditBook={onEditBook}
                />
            ) : (
                <React.Fragment>
                    <BookFilter
                        filterBy={filterBy}
                        onSetFilterBy={onSetFilterBy}
                    />
                    <BookList
                        books={books}
                        onSelectedBookId={onSelectedBookId}
                        onRemoveBook={onRemoveBook}
                    />
                </React.Fragment>
            )}
        </section>
    )
}
const { Link, useNavigate } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
import { AppLoader } from "../cmps/AppLoader.jsx"


export function BookAdd() {
    const navigate = useNavigate()

    const books = [
        { id: 1, title: 'The Hobbit' },
        { id: 2, title: '1984' },
        { id: 3, title: 'To Kill a Mockingbird' }
    ]

    function onSave(book) {
        bookService.addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`Couldn't save book`))
            .finally(() => navigate('/bookIndex'))
    }

    if (!books) return <AppLoader />
    return (
        <section className="add-book">
            <h1>Google search (first hard coded, later API)</h1>

            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} 
                        <button onClick={() => onSave(book)}>+</button> 
                    </li>
                ))}
            </ul>
        </section>
    )
}
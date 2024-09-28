const { useNavigate } = ReactRouterDOM
const { useState, useRef } = React


import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { SearchBooksList } from "./SearchBooksList.jsx"


export function BookAdd() {
    const [booksList, setBooksList] = useState()
    const navigate = useNavigate()
    const handleSearchDebounce = useRef(utilService.debounce(handleSearch, 2000))


    function handleSearch({ target }) {
        bookService.getGoogleBooks(target.value)
            .then(books => setBooksList(books))
    }

    function onSave(book) {
        bookService.addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`Couldn't save book`))
            .finally(() => navigate('/bookIndex'))
    }

    // if (!books) return <AppLoader />
    return (
        <section className="add-book">
            <h1>Google search:</h1>
            <input
                onChange={handleSearchDebounce.current}
                type="text" name='title'
                placeholder='Insert book name' />
            <button>Reset</button>
            {booksList && <SearchBooksList booksList={booksList} onSave={onSave} />}
            <h1>Add manually:</h1>
        </section>
    )
}
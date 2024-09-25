const { useNavigate, useParams } = ReactRouterDOM


import { AppLoader } from "../cmps/AppLoader.jsx";
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Problem getting book:', err)
                navigate('/bookIndex')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        if (field === 'price') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice: { ...prevBook.listPrice, amount: value }
            }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(book => {
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/bookIndex')
            })
    }


    if (!bookToEdit) return <AppLoader />

    const { title, listPrice } = bookToEdit
    const price = listPrice ? listPrice.amount : ''

    return (
        <section className="book-edit">
            <h1>{bookToEdit.id ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="price">Price:</label>
                <input value={price} onChange={handleChange} type="number" name="price" id="price" />
                <button>Save</button>
            </form>
        </section>
    )
}

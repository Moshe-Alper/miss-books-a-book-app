const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
            })
    }

    if (!book) return <div>Loading...</div>
    const { title, listPrice } = book
    const { amount, currencyCode } = listPrice

    return (
        <section className="book-details">
        <h2>Title: {title}</h2>
        <h2>Price: {amount}</h2>
        <h2>Currency: {currencyCode}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur necessitatibus magni eligendi qui aut suscipit tempora ipsa quia atque quas asperiores temporibus, sunt similique obcaecati veniam, enim reiciendis. Dolor, vel.</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
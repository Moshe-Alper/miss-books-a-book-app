const { useEffect, useState } = React

import { AppLoader } from "../cmps/AppLoader.jsx"
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

    if (!book) return <AppLoader />
    
    const { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice

    return (
        <section className="book-details">
            <h2>Title: {title}</h2>
            <h3>Subtitle: {subtitle}</h3>
            <h3>Authors: {authors.join(', ')}</h3>
            <h4>Published Date: {publishedDate}</h4>
            <h4>Page Count: {pageCount}</h4>
            <h4>Categories: {categories.join(', ')}</h4>
            <p>{description}</p>
            <img src={thumbnail} alt={`${title} cover`} />
            <h2>Price: {amount} {currencyCode} {isOnSale ? '(On Sale)' : ''}</h2>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
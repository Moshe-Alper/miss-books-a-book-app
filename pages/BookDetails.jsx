const { useEffect, useState } = React

import { AppLoader } from "../cmps/AppLoader.jsx"
import { bookService } from "../services/book.service.js"

export function BookDetails({ bookId, onBack, onEditBook }) {

    const [book, setBook] = useState(null)
    const [bookSpecs, setBookSpecs] = useState({ level: '', vintage: '', priceClass: '' })

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


    useEffect(() => {
        if (!book) return

        const bookSpecsFromBook = {
            level: getReadingLevel(book.pageCount),
            vintage: getVintageStatus(book.publishedDate),
            priceClass: getPriceClass(book.listPrice.amount),
        }
        setBookSpecs(prev => ({ ...prev, ...bookSpecsFromBook }))

    }, [book])


    function getReadingLevel(pageCount) {
        switch (true) {
            case (pageCount > 500):
                return 'Serious Reading'
            case (pageCount > 200):
                return 'Decent Reading'
            case (pageCount < 100):
                return 'Light Reading'
            default:
                return ''
        }
    }

    function getVintageStatus(publishedDate) {
        const currentDate = new Date()
        const bookDate = new Date(publishedDate)
        const diff = currentDate.getFullYear() - bookDate.getFullYear()

        if (diff > 10) return 'Vintage'
        if (diff < 1) return 'New'
        return ''
    }

    function getPriceClass(amount) {
        if (amount > 150) return 'price-red'
        if (amount < 20) return 'price-green'
        return ''
    }

    function getDefaultUrl(ev) {
        ev.target.src = 'https://via.placeholder.com/150'
    }

    if (!book) return <AppLoader />

    const { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice

    return (
        <section className="book-details">
            <h2>Title: {title}</h2>
            <h3>Subtitle: {subtitle}</h3>
            <h3>Authors: {authors.join(', ')}</h3>
            <h4>Published Date: {publishedDate} <span className="book-specs">{bookSpecs.vintage}</span></h4>
            <h4>Page Count: {pageCount} <span className="book-specs">{bookSpecs.level}</span></h4>
            <h4>Categories: {categories.join(', ')}</h4>
            <p>{description}</p>
            <img src={thumbnail} onError={getDefaultUrl} alt={`${title} cover`} />
            <h2>Price: <span className={getPriceClass(bookSpecs.priceClass)}>{amount} {currencyCode}</span> {isOnSale ? '(On Sale)' : ''}</h2>
            {isOnSale && <div className="on-sale-sign">On Sale!</div>}
            <button onClick={onBack}>Back</button>
            <button onClick={() => onEditBook(bookId)}>Edit</button>
        </section>
    )
}
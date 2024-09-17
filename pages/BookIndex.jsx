const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"


function demoBooks() {
    return [
        {
            id: "OXeMG8wNskc",
            title: "Secret Histroy",
            listPrice: {
                amount: 109,
                currencyCode: "EUR",
                isOnSale: false
            }
        },
        {
            id: "JUbMihTkSrb",
            title: "Firestarter",
            listPrice: {
                amount: 50,
                currencyCode: "USD",
                isOnSale: true
            }
        },
        {
            id: "5zRrFSHbxMb",
            title: "Lord of the Rings",
            listPrice: {
                amount: 78,
                currencyCode: "NIS",
                isOnSale: false
            }
        }
    ]
}


export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        const books = demoBooks()
        setBooks(books)
    }, [])

    return (
        <section className="book-index">
            <h1>Book Index</h1>
            {books ? (
                <ul>
                    {books.map(book => (
                        <li key={book.id}>
                            {book.title} - {book.listPrice.amount} {book.listPrice.currencyCode}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    )
}
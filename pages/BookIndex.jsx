const { useEffect, useState } = React

import { BookList } from "../assets/style/cmps/BookList.jsx"
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

    if (!books) return <p>Loading...</p>
    return (
        <section className="book-index">
                <BookList books={books}/>
        </section>
    )
}
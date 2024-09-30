const {useEffect, useState} = React
import { bookService } from '../services/book.service.js'


export function Dashboard() {


    const [books, setBooks] = useState([])
    const [categoryStats, setCategoryStats] = useState([])

    useEffect(() => {
        bookService.query()
            .then(setBooks)
        bookService.getCategoryStats()
            .then(setCategoryStats)
    }, [])
    console.log('categoryStats:', categoryStats)

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {books.length} Books</h2>
            <h4>By Category</h4>
        </section>
    )
}
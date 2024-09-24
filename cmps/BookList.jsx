const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="book-list clean-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="book-actions">
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button>
                            <Link to={`/BookIndex/${book.id}`}>Details</Link>
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )
}
import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onSelectedBookId, onRemoveBook }) {

    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="book-actions">
                        <button onClick={() => onSelectedBookId(book.id)}>Details</button>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}
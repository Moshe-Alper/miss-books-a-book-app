import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onSelectedBookId }) {

    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onSelectedBookId(book.id)}>Details</button>
                        <button>Edit</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}
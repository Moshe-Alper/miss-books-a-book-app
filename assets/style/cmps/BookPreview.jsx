export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Title: {book.title}</h2>
            <h3>Price: {book.listPrice.amount}</h3>
            <h4>Currency: {book.listPrice.currencyCode}</h4>
        </article>
    )
}

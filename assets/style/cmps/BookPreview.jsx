export function BookPreview({ book }) {
        const { title, listPrice } = book
        const { amount, currencyCode } = listPrice
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h3>Price: {amount}</h3>
            <h4>Currency: {currencyCode}</h4>
        </article>
    )
}

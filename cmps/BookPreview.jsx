export function BookPreview({ book }) {

    function getDefaultUrl(ev) {
        ev.target.src='https://via.placeholder.com/150'
    }

        const { title, listPrice, thumbnail } = book
        const { amount, currencyCode } = listPrice

    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h3>Price: {amount} {currencyCode}</h3>
            <img src={thumbnail}  onError={getDefaultUrl} alt="Book cover" />
        </article>
    )
}

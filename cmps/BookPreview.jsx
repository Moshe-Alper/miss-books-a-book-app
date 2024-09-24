import { utilService } from "../services/util.service.js"

export function BookPreview({ book }) {

    function getDefaultUrl(ev) {
        ev.target.src='https://via.placeholder.com/150'
    }
    
    const { title, thumbnail } = book
    const { amount = 'N/A', currencyCode = 'N/A' } = book.listPrice || {}
    
    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <h3>{amount} {utilService.getCurrencySign(currencyCode)}</h3>
            <img src={thumbnail}  onError={getDefaultUrl} alt="Book cover" />
        </article>
    )
}

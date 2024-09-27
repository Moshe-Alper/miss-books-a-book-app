const { useEffect, useState } = React
const {useParams, useNavigate, Link} = ReactRouterDOM

import { utilService } from "../services/util.service.js"
import { AppLoader } from "../cmps/AppLoader.jsx"
import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"


export function BookDetails() {

    const [book, setBook] = useState(null)
    const [bookSpecs, setBookSpecs] = useState({ level: '', vintageStatus: '', priceClass: '' })
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(null)


    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
                navigate('bookIndex')
            })
    }

function onBack() {
    navigate('/bookIndex')
}

    useEffect(() => {
        if (!book) return
        const bookSpecsFromBook = {
            level: getReadingLevel(book.pageCount),
            vintageStatus: getVintageStatus(book.publishedDate),
            priceClass: getPriceClass(book.listPrice.amount),
        }
        setBookSpecs(prev => ({ ...prev, ...bookSpecsFromBook }))

    }, [book])


    function getReadingLevel(pageCount) {
        switch (true) {
            case (pageCount > 500):
                return 'Serious Reading'
            case (pageCount > 200):
                return 'Decent Reading'
            case (pageCount < 100):
                return 'Light Reading'
            default:
                return ''
        }
    }

    function getVintageStatus(publishedDate) {
        const currentDate = new Date()
        const bookDate = new Date(publishedDate)
        const diff = currentDate.getFullYear() - bookDate.getFullYear()

        if (diff > 10) return 'Vintage'
        if (diff < 1) return 'New'
        return ''
    }

    function getPriceClass(amount) {
        if (amount > 150) return 'price-red'
        if (amount < 20) return 'price-green'
        return ''
    }

    function getDefaultUrl(ev) {
        ev.target.src = 'https://via.placeholder.com/150'
    }

    function onToggleReviewModal() {
        setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }

    function onSaveReview(reviewToAdd) {
        console.log('reviewToADD:', reviewToAdd)
        setIsLoadingReview(true)
        console.log('reviewToADD:', reviewToAdd)
        console.log('book.id:', book.id)
        bookService.saveReview(book.id, reviewToAdd)
            .then((review => {
                const reviews = [review, ...book.reviews]
                setBook({ ...book, reviews })
            }))
            .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
            .finally(() => setIsLoadingReview(false))
    }

    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook({ ...book, reviews: filteredReviews })
            })
            .finally(() => setIsLoadingReview(false))
    }


    if (!book) return <AppLoader />

    const { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice

    return (
        <section className="book-details">
            <img src={thumbnail} onError={getDefaultUrl} alt={`${title} cover`} />
            <p><span className="bold">Title:</span> <span>{title}</span></p>
            <p><span className="bold">Subtitle:</span> <span>{subtitle}</span></p>
            <p><span className="bold">Authors:</span> <span>{authors.join(', ')}</span></p>
            <p>
                <span className="bold">Published Date:</span> <span>{publishedDate} </span> 
                <span className="book-specs">{bookSpecs.vintageStatus}</span>
            </p>
            <p>
                <span className="bold">Page Count:</span> <span>{pageCount} </span> 
                <span className="book-specs">{bookSpecs.level}</span>
            </p>
            <p><span className="bold">Categories:</span> <span>{categories.join(', ')}</span></p>
            <LongTxt txt={description} length={4} />
            <p>
                <span className="bold">Price: </span> 
                <span className={bookSpecs.priceClass}>{amount} {utilService.getCurrencySign(currencyCode)}</span>
            </p>
            {isOnSale && <h2 className="on-sale-sign">On Sale!</h2>}

            <section className="details-actions">

            <button onClick={onBack}>Back</button>
            <button><Link to={`/BookIndex/edit/${book.id}`}>Edit</Link></button>
            </section>
            <button ><Link to={`/bookIndex/${book.prevBookId}`}>Prev Book</Link></button>
            <button ><Link to={`/bookIndex/${book.nextBookId}`}>Next Book</Link></button>

            <button onClick={onToggleReviewModal}>Add Review</button>
            {isShowReviewModal && (
                <AddReview
                    toggleReview={onToggleReviewModal}
                    saveReview={onSaveReview}
                />
            )}
            <div className='review-container'>
                {!isLoadingReview
                    ?<ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} /> 
                    : <AppLoader />
                }
                           
            </div>
        </section>
    )
}
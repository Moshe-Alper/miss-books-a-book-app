import { StarRating } from "./dynamic-inputs/StarRating.jsx"
import { TextboxRating } from "./TextboxRating.jsx"
import { SelectRating } from "./dynamic-inputs/SelectRating.jsx"

const { useState, useRef, useEffect } = React


export function AddReview({ saveReview, toggleReview }) {
    const inputRef = useRef()

    const [review, setReview] = useState({
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    })

    const { fullName, rating, date, txt } = review

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        saveReview(review)
        toggleReview()
    }

    function handleChange({ target }) {
        const { value, name: prop } = target
        setReview((prevReview) => ({ ...prevReview, [prop]: value }))
    }

    return (
        <section className="add-review">
            <form onSubmit={onAddReview} className='review-form'>
                <div className="review-modal">
                    <h1>Add Review</h1>
                    <button className='btn-toggle-modal'
                        onClick={toggleReview}>X
                    </button>

                    <label className='bold-txt' htmlFor='fullname'>Full name:</label>
                <input
                    autoFocus
                    ref={inputRef}
                    placeholder='Enter full name'
                    name='fullName'
                    type='text'
                    id='fullname'
                    value={fullName}
                    onChange={handleChange}
                    autoComplete='off'
                />
                <label className='bold-txt' htmlFor='date'>Date:</label>

                <input
                    type='date'
                    id='date'
                    name='date'
                    value={date}
                    onChange={handleChange}
                />

                <div className='rate-by-choice'>
                    <p className='bold-txt'>Select rating type:</p>
                </div>
                <StarRating handleChange={handleChange} rating={rating} />
                <SelectRating handleChange={handleChange} rating={rating} />
                <TextboxRating handleChange={handleChange} txt={txt} />

                    <button>Save</button>

                </div>
            </form>
        </section>


    )
}
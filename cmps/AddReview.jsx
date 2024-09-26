const { useState } = React


export function AddReview({ saveReview }) {

    const [review, setReview] = useState({
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    })

    function onAddReview(ev) {
        ev.preventDefault()
        console.log('review:', review)
        saveReview(review)
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
                    <label htmlFor='fullname'>Full name:</label>
                    <input
                        placeholder='Enter full name'
                        name='fullName'
                        type='text'
                        id='fullname'
                        value={fullName}
                        onChange={handleChange}
                    />
                    <label htmlFor='date'>Date:</label>
                    <input
                        type='date'
                        id='date'
                        name='date'
                        value={date}
                        onChange={handleChange}
                    />

                    <button>Save</button>

                </div>
            </form>
        </section>


    )
}
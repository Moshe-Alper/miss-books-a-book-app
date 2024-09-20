const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, minPrice } = filterByToEdit

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const isValid = txt && minPrice

    return (
        <section className="book-filter">
            <h2>Filter</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="txt">Name</label>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />

                <label htmlFor="minPrice">Price</label>
                <input value={minPrice || ''} onChange={handleChange} type="number" name="minPrice" id="minPrice" />

                <button disabled={!isValid}>Submit</button>
            </form>
        </section>
    )
}
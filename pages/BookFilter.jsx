const { useState } = React

export function BookFilter({ filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handleTxtChange(ev) {
        const value = ev.target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    }

    function handleMinPriceChange(ev) {
        const value = ev.target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, minPrice: value }))
    }


    const { txt, minPrice } = filterByToEdit

    // function onSubmit() {

    // }

    return (
        <section className="book-filter">
            <h2>Filter</h2>
            <form >
                <label htmlFor="txt">Name</label>
                <input value={txt} onChange={handleTxtChange} type="text" id="txt" />

                <label htmlFor="minPrice">Price</label>
                <input value={minPrice} onChange={handleMinPriceChange} type="number" id="minPrice" />

                <button>Submit</button>
            </form>
        </section>
    )
}
export function BookFilter() {

    return (
        <section className="book-filter">
            <h2>Filter</h2>
            <form>
                <label htmlFor="txt">Name</label>
                <input type="text"  id="txt" />

                <label htmlFor="price">Price</label>
                <input type="number" id="price" />

                <button>Submit</button>
            </form>
        </section>
    )
}
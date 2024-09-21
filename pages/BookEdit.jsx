const { useState, useEffect } = React

export function BookEdit({ bookId, onBack}) {

    return (
        <section className="book-edit">
            <h2>Edit</h2>
        <form action="">
            <input type="title" />
            <input type="price" />
        </form>
        <button onClick={onBack}>Back</button>

        </section>
    )
}
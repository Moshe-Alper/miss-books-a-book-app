const { useNavigate } = ReactRouterDOM


import { AppLoader } from "../cmps/AppLoader.jsx";
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()

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
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(book => {
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/bookIndex')
            })
    }


    if (!bookToEdit) return <AppLoader />

    const { title, price } = bookToEdit

    return (
        <section className="book-edit">
            <h1>Add Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="price">Price:</label>
                <input value={price} onChange={handleChange} type="number" name="price" id="price" />
                <button>Save</button>
            </form>
        </section>
    )
}
// export function BookEdit() {

//     const [bookToEdit, setBookToEdit] = useState(null)

//     console.log('bookToEdit', bookToEdit);

//     useEffect(() => {
//         loadBook()
//     }, [])

//     function loadBook() {
//         bookService.get(bookId)
//             .then(book => {
//                 setBookToEdit(book)
//             })
//             .catch(err => {
//                 console.error('Problem editing book', err)
//             })
//     }

//     function handleOnChange({ target }) {
//         const { name: field, type } = target
//         let { value } = target

//         switch (type) {
//             case 'number':
//             case 'range':
//                 value = +value
//                 break;

//             case 'checkbox':
//                 value = target.checked
//                 break
//         }

//         setBookToEdit(prevBook => {
//             if (field.startsWith('listPrice')) {
//                 const updatedField = field.split('.')[1]
//                 return {
//                     ...prevBook,
//                     listPrice: {
//                         ...prevBook.listPrice,
//                         [updatedField]: value
//                     }
//                 }
//             }

//             return {
//                 ...prevBook,
//                 [field]: value
//             }
//         })
//     }

//     function onSubmit(ev) {
//         ev.preventDefault()
//         // console.log(ev.target.checkValidity())
//         onSaveBook(bookToEdit)
//     }


//     if (!bookToEdit) return <AppLoader />

//     return (
//         <section className="book-edit">
//             <h2>Edit Book</h2>
//             <form onSubmit={onSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="title">Title:</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={bookToEdit.title}
//                         onChange={handleOnChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="price">Price:</label>
//                     <input
//                         type="number"
//                         id="price"
//                         name="listPrice.amount"
//                         value={bookToEdit.listPrice.amount}
//                         onChange={handleOnChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="description">Description:</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={bookToEdit.description}
//                         onChange={handleOnChange}
//                         required
//                     ></textarea>
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="authors">Authors:</label>
//                     <input
//                         type="text"
//                         id="authors"
//                         name="authors"
//                         value={bookToEdit.authors.join(', ')}
//                         onChange={handleOnChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="publishedDate">Published Date:</label>
//                     <input
//                         type="number"
//                         id="publishedDate"
//                         name="publishedDate"
//                         value={bookToEdit.publishedDate}
//                         onChange={handleOnChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="categories">Categories:</label>
//                     <input
//                         type="text"
//                         id="categories"
//                         name="categories"
//                         value={bookToEdit.categories.join(', ')}
//                         onChange={handleOnChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="isOnSale">On Sale:</label>
//                     <input
//                         type="checkbox"
//                         id="isOnSale"
//                         name="listPrice.isOnSale"
//                         checked={bookToEdit.listPrice.isOnSale}
//                         onChange={handleOnChange}
//                     />
//                 </div>

//                 <div className="form-actions">
//                     <button type="submit">Save</button>
//                     <button type="button" onClick={onBack}>Back</button>
//                 </div>
//             </form>
//         </section>
//     )
// }
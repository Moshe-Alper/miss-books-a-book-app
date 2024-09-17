const { useState } = React

import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { HomePage } from './pages/HomePage.jsx'

export function App() {

    const [page, setPage] = useState('book')

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <section className="app">
            <AppHeader onSetPage={onSetPage}/>

            <main className="container">
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}
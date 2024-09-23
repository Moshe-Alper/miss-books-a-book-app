const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Team } from './cmps/Team.jsx'
import { Vision } from './cmps/Vision.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { HomePage } from './pages/HomePage.jsx'

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main className="container">
                    <Routes>
                        <Route path='/' element={<Navigate to="/homePage" />} />
                        <Route path='/home' element={<Navigate to="/homePage" />} />
                        <Route path='/homePage' element={<HomePage />} />
                        <Route path='/AboutUs' element={<AboutUs />} >
                            <Route path='/AboutUs/Team' element={<Team />} /> {/* Nested route */}
                            <Route path='/AboutUs/Vision' element={<Vision />} /> {/* Nested route */}
                        </Route>
                        <Route path='/BookIndex' element={<BookIndex />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}
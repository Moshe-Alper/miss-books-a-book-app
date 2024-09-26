const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AboutGoal } from './cmps/AboutGoal.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main className="container">
                    <Routes>
                        <Route path="/" element={<Navigate to="/homePage" />} />
                        <Route path="/home" element={<Navigate to="/homePage" />} />
                        <Route path="/homePage" element={<HomePage />} />
                        <Route path="/AboutUs" element={<AboutUs />} >
                            <Route path="/AboutUs/AboutTeam" element={<AboutTeam />} /> {/* Nested route */}
                            <Route path="/AboutUs/AboutGoal" element={<AboutGoal />} /> {/* Nested route */}
                        </Route>
                        <Route path="/BookIndex" element={<BookIndex />} />
                        <Route path="/BookIndex/:bookId" element={<BookDetails />} />
                        <Route path="/BookIndex/edit" element={<BookEdit />} />
                        <Route path="/BookIndex/edit/:bookId" element={<BookEdit />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}
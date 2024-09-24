
const { NavLink } = ReactRouterDOM

export function AppHeader() {


    const links = [
        { title: 'Home', href: '/homePage' },
        { title: 'About', href: '/aboutUs' },
        { title: 'Book', href: '/bookIndex' }
    ]
    
    return (
        <header className="app-header full main-layout">
            <section>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    {links.map((link, idx) => {
                        return <NavLink to={link.href} key={idx} title={link.title}>{link.title}</NavLink>
                    })}
                </nav>
            </section>
        </header>
    )
}
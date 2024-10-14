const { NavLink } = ReactRouterDOM

export function AppHeader() {
    const links = [
        { title: 'Back to Appsus', href: 'https://moshe-alper.github.io/Proj-Appsus-24/', external: true },
        // { title: 'Home', href: '/homePage', external: false },
        // { title: 'About', href: '/aboutUs', external: false },
        { title: 'Dashboard', href: '/dashboard', external: false },
        { title: 'Book', href: '/bookIndex', external: false }
    ]

    return (
        <header className="app-header full main-layout">
            <section>
                <h1 className="logo">Miss Books</h1>
                <nav className="app-nav">
                    {links.map((link, idx) => {
                        return link.external ? (
                            <a href={link.href} key={idx} title={link.title} target="_blank" rel="noopener noreferrer">
                                {link.title}
                            </a>
                        ) : (
                            <NavLink to={link.href} key={idx} title={link.title}>
                                {link.title}
                            </NavLink>
                        )
                    })}
                </nav>
            </section>
        </header>
    )
}
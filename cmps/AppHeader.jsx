
export function AppHeader({ onSetPage }) {

    const links = [
        { title: 'Home', href: 'home' },
        { title: 'About', href: 'about' },
        { title: 'Book', href: 'book' }
    ]

    return (
        <header className="app-header full main-layout">
            <section>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    {links.map((link, idx) => {
                        return <a key={idx} title={link.title} onClick={() => onSetPage(link.href)} >{link.title}</a>
                    })}
                </nav>
            </section>
        </header>
    )
}
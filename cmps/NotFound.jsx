
const { Link } = ReactRouterDOM


export function NotFound() {

    return (
        <section className="not-found-container">

            <section className="not-found">
            <h1>Oops! Page Not Found</h1>
            <h2>We can't seem to find the page you're looking for.</h2>
            </section>
            <Link to='/' className="btn">Back</Link>
        </section>

    )
}
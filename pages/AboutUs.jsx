const { Outlet, Link } = ReactRouterDOM

export function AboutUs() {

    return (
        <section className="about-us">
            <h1>About Miss Books</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore sapiente, iste animi corporis nisi atque tempora assumenda dolores. Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!</p>
            <nav>
            <Link to="/AboutUs/AboutTeam">Team</Link>
            <Link to="/AboutUs/AboutGoal">Goal</Link>
            </nav>
            <Outlet />
        </section>
    )
}
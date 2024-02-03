import {Link, Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">users list</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add" className="nav-link">add user</Link>
                        </li>
                    </ul>
                </div>

            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
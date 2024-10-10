import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    return (
        <nav id='navbar'>
            <h1>Party Time</h1>
            <ul>
                <li>
                    <NavLink to="/" className="btn">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/party/new" className="btn newParty">Create Party</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <nav className="nav bg-dark">
            < Link className="px-3" to={'/'}> List Users</Link>
            < Link className="px-3" to={'/create-user'}> Create User</Link>
        </nav>
    )
}
export default NavBar
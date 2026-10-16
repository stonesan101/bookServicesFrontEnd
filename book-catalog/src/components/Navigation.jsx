import { Link ,useLocation} from "react-router-dom";
import { Home, BookOpen, Settings } from "lucide-react";
function Navigation() {
    const location = useLocation();

    const isManagePage = location.pathname === "/manage";
    const pageTitle = isManagePage ? "Manage Books" : "Catalog";
    return (
        <header className="app-header">
            <Link to="/" className="brand">
                <BookOpen size={32} strokeWidth={2.2} />
                <span className="brand-text">{pageTitle}</span>
            </Link>
        <nav>
            <Link to="/">Catalog</Link>
            <Link to="/manage">Manage Books</Link>
        </nav>
        </header>
    );
}
export default Navigation;
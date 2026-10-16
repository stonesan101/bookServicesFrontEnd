import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog.jsx";
import ManageBooks from "./pages/ManageBooks.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/manage" element={<ManageBooks />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


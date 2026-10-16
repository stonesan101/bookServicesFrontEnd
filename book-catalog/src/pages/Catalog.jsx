import {useState, useEffect} from "react";
import {BookCard} from "../components/BookCard.jsx";

function Catalog() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setBooks(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [])


    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    function handleAddToCart(book) {
        // placeholder for adding book to cart logic
        console.log(`Added ${book.title} to cart`)
    }

    return (<main>
        <div className="catalog-header">
            <h1>Find your next favorite book</h1>
            <p className="page-description">Welcome to the Book Catalog! Browse our collection of books and find your
                next great read.</p>
            {loading && <p>Loading...</p>}
            {error && <p role="alert">could not load catalog: {error.message}</p>}

            {!loading && !error && books.length === 0 && (<p>We have no books available.</p>)}

            {!loading && !error && books.length > 0 && (<div className="book-grid">
                {books.map((book) => (<BookCard key={book.id} book={book} onAddToCart={handleAddToCart}/>))}
            </div>)}
        </div>
    </main>)
}


export default Catalog
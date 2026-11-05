import "../App.jsx"
import {BookOpen, ShoppingCart} from "lucide-react";

export function BookCard({book, onAddToCart}) {
    return (
        <article className="book-card">

            <div className="book-cover">
                {book.imageUrl ? <img src={book.imageUrl} alt={book.title} loading="lazy"/> : (<div className="book-cover-placeholder">
                    <BookOpen size={18} strokeWidth={1.5}/>
                </div>)}
            </div>
            <div className="book-card-content">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-price">{book.price.toFixed(2)}</p>
                <p className="book-description">{book.description}</p>
            <button className="button button-primary" onClick={() => onAddToCart?.(book)}>
                <ShoppingCart size={18} strokeWidth={1.5} />
                Buy
            </button>
            </div>
        </article>
    )
}

export default BookCard
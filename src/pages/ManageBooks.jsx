import {useEffect, useState} from "react";
import BookForm from "../components/BookForm.jsx";

function manageBooks() {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    function loadBooks() {
        fetch('http://localhost:8080/books')
            .then((response) => response.json()).then(data => setBooks(data));
    }

    function deleteBook(id) {
        fetch(`http://localhost:8080/books/${id}`, {
            method: 'DELETE'
        }).then((response) => {
            console.log(`Deleted book with id ${id}`);
            if (!response.ok) {
                throw new Error('Failed to delete book');
            }
            loadBooks()
        })

    }


    useEffect(() => {
        loadBooks();
    }, [])


    return (<main>
        <h1>Manage Books</h1>
        <p className="page-description">Welcome to the Book Management page!</p>
        <section className="panel">
        <BookForm
            book={editingBook}
            onSaved={loadBooks}
            onCancelEdit={() => setEditingBook(null)}/></section>
        <div className="table-wrapper">
        <section className="panel">
        <table>
            <thead>
            <tr>

                <th>id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (<tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <td>
                    <button className="button button-primary" onClick={() => setEditingBook(book)}>Edit</button>
                    <button  className="button button-danger" onClick={() => deleteBook(book.id)}>Delete</button>
                </td>
            </tr>))}
            </tbody>
        </table>
        </section>
  </div>
    </main>)
}

export default manageBooks;
import {useEffect, useState} from "react";
import {Plus, Save, Trash, RotateCcw, X} from "lucide-react";

function BookForm({book, onSaved, onCancelEdit}) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const isEditing = book !== null;

    useEffect(() => {
        setTitle(book?.title ?? '');
        setAuthor(book?.author ?? '');
        setPrice(book?.price ?? '');
        setSubmitted(false);
    }, [book]);

    function handleCancelEdit() {
        setTitle('');
        setAuthor('');
        setPrice('');
        onCancelEdit();
    }

    function handleSubmit(event) {

        event.preventDefault();


            const bookData = {"title": title, "author": author, "price": price};

            let url = 'http://localhost:8080/books';
            let method = 'POST';
            if (isEditing) {
                url = `http://localhost:8080/books/${book.id}`
                method = 'PUT'

            }


            fetch('http://localhost:8080/books', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(bookData)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to ${isEditing ? 'update' : 'create'} book`);
                }
                return response.json();
            }).then((data) => {
                setTitle('');
                setAuthor('');
                setPrice('');
                onSaved();
            }).catch((error) => {
                console.error('Error saving book:', error);
            })

    }

    return (<form className="book-form" onSubmit={handleSubmit}>
        <div className="form-field">
            <label htmlFor="title">Title:
                <input placeholder="Enter book title" type="text" id="title" name="title" value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       required/>
            </label>
        </div>
        <div className="form-field">
            <label htmlFor="author">Author:
                <input placeholder="Enter book author" type="text" id="author" name="author" value={author}
                       onChange={(e) => setAuthor(e.target.value)}
                       required/>
            </label>
        </div>
        <div className="form-field">
            <label htmlFor="price">price:
                <input placeholder="Enter book price" type="number" id="price" name="price" value={price}
                       onChange={(e) => setPrice( e.target.value < 0 ? '' :e.target.value.replace(/^0/,""))}
                       required/>
            </label>
        </div>

        <div className="form-actions button button-secondary">
            <button type="submit">{isEditing ? (<><Save size={18}/> Update Book</>) : (<><Plus size={18}/>Add
                Book</>)}</button>
        </div>

        {isEditing && <div className="form-actions button">
            <button type="button" onClick={handleCancelEdit}><><X size={18}/>Cancel</>
            </button>
        </div>}
    </form>)

}

export default BookForm
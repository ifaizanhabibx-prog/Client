import React, { useState, useEffect }  from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AddBookProps {
    // onBookAdded: ( book: { title: string; author: string; year: number }) => void;
    onBookAdded: () => void; // This will refresh the list after a book is added
    editingBook: any;
    cancelEdit: () => void;
}

const AddBook = ({ onBookAdded, editingBook, cancelEdit }: AddBookProps) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
    })
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // When editingBook changes, fill the form
    useEffect(() => {
        if (editingBook) {
            setFormData({
                title: editingBook.title,
                author: editingBook.author,
                description: editingBook.description
            })
        } else {
            setFormData({ title: '', author: '', description: '' });
        }
    }, [editingBook]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBook) {
                // UPDATE existing book
                await axios.put(`http://localhost:5000/api/books/${editingBook._id}`, formData);

            } else {
                // CREATE new book
                await axios.post(`http://localhost:5000/api/books`, formData);
            }
            setFormData({ title: "", author: "", description: "" });
            cancelEdit(); // Reset state
            onBookAdded(); // Refresh the book list
        } catch (err) {
            console.error(err);
        }  
    };

    const handleDelete = async (id: String) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`);
            onBookAdded();
            toast.success("Book removed from library");
        } catch (err) {
            toast.error("Could not connect to server");
            console.error(err);
        }
    }
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{editingBook ? "Edit Book" : "Add New Book"}</h2>
        <div className="space-y-3">
            <input type="text" className="w-full p-2 border-rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Book Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required/>

            <input type="text" className="w-full p-2 border-rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required/>

            <textarea name="description" className="w-full p-2 border-rounded" placeholder="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>

            <div className="max-w-md mx-auto mb-8">
                        <input type="text" placeholder="Search by title or author..."
                         value={searchTerm} className="w-full p-2 rounded-lg border border-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" onChange={(e) => setSearchTerm(e.target.value)}/>
                    </div>

            <button type="submit" className="w-full bg-green-600 text-white-primary py-2-rounded hover:bg-green-700 transition">{editingBook ? "save Changes" : "Add to Library"}</button>
            {editingBook && (
                <button onClick={cancelEdit} className="text-gray-500 text-xs w-full mt-2">Cancel</button>
            )}

        </div>
    </form>
    )
}

export default AddBook;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../App"; 

interface BookListProps {
  books: Book[];
  fetchBooks: () => void;
  loading: boolean;
}

const BookList: React.FC<BookListProps> = ({ books, fetchBooks, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-10">Loading Library...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-600 underline">Digital Library</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search titles or authors..."
            className="p-2 border rounded-lg flex-grow md:w-64 outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/add-book" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + New Book
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book._id} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
            <p className="text-blue-500 font-medium mb-3">by {book.author}</p>
            <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
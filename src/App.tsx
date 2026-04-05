import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// 1. Export the interface so BookList.tsx can use it
export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
}

function App() {
  // 2. Consistent naming: use 'books' and 'setBooks'
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 3. Move fetchBooks OUTSIDE useEffect so it is globally available
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      // FIXED: response.data is a property
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 p-4 text-white shadow-lg">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold hover:text-blue-200">
              📚 Digital Library
            </Link>
            <Link to="/add-book" className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 transition">
              + Add New Book
            </Link>
          </div>
        </nav>

        <header className="max-w-6xl mx-auto mt-10 px-4">
          <h1 className="text-4xl font-extrabold text-gray-900">Library Dashboard</h1>
          <p className="text-gray-500">Managing {books.length} books in the cloud</p>
        </header>

        <main className="max-w-6xl mx-auto py-8 px-4">
          <Routes>
  <Route 
    path="/" 
    element={
      <BookList 
        books={books}           // Required property
        fetchBooks={fetchBooks} // Required property
        loading={loading}       // Required property
      />
    } 
  />
  <Route 
    path="/add-book" 
    element={
      <AddBook 
        onBookAdded={fetchBooks} 
        editingBook={null}      // Required for your AddBookProps
        cancelEdit={() => {}}   // Required for your AddBookProps
      />
    } 
  />
</Routes>
        </main>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </Router>
  );
}

export default App;
import { useState, useEffect } from "react";
import "./index.css";
import { motion } from "framer-motion";
import bookIcon from './assets/book-icon.png';


<motion.button
  whileTap={{ scale: 0.85 }}
>
  +
</motion.button>
// Task 5: Book Counter App
// This app allows users to count different books, incrementing or decrementing their counts.

type Book = {
  name: string;
  count: number;
  initial?: boolean;
  // initial?: boolean; // This property is not used in the current implementation, but can be useful for future enhancements.
};

const initialBooks: Book[] = [
  { name: "Poetry", count: 0 },
  { name: "Novel", count: 0 },
  { name: "Biography", count: 0 },
];

function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : initialBooks;
  });
  const [newBooks, setNewBooks] = useState("");
    // Save to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

const increment = (index: number) => {
  const updated = [...books];
  updated[index].count++;
  setBooks(updated);
};

const decrement = (index: number) => {
  const updated = [...books];
  updated[index].count = Math.max(0, updated[index].count - 1);
  setBooks(updated);
};

const reset = () => {
  const resetBooks = books.map(f => ({ ...f, count: 0 }));
  setBooks(resetBooks);
};

const total = books.reduce((sum, book) => sum + book.count, 0);

const removeBook = (index: number) => {
  setBooks(books.filter((_, i) => i !== index));
};

const addBooks = () => {
  const trimmed = newBooks.trim();
  if (trimmed && !books.some(f => f.name === trimmed)) {
    setBooks([...books, { name: trimmed, count: 0 }]);
    setNewBooks("");
  }
};

  return (
    <div style={{
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#181818"
    }}>
      <div style={styles.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.7rem", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          <img src={bookIcon} alt="Book Icon" className="book-icon" style={{ width: "40px", height: "40px", display: "block", margin: 0, padding: 0, verticalAlign:"middle" }} />
          <h2 style={{ 
            ...styles.title, 
            margin: 0, 
            lineHeight: "32px", 
            display: "flex", 
            alignItems: "center" 
          }}>Book Counter</h2>
        </div>
        <ul style={styles.list}>
          {books.map((books, index) => (
            <li key={books.name} style={styles.item}>
              <span>{books.name}: {books.count}</span>
              <div style={styles.buttons}>
                <button onClick={() => decrement(index)}>-</button>
                <button onClick={() => increment(index)}>+</button>
                {!books.initial && (
                  <button
                    onClick={() => removeBook(index)}
                    style={{
                      background: "rgba(255, 82, 82, 0.3)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "0 8px",
                      cursor: "pointer"
                    }}
                    >Remove
                    </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div style={styles.total}>Total: {total}</div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Add new Books"
            value={newBooks}
            onChange={e => setNewBooks(e.target.value)}
            style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #444", background: "#222", color: "white" }}
          />
          <button onClick={addBooks}>Add</button>
        </div>

        <button onClick={reset} style={{ marginTop: "1rem" }}>Reset</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#1e1e1e",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
    width: "350px",
    textAlign: "center" as const,
    color: "white",
  } as React.CSSProperties,
  title: {
    marginBottom: "1rem",
    color: "#ff5252",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textShadow: "0 0 5px rgba(255, 82, 82, 0.5)",
    fontFamily: "'Roboto', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    lineHeight: "1.2",
    fontStyle: "italic",
    background: "linear-gradient(45deg, #ff5252, #ff4081)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "200% 200%",
    animation: "gradient 5s ease infinite",
  } as React.CSSProperties,
  list: {
    listStyle: "none",
    padding: 0,
  } as React.CSSProperties,
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.8rem",
    background: "#2e2e2e",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
  } as React.CSSProperties,
  buttons: {
    display: "flex",
    gap: "0.5rem",
  } as React.CSSProperties,
  total: {
    marginTop: "1.2rem",
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "#00e676",
  } as React.CSSProperties
};

export default App;

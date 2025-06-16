
# Book Counter

I used React's useState to store the state of each item in an object, with the item name as the key and the quantity as the value
I chose this approach because it is scalable - if I want to add more items, I don't have to change the logic for each one
I added a Remove button to delete new items added with the Add button in the "Add new Book" input section
The initial books are marked so that they can be removed.
A "Remove" button is displayed only for non-initial books.
A remove button is added.

In the code I added:

type Book = {
  name: string;
  count: number;
  initial?: boolean; // Add this property !!!
};

const removeBook = (index: number) => {
  setBooks(books.filter((_, i) => i !== index));
};

// add this to the existing code
   {!book.initial && (
          <button
            onClick={() => removeBook(index)}
            style={{
              background: "#ff5252",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "0 8px",
              cursor: "pointer"
            }}

To save and load your books data using localStorage: 
1. Load books from localStorage on app start.
2. Save books to localStorage whenever they change.

In the existing code "function App (), I added:
 const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : initialBooks;
  });
  const [newBooks, setNewBooks] = useState("");
    useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

// On first load, it tries to get books from localStorage. If none, it uses your default initialBooks
// Every time books changes, it saves the new value to localStorage
// Thus, the data remains saved even after the user closes the browser.
// Now your book list and counts will persist across page reloads.
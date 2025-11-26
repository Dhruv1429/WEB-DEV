console.log("Script loaded successfully!"); // Check console to see this

// 1. DATA: Array of Book Objects
const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.99,
        category: "Fiction",
        image: "gatsby.png",
        link: "https://www.amazon.com/s?k=The+Great+Gatsby" 
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 34.50,
        category: "Technology",
        image: "clean.png",
        link: "https://www.amazon.com/s?k=Clean+Code+Robert+Martin"
    },
    {
        id: 3,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 12.99,
        category: "Fiction",
        image: "alchemist.png",
        link: "https://www.amazon.com/s?k=The+Alchemist+Paulo+Coelho"
    },
    {
        id: 4,
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        price: 24.00,
        category: "Technology",
        image: "java.png",
        link: "https://www.amazon.com/s?k=JavaScript+The+Good+Parts"
    },
    {
        id: 5,
        title: "1984",
        author: "George Orwell",
        price: 9.99,
        category: "Fiction",
        image: "1984.png",
        link: "https://www.amazon.com/s?k=1984+George+Orwell"
    },
    {
        id: 6,
        title: "Design Patterns",
        author: "Erich Gamma",
        price: 45.00,
        category: "Technology",
        image: "design.png",
        link: "https://www.amazon.com/s?k=Design+Patterns+Erich+Gamma"
    }
];

// 2. SELECTION: Get the DOM element
const bookContainer = document.getElementById('book-list-container');

// Check if container exists to prevent errors
if(bookContainer) {
    
    // 3. FUNCTION: Render books
    function displayBooks(bookArray) {
        bookContainer.innerHTML = ''; // Clear existing content

        bookArray.forEach(book => {
            const bookCard = `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="book-img-container rounded-top">
                            <img src="${book.image}" class="img-fluid" alt="${book.title}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <span class="badge bg-secondary w-25 mb-2">${book.category}</span>
                            <h5 class="card-title fw-bold">${book.title}</h5>
                            <p class="card-text text-muted mb-4">by ${book.author}</p>
                            
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <span class="h5 mb-0 text-primary">$${book.price.toFixed(2)}</span>
                                <a href="${book.link}" target="_blank" class="btn btn-primary btn-sm">Buy Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            bookContainer.innerHTML += bookCard;
        });
    }

    // 4. INITIALIZATION
    displayBooks(books);

} else {
    console.error("Error: Could not find element with id 'book-list-container'");
}
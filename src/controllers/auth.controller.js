
const fs = require("fs");
const path = require("path");

const filePath = path.rosolve(__dirname,"../data/libro.json");

const readUSers = () => {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
}

const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

const registerBook = (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        
     
        if(!title || !author){
            return res.status(400).json({
                success: false,
                message: 'Se requiere Título y Autor'
            });
        }
        
        const books = readBooks();
        
      
        const exists = books.find((book) => 
            book.title.toLowerCase() === title.toLowerCase() && 
            book.author.toLowerCase() === author.toLowerCase()
        );
        
        if(exists){
            return res.status(409).json({
                success: false,
                message: "El libro ya existe en la biblioteca"
            });
        }
        
        
        const newBook = {
            id: crypto.randomUUID(),
            title,
            author,
            year: year || null,
            genre: genre || null,
            createdAt: new Date().toISOString(),
            available: true
        };
        
        books.push(newBook);
        
      
        const saved = writeBooks(books);
        
        if(!saved){
            return res.status(500).json({
                success: false,
                message: "Error al guardar el libro"
            });
        }
        
        res.status(201).json({
            success: true,
            data: newBook,
            message: "Libro agregado exitosamente"
        });
        
    } catch (error) {
        console.error('Error in registerBook:', error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
};
const readBooks = () => {
    try {
        if (!fs.existsSync(DB_PATH)) {
            return [];
        }
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading books:', error);
        return [];
    }
};

const writeBooks = (books) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(books, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing books:', error);
        return false;
    }
};
const getBooks = (req, res) => {
    try {
        const books = readBooks();
        const { id, author, genre, available } = req.query;
        
        let filteredBooks = [...books];
        
        
        if (id) {
            filteredBooks = filteredBooks.filter(book => book.id === id);
        }
        
       
        if (author) {
            filteredBooks = filteredBooks.filter(book => 
                book.author.toLowerCase().includes(author.toLowerCase())
            );
        }
        
        
        if (genre) {
            filteredBooks = filteredBooks.filter(book => 
                book.genre && book.genre.toLowerCase().includes(genre.toLowerCase())
            );
        }
        
        
        if (available !== undefined) {
            const isAvailable = available === 'true';
            filteredBooks = filteredBooks.filter(book => book.available === isAvailable);
        }
        
        if (id && filteredBooks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Libro no encontrado"
            });
        }
        
        res.status(200).json({
            success: true,
            count: filteredBooks.length,
            data: filteredBooks
        });
        
    } catch (error) {
        console.error('Error in getBooks:', error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los libros"
        });
    }
};
const deleteBook = (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Se requiere el ID del libro"
            });
        }
        
        const books = readBooks();
        
       
        const bookIndex = books.findIndex(book => book.id === id);
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Libro no encontrado"
            });
        }
        
       
        const deletedBook = books[bookIndex];
        
       
        books.splice(bookIndex, 1);
        
        
        const saved = writeBooks(books);
        
        if (!saved) {
            return res.status(500).json({
                success: false,
                message: "Error al eliminar el libro"
            });
        }
        
        res.status(200).json({
            success: true,
            data: deletedBook,
            message: "Libro eliminado exitosamente"
        });
        
    } catch (error) {
        console.error('Error in deleteBook:', error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
};
module.exports = {
    register
}
# Books API Overview
The Books API lets you work with books. You can do things like getting books, adding new ones, and searching.

## How to use the API
The API is REST-based. All data is JSON. Make sure to set the right headers.

## Working with Books
Books have properties like name, author, and other details. Each book gets an ID when you create it.

### Getting a single book
You can get a book by its ID. Just make a GET request to `/books/{id}` where `{id}` is the book's ID number.

The response looks something like:
```
{"book_id": 123, "name": "some book", "writer": "author name", "pages": 250, "available": true}
```

### Getting multiple books
To see all books, make a GET request to `/books`. You can add `?page=1&limit=10` to control how many you get back.

You'll get an array of books back, but with less information:
```
[{"book_id": 123, "name": "book1"}, {"book_id": 124, "name": "book2"}]
```
### Adding new books
POST to `/books` with the book data in the request body. Include the name, author, and ISBN.

### Updating new books
Use PUT to `/books/{id}` with the fields you want to change.

### Removing new books
DELETE `/books/{id}` to remove a book. You'll get a confirmation message.

### Finding new books
You can search by making a GET request to `/books/search?q=title` where title is what
you're looking for.

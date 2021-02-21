import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { Col, Row, Button, Container } from "react-bootstrap";


function Saved() {
    // Setting our component's initial state
    const [books, setBooks] = useState([])

    // Load all books and store them with setBooks
    useEffect(() => {
        loadBooks()
    }, [])

    // Loads all books and sets them to books
    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err));
    }

    return (
        <Container fluid>
            <Row>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>Saved List</h1>
                    </Jumbotron>
                    {books.length ? (
                        <List>
                            {books.map(book => (
                                <ListItem key={book._id}>
                                    <Row>

                                        <img src={book.image} alt={book.title} />

                                        <Col size="md-10 md-offset-1">
                                            <article>
                                                <h2>{book.title}</h2>
                                                <h3> by {book.authors}</h3>
                                                <h5>Description</h5>
                                                <p>
                                                    {book.description}
                                                </p>
                                            </article>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Button className="btn btn-primary" href={book.link} target="_blank">View</Button>
                                        <Button className="btn btn-primary" onClick={() => deleteBook(book._id)}>Delete</Button>
                                    </Row>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
                </Col>
            </Row>
        </Container>
    );
}

export default Saved;

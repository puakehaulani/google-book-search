import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Search() {
    // Setting our component's initial state
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({})

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

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveBook({
                title: formObject.title,
                author: formObject.author,
                synopsis: formObject.synopsis
            })
                .then(res => loadBooks())
                .catch(err => console.log(err));
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>What Books Should I Read?</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Title (required)"
                        />
                        <Input
                            onChange={handleInputChange}
                            name="author"
                            placeholder="Author (required)"
                        />
                        <FormBtn
                            disabled={!(formObject.author && formObject.title)}
                            onClick={handleFormSubmit}
                        >
                            Submit Book
              </FormBtn>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>Results</h1>
                    </Jumbotron>
                    {books.length ? (
                        <List>
                            {books.map(book => (
                                <ListItem key={book._id}>
                                    <a href={book.url}>
                                        <strong>
                                            {book.title} by {book.author}
                                        </strong>
                                    </a>
                                    <Row>
                                        <Col>
                                            <img src={book.image} />
                                        </Col>
                                        <Col size="md-10 md-offset-1">
                                            <article>
                                                <h1>Description</h1>
                                                <p>
                                                    {book.description}
                                                </p>
                                            </article>
                                        </Col>
                                    </Row>

                                    <Button>View</Button>
                                    <Button>Add</Button>
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


export default Search;

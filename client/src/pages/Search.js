import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Search() {
    // Setting our component's initial state
    const [formObject, setFormObject] = useState({})
    const [resultsList, setResultsList] = useState({});

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };


    function handleFormSubmit(event) {
        event.preventDefault();
        const title = formObject.title
        API.googleBook(title)
            .then(res =>
                setResultsList(res.data.items)
            )
            .catch(err => console.log(err));

    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>What Books Should I Read?</h1>
                        <div className="input-group">
                            <Input
                                onChange={handleInputChange}
                                name="title"
                                placeholder="Title (required)"
                            />
                            <button className="btn btn-primary input-group-append"
                                disabled={!(formObject.title)}
                                onClick={handleFormSubmit}
                            >
                                Search
              </button>
                        </div>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>Results</h1>
                    </Jumbotron>
                    {resultsList.length ? (
                        <List>
                            {resultsList.map(book => {
                                return (
                                    <ListItem key={book.id}>
                                        <a href={book.volumeInfo.previewLink}>
                                            <strong>
                                                {book.volumeInfo.title} by {book.volumeInfo.authors}
                                            </strong>
                                        </a>
                                        <Row>
                                            <Col>
                                                <img src={book.volumeInfo.imageLinks.thumbnail} />
                                            </Col>
                                            <Col size="md-10 md-offset-1">
                                                <article>
                                                    <h1>Description</h1>
                                                    <p>
                                                        {book.volumeInfo.description}
                                                    </p>
                                                </article>
                                            </Col>
                                        </Row>

                                        <button>View</button>
                                        <button>Add</button>
                                    </ListItem>
                                )
                            })}
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

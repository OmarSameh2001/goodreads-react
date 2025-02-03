//This component is responsible fot viewing book cover with book name only and link to book details page

import React from "react";
import { Link } from "react-router-dom";


const BookOverview = ({ book }) => {
    return (
        <Link to={`/book/${book.id}`} style={{ textDecoration: "none" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <img
                    src={book.cover}
                    alt={book.title}
                    style={{ width: "100px", height: "150px" }}
                />
                <p>{book.title}</p>
            </div>
        </Link>
    );
};

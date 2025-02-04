
//npm install react-router-dom
//npm install bootstrap
//npm install react-paginate
import React from "react";
// import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const AuthorCard = ({ author }) => {
  return (

    <div className="col-md-4 mb-4"> 
    <div style={{ height: "200px" }} className="card d-flex flex-column">
      <img
        src={author.image}
        alt={author.name}
        className="card-img-top" 
      />
      <div className="card-body d-flex flex-column">
        {/* <p className="card-text">{author.about}</p> */}
      </div>

      <div className="card-footer text-center mt-auto">
      <h5 className="card-title">{author.name}</h5>
        <a
          href={`/authors/${author._id}`}
          className="btn btn-primary"
        >
          View Profile
        </a>
      </div>
    </div>
  </div>
);
};

export default AuthorCard;
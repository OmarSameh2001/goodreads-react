import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const CategoryCard = ({ category }) => {
  return (

    <div className="col-md-4 mb-4"> 
    <div style={{ height: "200px" }} className="card d-flex flex-column">
      {/* <img
        src={category.image}
        alt={category.name}
        className="card-img-top" 
      /> */}
      <div className="card-body d-flex flex-column">
        {/* <p className="card-text">{category.about}</p> */}
      </div>

      <div className="card-footer text-center mt-auto">
      <h5 className="card-title">{category.name}</h5>
      <p>{category.description}</p>
        {/* <a
          href={`/categorys/${category._id}`}
          className="btn btn-primary"
        >
          View Profile
        </a> */}
      </div>
    </div>
  </div>
);
};

export default CategoryCard;
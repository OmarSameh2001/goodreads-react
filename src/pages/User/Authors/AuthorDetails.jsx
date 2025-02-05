import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

const AuthorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/authors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setAuthor(res.data))
      .then(() => console.log(author))
  }, [id]);

  const handleBack = () => navigate(-1);

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Author Details</h1>
      <div className="row">
        <div className="col-md-4">
          <img src={author.img} alt={author.name} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <p>
            <strong>Name:</strong> {author.name}
          </p>
          <p>
            <strong>DOB:</strong> {author.DOB}
          </p>
          <p>
            <strong>Views:</strong> {author.views}
          </p>
          <button onClick={handleBack} className="btn btn-primary">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;

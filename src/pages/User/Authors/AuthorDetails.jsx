import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/config";
import { IoMdArrowRoundBack } from "react-icons/io";
import AuthorBooks from "../../../components/Author/AuthorBooks";

const AuthorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/authors/${id}`);
        setAuthor(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => navigate(-1);

  return (
    <div className="container mt-4" style={{ position: "relative" }}>
      <button style={{ position: "absolute", top: 20, left: 15 }} onClick={handleBack} className="btn btn-primary">
          <IoMdArrowRoundBack />
          </button>
      {author ? (
        <>
        <h1 className="text-2xl font-bold mb-4">Author Details</h1>
        <div className="row">
          <div className="col-md-4">
            <img src={author.img} alt={author.name} className="img-fluid" />
          </div>
          <div className="col-md-7 d-flex justify-content-center align-items-center flex-column">
            <h2>
              <strong>Name:</strong> {author.name}
            </h2>
            <h2>
              <strong>DOB:</strong> {author?.DOB?.split("T")[0]}
            </h2>
            <h2>
              <strong>About:</strong> {author.about}
            </h2>
          </div>
        </div>
        <AuthorBooks />
        </>
      ) : (
        <h1>Loading Author...</h1>
      )}
    </div>
  );
};

export default AuthorDetails;

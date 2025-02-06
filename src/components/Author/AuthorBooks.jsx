import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";

const AuthorBooks = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [authorBooks, setAuthorBooks] = useState({});

  useEffect(() => {
  async function fetchData() {
    try {
      const res = await axiosInstance.get(`/books/filter?authors=${id}`);
      setAuthorBooks(res.data.books);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  fetchData();
  }, [id]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <h3>Author Books</h3>
        {authorBooks.length > 0 ? authorBooks.map((authorBook) => (
          <div
            className="col-md-2 d-flex flex-column"
            style={{ cursor: "pointer" }}
            key={authorBook._id}
            onClick={() => navigate(`/bookDetails?bookId=${authorBook._id}`)}
          >
            <img
              src={authorBook.img.includes("imgur") ? authorBook.img.replace("imgur", "i.imgur") + ".jpg" : authorBook.img}
              alt={authorBook.name + " image"}
              style={{ width: "100%", height: "100%" }}
            />
            <p>{authorBook.title}</p>
          </div>
        )) : <>
        <h1>Loading Author Books</h1>
        </>}
      </div>
    </div>
  );
};

export default AuthorBooks;

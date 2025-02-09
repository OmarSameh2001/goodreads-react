import React, { useContext, useState } from "react";
import BooksContext from "../../../context/books";
import { useNavigate, useParams } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
const BookViewer = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { readingBook: book } = useContext(BooksContext);
  const { bookName } = useParams();
  const navigate = useNavigate();
  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  if (book === "not subscribed") {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h1>Not Subscribed</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/profile")}
        >
          Subscribe
        </button>
      </div>
    );
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {isFullScreen ? null : (
        <h1 className="my-5">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary mx-3"
          >
            <IoMdArrowRoundBack />
          </button>
          {bookName}
        </h1>
      )}
      <div
        style={{
          position: isFullScreen ? "fixed" : "relative",
          top: isFullScreen ? 0 : null,
          left: isFullScreen ? 0 : null,
          width: isFullScreen ? "100vw" : "50vw",
          height: isFullScreen ? "100vh" : "50vh",
          zIndex: 9999,
        }}
      >
        <button
          className="btn btn-primary"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={handleFullScreen}
        >
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </button>
        <iframe
          src={`${book}`}
          width={"100%"}
          height={"100%"}
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

export default BookViewer;

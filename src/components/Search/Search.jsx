import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
function Search(props) {
  const { bookSearch, setBookSearch, setAppliedBookSearch } = props;
  const navigate = useNavigate();
  function handleBookSearch() {
    setAppliedBookSearch(bookSearch);
    // Update URL with search query
    navigate(`?search=${bookSearch}`, { replace: true });
  }
  return (
    <div className="d-flex">
      <TextField
        helperText="Search books by title"
        id="book-search-field"
        label="Search Books"
        value={bookSearch}
        onChange={(e) => setBookSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2, width: "200px" }}
        onKeyPress={(e) => e.key === "Enter" && handleBookSearch()}
      />
      <button
        className="btn btn-primary mx-2"
        onClick={handleBookSearch}
        style={{ height: "60px", width: "50px" }}
      >
        <FaSearch />
      </button>
    </div>
  );
}

export default Search;

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

function Search() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="mx-3">
      <input
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      <button
        className="btn btn-primary mx-2 p-1"
        onClick={() => navigate(`/books?search=${searchValue}`)}
        disabled={!searchValue}
      >
        <FaSearch />
      </button>
    </div>
  );
}

export default Search;

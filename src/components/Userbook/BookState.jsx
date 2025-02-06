import axiosInstance from "../../apis/config";
import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// This component is responsible for viewing and updating book state [want to read, reading, read]
function BookState({ userId, bookId, state = "want to read" }) {
  const [bookState, setBookStatus] = useState(state);

  function handleStatusChange(event) {
    const newValue = event.target.value; // Extract the selected value
    axiosInstance
      .patch(`/userbook/state/${bookId}`, {
        state: newValue,
        userId: userId,
      })
      .then((response) => {
        setBookStatus(response.data.state);
      })
      .catch((error) => {
        console.error("Error updating state:", error);
      });
  }

  return (
    <Select
      value={bookState}
      onChange={handleStatusChange}
      displayEmpty
      variant="outlined"
      sx={{
        minWidth: 200,
        // bgcolor: "#f0f0f0",
        borderRadius: "8px",
        "&:hover": { bgcolor: "#f5f5f5" },
      }}
    >
      <MenuItem value="want to read">
        <MenuBookIcon sx={{ color: "#3f51b5", marginRight: 1 }} /> Want to Read
      </MenuItem>
      <MenuItem value="is reading">
        <HourglassBottomIcon sx={{ color: "#ffa726", marginRight: 1 }} /> Is Reading
      </MenuItem>
      <MenuItem value="read">
        <CheckCircleIcon sx={{ color: "#4caf50", marginRight: 1 }} /> Read
      </MenuItem>
    </Select>
  );
}

export default BookState;

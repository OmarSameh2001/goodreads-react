import React, { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../../apis/config";
import { useQuery } from "@tanstack/react-query";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import EditUser from "../../../components/EditUser/EditUser";

function Profile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [renew, setRenew] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/auth/get-user/${id}`);
      res.data.password = "";
      setUser(res.data);
      return res.data;
    },
  });

  function handleDropdownChange(e) {
    setRenew(e.target.value);
  }

  async function handleRenew() {
    const res = await axiosInstance.post(`/auth/renew-subscription/${id}`, {
      subscriptionType: renew,
      baseUrl: window.location.origin,
    });
    if (res.status === 200) {
      window.location.href = res.data.url;
    }
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, minHeight: "74.5vh" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Profile</Typography>
          <Button variant="contained" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </Button>
        </Box>

        {/* User Info */}
        <Box mt={2}>
          <Typography variant="body1">
            <strong>Name:</strong> {data.fName} {data.lName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {data.email}
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {data.username}
          </Typography>
        </Box>

        {/* Subscription */}
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Subscription
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="renew-label">Renew</InputLabel>
              <Select
                labelId="renew-label"
                id="renew-select"
                label="Renew"
                value={renew}
                onChange={handleDropdownChange}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="annually">Annually</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleRenew} disabled={!renew}>
              Renew
            </Button>
          </Box>
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Type:</strong> {data.subscription.subscriptionType}
            </Typography>
            <Typography variant="body1">
              <strong>End Date:</strong>{" "}
              <span
                style={{
                  color:
                    new Date(data.subscription.endDate) < new Date()
                      ? "red"
                      : "green",
                }}
              >
                {data.subscription.endDate.split("T")[0]}
              </span>
            </Typography>
          </Box>
        </Box>

        {/* Edit User */}
        {isEditing && (
          <Box mt={3}>
            <EditUser
              user={user}
              setIsEditing={setIsEditing}
              fetchUser={refetch}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Profile;

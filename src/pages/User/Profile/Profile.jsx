import React from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../../apis/config";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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

  return isLoading ? (
    <div className="App-header" style={{ backgroundColor: "white" }}>
      <CircularProgress />
    </div>
  ) : (
    <div className="container mt-5">
      <h1>
        Profile{" "}
        <button
          className="btn btn-primary mx-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </button>
      </h1>
      <p>Name: {data.fName + " " + data.lName}</p>
      <p>Email: {data.email}</p>
      <p>Username: {data.username}</p>
      <h4>
        Subscription{" "}
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Renew</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Renew"
            value={renew}
            onChange={handleDropdownChange}
          >
            <MenuItem value={"monthly"}>Monthly</MenuItem>
            <MenuItem value={"annually"}>Annually</MenuItem>
          </Select>
        </FormControl>
        <button
          className="btn btn-primary mx-2"
          onClick={handleRenew}
          disabled={!renew}
        >
          Renew
        </button>
      </h4>
      <p>Type: {data.subscription.subscriptionType}</p>
      <p>
        End Date:{" "}
        <span
          style={{
            color: data.subscription.endDate < new Date() ? "red" : "green",
          }}
        >
          {data.subscription.endDate.split("T")[0]}
        </span>
      </p>
      {isEditing && (
        <EditUser user={user} setIsEditing={setIsEditing} fetchUser={refetch} />
      )}
    </div>
  );
}

export default Profile;

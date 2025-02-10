import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import axiosInstance from "../../../apis/config";

function Terms ()  {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axiosInstance.get("/siteContent/");
        const termsData = data.find((item) => item.type === "terms")?.content || "";
        setContent(termsData);
      } catch (error) {
        console.error("Error fetching terms content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Paper>
  );
};

export default Terms;

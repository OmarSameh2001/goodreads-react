import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import axiosInstance from "../../../apis/config";

function About () {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axiosInstance.get("/siteContent/");
        const aboutData = data.find((item) => item.type === "about")?.content || "";
        setContent(aboutData);
      } catch (error) {
        console.error("Error fetching about content:", error);
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

export default About;

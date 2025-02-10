import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import axiosInstance from "../../../apis/config";
import TinyMCEEditor from "../../../components/SiteContent/TinyMCEEditor";

function AdminContentEditor() {
  const [content, setContent] = useState({ about: "", terms: "" });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axiosInstance.get("/siteContent/");
        setContent({
          about: data.find((item) => item.type === "about")?.content || "",
          terms: data.find((item) => item.type === "terms")?.content || "",
        });
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <div style= {{margin:30}}>
      <TinyMCEEditor type="about" content={content.about} setContent={(value) => setContent((prev) => ({ ...prev, about: value }))} />
      <TinyMCEEditor type="terms" content={content.terms} setContent={(value) => setContent((prev) => ({ ...prev, terms: value }))} />
    </div>
  );
}

export default AdminContentEditor;

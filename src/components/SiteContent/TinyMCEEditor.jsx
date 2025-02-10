import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Box, Paper, Typography } from "@mui/material";
import axiosInstance from "../../apis/config";

const TinyMCEEditor = ({ type, content, setContent }) => {
  const [editorContent, setEditorContent] = useState(content);

  useEffect(() => {
    setEditorContent(content);
  }, [content]); // Update when parent content changes

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/siteContent/${type}`, { content: editorContent });
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: "#001f3f", color: "white", mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {type === "about" ? "About Us" : "Terms & Conditions"}
      </Typography>

      <Editor
        apiKey="ssmnrd3xs53oyhh3xemgjqeus7bd6ls0bl9vw2y0l3iem59i"
        value={editorContent}
        onEditorChange={(newContent) => {
          setEditorContent(newContent);
          setContent(newContent); // Update parent state
        }}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help",
          content_style: "body { font-family: Arial, sans-serif; font-size: 14px; }",
        }}
      />

      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default TinyMCEEditor;

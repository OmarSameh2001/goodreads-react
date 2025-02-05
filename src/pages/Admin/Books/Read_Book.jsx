// import {Document,Page} from 'react-pdf/dist/esm/entry.webpack';
import React, { useState } from 'react';
import axios from 'axios';
function Read_Book() {


const [title,settitle]=useState('');
const [pdf,setpdf]=useState(null);


const submitImage=async(e)=>{
// ba3mel prevent ll app mn eno y reload
 e.preventDefult();

 if (!pdf) {
  alert("Please select a PDF file.");
  return;
}
 const formdata=new FormData();
 //hena store data
 formdata.append('title',title); 
 formdata.append('pdf',pdf);
 console.log(title,pdf);

 try {
            const response = await axios.post("http://localhost:3001/upload-files", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("File uploaded successfully!");
            console.log("Google Drive File URL:", response.data.fileUrl);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload file.");
        }
    };




  return (
    <div>
          <h1>Read & Upload Book</h1>
            <form onSubmit={submitFile}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    onChange={(e) => settitle(e.target.value)}
                    required
                />
                <input
                    type="file"
                    className="form-control"
                    accept="application/pdf"
                    onChange={(e) => setpdf(e.target.files[0])}
                    required
                />
                <button className="btn btn-success" type="submit">
                    Upload
                </button>
              </form>
    </div>
  );
}

export default Read_Book
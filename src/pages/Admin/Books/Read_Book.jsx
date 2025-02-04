// import {Document,Page} from 'react-pdf/dist/esm/entry.webpack';
import React, { useState } from 'react';
import axios from 'axios';
function Read_Book() {
//  const [numPage, setNumPage] = useState(null);
//  const [pageNumber, setPageNumber] = useState(1);


//  // func b t load pdf when render
//  function onDocumentLoadSuccess({ numPages }) {
//   setNumPage(1);
// }
// function changepage(offset) {
//   setPageNumber(prevPageNumber => prevPageNumber + offset);
// }
// function changePageBack(){
//     changepage(-1);
// }
// function changePageNext(){
//     changepage(1);
// }









const [title,settitle]=useState('');
const [pdf,setpdf]=useState(null);


const submitImage=async(e)=>{
// ba3mel prevent ll app mn eno y reload
 e.preventDefult();
 const formdata=new FormData();
 //hena store data
 formdata.append('title',title); 
 formdata.append('pdf',pdf);
 console.log(title,pdf);
 const res=await axios.post('http://localhost:3001/upload-files',formdata,
  {
    headers:{"content-type":"multipart/form-data"},
  }
 );
 console.log(res);




}

  return (
    <div>

        <h1>Read & Upload Book</h1>
        <form onSubmit={submitImage}>
           <input 
           type="text" 
           className='form-control' 
           placeholder='title' 
           onChange={e=>settitle(e.target.value)}
           required/>
           <input 
           type="file" 
           className='form-control' 
           accept='application/pdf'
           //accept file+ instore it in state
           //accept bs awel file [0]
           onChange={e=>setpdf(e.target.files[0])}/>
           <button 
           className='btn btn-success' 
           type='submit'>Upload</button>
        </form>
       
        {/* <Document file={pdf} 
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPage}</p>
        {pageNumber > 1 && 
        <button onClick={() => setPageNumber(pageNumber - 1)}/>      
        }
        {
        pageNumber< numPage && 
        <button onClick={changePageBack}>next</button>
        } */}
    </div>
  )
}

export default Read_Book
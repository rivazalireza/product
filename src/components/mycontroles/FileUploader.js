import React, { useState } from "react";
import axios from "axios";
import FileUploaded from "./FileUploaded"

const FileUploader = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", selectedFile);
  
    axios
      .post(UPLOAD_URL, formData)
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error"));
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FileUploaded
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />

        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
};
export default FileUploader

// import React from "react";
// import axios from "axios";

// function FileUploader() {
//   const [uploadFile, setUploadFile] = React.useState();
//   const [fileName, setFileName] = React.useState();
  
//   const submitForm = (event) => {
//     event.preventDefault();

//     const dataArray = new FormData();
//     dataArray.append("fileName", fileName);
//     dataArray.append("uploadFile", uploadFile);

//     axios
//       .post("api_url_here", dataArray, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       })
//       .then((response) => {
//         // successfully uploaded response
//       })
//       .catch((error) => {
//         // error response
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={submitForm}>
//         <input
//           type="text"
//           onChange={(e) => setFileName(e.target.value)}
//           placeholder={"File Name"}
//         />
//         <br />
//         <input type="file" onChange={(e) => setUploadFile(e.target.files)} />
//         <br />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// }
// export default FileUploader
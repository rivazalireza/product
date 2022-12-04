import React, { useState  } from 'react';

function ExcelToJson() {
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
    
    return (
      <div>
        <form>
            <label htmlFor="upload">Upload File</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
            />
        </form>
      </div>
       
    )
  }
  
  export default ExcelToJson


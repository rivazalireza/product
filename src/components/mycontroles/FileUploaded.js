import React, {useRef} from 'react'

const FileUploaded = ({onError,onSuccess}) => {
    const fileInput = useRef(null)
    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1024)
          onError({ error: "File size cannot exceed more than 1MB" });
        else onSuccess(file);
      };
   
    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} />
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"></button>
        </div>
    )
}
export default FileUploaded
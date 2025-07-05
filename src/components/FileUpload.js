import { useState } from "react";
import axios from 'axios';
import './FileUpload.css';
import 'dotenv';
const FileUpload = ({account,provider,contract})=>{
    const [file,setFile]= useState(null);
    const [filename,setFilename]=useState("No file is selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        try 
        {
            const response = await axios.get("http://localhost:3000/signed-url");
            const signedUrl = response.data;  
            
            const formData = new FormData();
            formData.append("file", file);
            const resFile = await axios.post(signedUrl.url, formData, 
            {
                headers: {
                    pinata_api_key: process.env.pinata_api_key,
                    pinata_secret_api_key: process.env.pinata_secret_api_key,
                    "Content-Type": "multipart/form-data",
                },
            });
            const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.data.cid}`;
            
            
            
            setFilename("No image selected");
            setFile(null);
            await contract.add(account, ImgHash);
            alert("Successfully uploaded image to Pinata!");
            alert("Successfully Image Uploaded");
        } 
        catch (error) 
        {
            console.error(error);
            alert("Unable to upload image to Pinata");
        }
        setFilename("No image selected");
    };
    const retrieveFile = (e)=>{
        e.preventDefault();
        const data = e.target.files?.[0];
        if (!data || !(data instanceof Blob)) {
            console.error("Invalid or no file selected");
            return;
        }
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = ()=>{
            setFile(data);
        };
        
        setFilename(data.name);
        
    }
    return <>
    <div className="top">
        <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
            Choose File
        </label>
        <input disabled={!account} type ="file" id="file-upload" name="date" onChange={retrieveFile}/>
        <span className="Text-Area">{filename}</span>
        <button type="Submit" className="upload" disabled = {!file}>Upload File</button>
        </form>
    </div>
    </>;
};
export default FileUpload;

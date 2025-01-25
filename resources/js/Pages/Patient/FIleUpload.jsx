import React, { useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

export default function FileUpload({blobSasUrl}) {
    const [file, setFile] = useState(null); // State to hold the selected file
    const [uploadStatus, setUploadStatus] = useState(""); // Status of the upload

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Set the selected file
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        // Azure Blob Storage connection string or SAS URL
        const containerName = "uiuhealthcare"; // Replace with your container name

        try {
            // Initialize the BlobServiceClient
            const blobServiceClient = new BlobServiceClient(blobSasUrl);
            const containerClient = blobServiceClient.getContainerClient(containerName);

            // Create the container if it doesn't exist
            await containerClient.createIfNotExists();

            // Create a unique blob name
            const blobName = `${Date.now()}-${file.name}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            // Upload the file
            const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file);
            console.log("Upload successful:", uploadBlobResponse);

            setUploadStatus("File uploaded successfully.");
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("File upload failed.");
        }
    };

    return (
        <div className="file-upload-container">
            <h1>Azure Blob Storage File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload} className="upload-btn">
                Upload
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}

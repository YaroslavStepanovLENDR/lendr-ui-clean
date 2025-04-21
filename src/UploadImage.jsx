
import React, { useState } from "react";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://lendr-backend.onrender.com/analyze-image", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setResponseData(result);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Upload an image to analyze</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <img src={selectedImage} alt="Preview" className="w-64 mt-4" />}
      {responseData && (
        <div className="mt-4 text-left">
          <h3 className="font-semibold">Results:</h3>
          <pre className="text-sm">{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

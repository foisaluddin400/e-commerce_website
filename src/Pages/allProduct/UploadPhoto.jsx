import React from "react";

export default function UploadPhoto({ onUpload }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Upload Image</h3>
      <input
        type="file"
        onChange={(e) => onUpload(e.target.files[0])}
        className="border p-2 w-full"
      />
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";

const ImageIconControls = ({ selectedTool }) => {
  const [backendImages, setBackendImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    loadBackendImages();
  }, []);

  // Preload images to ensure they are accessible
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        console.log("Preloaded image:", url);
        resolve(url);
      };
      img.onerror = (err) => {
        console.error("Failed to preload image:", url, err);
        reject(err);
      };
    });
  };

  // Simulate fetching images from backend
  const loadBackendImages = async () => {
    setLoadingImages(true);
    setImageError(null);
    try {
      // Fake ImageBB URLs for testing
      const imageUrls = [
        "https://www.svgrepo.com/show/530572/accelerate.svg",
        "https://i.ibb.co.com/23Rgqkf3/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
        "https://i.ibb.co.com/LDpjCJcz/bird-8788491-1280.jpg",
        "https://i.ibb.co.com/yngCzXg3/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDIz-LTEx-L3-Jhd3-Bpe-GVs-X29m-Zmlj-ZV8y-OV9wa-G90b19v-Z.png",
        "https://i.ibb.co.com/yngCzXg3/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDIz-LTEx-L3-Jhd3-Bpe-GVs-X29m-Zmlj-ZV8y-OV9wa-G90b19v-Z.png",
      ];
      // Preload images to ensure they are accessible
      const preloadedUrls = await Promise.all(
        imageUrls.map((url) =>
          preloadImage(url).catch(() => {
            console.warn("Falling back to placeholder for:", url);
            return "https://via.placeholder.com/200x200?text=Fallback+Image";
          })
        )
      );
      const validUrls = preloadedUrls.filter((url) => url !== null);
      setBackendImages(validUrls);
      console.log("Backend images loaded:", validUrls);
      if (validUrls.length === 0) {
        setImageError("No images could be loaded.");
      }
    } catch (error) {
      console.error("Error loading backend images:", error);
      setImageError("Failed to load images from backend.");
      setBackendImages(["https://via.placeholder.com/200x200?text=Fallback+Image"]);
    } finally {
      setLoadingImages(false);
    }
  };

  // Handle image download with fallback
  const handleDownload = async (imageUrl, fileName) => {
    try {
      console.log("Initiating fetch download for:", imageUrl);
      const response = await fetch(imageUrl, { mode: "cors" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      console.log("Download successful for:", imageUrl);
    } catch (error) {
      console.error("Fetch download failed for:", imageUrl, error);
      console.log("Attempting fallback download for:", imageUrl);
      // Fallback to direct <a> download
      const originalUrl = imageUrl.replace("https://cors-anywhere.herokuapp.com/", "");
      const link = document.createElement("a");
      link.href = originalUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Fallback download attempted for:", originalUrl);
      alert("Download attempted. If it fails, check the console for details or ensure CORS proxy is active at https://cors-anywhere.herokuapp.com.");
    }
  };

  if (selectedTool !== "imageIcon") return null;

  return (
    <div className="absolute top-0 left-0 bg-white p-4 rounded flex flex-col gap-2 max-w-xs">
      <p className="font-bold">Image Icons</p>
      {loadingImages && <p className="text-gray-500">Loading images...</p>}
      {imageError && <p className="text-red-500">{imageError}</p>}
      {!loadingImages && backendImages.length === 0 && (
        <p className="text-gray-500">No images available.</p>
      )}
      <div className="grid grid-cols-3 gap-2 mt-2 max-h-64 overflow-y-auto">
        {backendImages.map((imageUrl, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <img
              src={imageUrl}
              alt={`Image Icon ${index}`}
              className="w-[120px]"
              onError={() => console.error("Image failed to load in UI:", imageUrl)}
            />
            
            <button
              onClick={() => handleDownload(imageUrl, `image_${index}.png`)}
              className="mt-1 text-blue-500 hover:text-blue-700 absolute right-0 top-0"
              title="Download Image"
            >
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageIconControls;
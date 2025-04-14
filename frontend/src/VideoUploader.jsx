import React, { useState } from "react";
import { UploadCloud, Trash2 } from "lucide-react";

const VideoUploader = () => {
  const [video, setVideo] = useState(null);

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file",file);

      const res = await fetch("http://localhost:5000/api/video",{
        method: "POST",
        body: formData,
      });
    }
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const submitVideo = () => {
    console.log("Storing the Video");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg transition transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Traffic Sign Video</h1>

        {/* Upload Box */}
        {!video ? (
          <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 hover:bg-gray-50 transition duration-300">
            <UploadCloud className="w-12 h-12 text-gray-500 mb-2 transition transform hover:scale-110" />
            <span className="text-gray-600 text-sm">Click to Upload</span>
            <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
          </label>
        ) : (
          <div className="relative group mt-4">
            <video
              src={video}
              controls
              className="w-full rounded-xl shadow-lg border-4 border-gray-300 transition-transform duration-300 hover:scale-105"
            />
            {/* Delete Button */}
            <button
              onClick={removeVideo}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
            >
              <Trash2 className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </div>
        )}

        <button
          className="btn btn-soft btn-success mt-4 ml-40 justify-items-center"
          onClick={submitVideo}
        >
          Success
        </button>
      </div>
    </div>
  );
};

export default VideoUploader;

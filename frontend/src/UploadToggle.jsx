import React, { useState } from 'react';
import ImageUploader from './ImageUploader.jsx';
import VideoUploader from './VideoUploader.jsx';

const UploadToggle = () => {
  const [uploadType, setUploadType] = useState('image');

  return (
    <div className="w-full mt-10 text-center">
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-full ${
            uploadType === 'image'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => setUploadType('image')}
        >
          Image
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            uploadType === 'video'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => setUploadType('video')}
        >
          Video
        </button>
      </div>

      <div className="w-full">
        {uploadType === 'image' ? <ImageUploader /> : <VideoUploader />}
      </div>
    </div>
  );
};

export default UploadToggle;

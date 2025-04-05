import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery/images")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={`http://localhost:5000${img.imageUrl}`}
              alt="Gallery"
              className="w-full h-40 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

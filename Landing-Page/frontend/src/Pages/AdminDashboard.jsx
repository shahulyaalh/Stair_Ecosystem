import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/activities/upload", formData);
      setMessage("Activity uploaded successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      setMessage("Failed to upload activity.");
    }
  };

  return (
    <div className="pt-24 px-4">
      {" "}
      {/* Add padding top to lift below header */}
      <h2 className="text-2xl font-semibold mb-4">Upload Recent Activity</h2>
      {message && <p className="text-green-600 font-medium mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;

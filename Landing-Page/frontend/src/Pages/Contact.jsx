import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Message Sent! ✅\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <section className="py-6 bg-gray-100 text-gray-900">
      <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
        <div className="py-6 md:py-0 md:px-6">
          <h1 className="text-4xl font-bold">Get in touch</h1>
          <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
          <div className="space-y-4">
            <p className="flex items-center">
              📍 <span className="ml-2">Fake address, 9999 City</span>
            </p>
            <p className="flex items-center">
              📞 <span className="ml-2">123456789</span>
            </p>
            <p className="flex items-center">
              ✉️ <span className="ml-2">contact@business.com</span>
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
        >
          <label className="block">
            <span className="mb-1">Full Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 bg-gray-100 focus:ring-purple-600"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1">Email Address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 bg-gray-100 focus:ring-purple-600"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1">Message</span>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="block w-full rounded-md focus:ring focus:ring-opacity-75 bg-gray-100 focus:ring-purple-600"
              required
            ></textarea>
          </label>
          <button
            type="submit"
            className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 text-gray-50 bg-purple-600 focus:ring-purple-600 hover:ring-purple-600"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

import React from "react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Solar Panel",
    image: "/solar-panel.jpg",
    desc: "High-efficiency solar panels.",
  },
  {
    name: "Solar Inverter",
    image: "/inverter.jpg",
    desc: "Reliable solar inverters for smooth energy conversion.",
  },
  {
    name: "Solar Battery",
    image: "/battery.jpg",
    desc: "Long-lasting solar batteries for energy storage.",
  },
  {
    name: "Solar Water Heater",
    image: "/water-heater.jpg",
    desc: "Eco-friendly water heating solutions.",
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Solar Products
      </motion.h1>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-10 px-6">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {product.name}
            </h3>
            <p className="text-gray-600 mt-2">{product.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;

import React from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Oxanium']">
      {/* Header Section */}
      <header className="py-6 px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-400 drop-shadow-lg">
          I-Read-Books
        </h1>
        <p className="mt-4 text-lg md:text-xl text-center text-gray-300">
          A personal book review platform by a passionate developer.
        </p>
      </header>

      {/* Bento Grid Section */}
      <section className="py-12 px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Bento Grid Items */}
          {[
            "Books I've Reviewed",
            "My Favorite Notes",
            "Built With PERN Stack",
            "Inspired by My Personal Journey",
            "Developed With ❤️",
            "Your Thoughts Matter!",
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center text-center hover:bg-gray-700 transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl md:text-2xl font-medium text-yellow-300">
                {item}
              </h2>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-gray-800 py-10 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg md:text-xl text-gray-300">
            <span className="font-bold text-yellow-400">
              Disclaimer:
            </span>{" "}
            These reviews and notes are my personal thoughts and interpretations.
            They are subjective and may not reflect the actual reality.
          </p>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 text-center">
        <p className="text-gray-400">
          Made by a passionate web developer using the PERN stack. Explore, Learn,
          and Enjoy!
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

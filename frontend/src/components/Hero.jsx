import { motion } from "framer-motion";

function Hero() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center py-20">
      <h1 className="text-6xl font-extrabold leading-tight text-white">
        Convert Audio To
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {" "}
          Text Instantly
        </span>
      </h1>
      <p className="text-gray-400 text-xl mt-6 max-w-3xl mx-auto">
        Upload audio, record voice,
        and generate AI-powered
        transcriptions in seconds.
      </p>
    </motion.div>
  );
}

export default Hero;
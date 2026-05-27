import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <h1 className="text-6xl font-bold text-white leading-tight">
        Convert Speech
        <br />
        Into Text Instantly
      </h1>
      <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
        Upload audio, record voice, and generate
        real-time AI powered transcriptions.
      </p>
    </motion.div>
  );
}

export default Hero;
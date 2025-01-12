import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import cartoondoc from "../assets/3dcartoondoc.png";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import useUserContext from "../hooks/useUserContext.js";
// import ambulance from "../assets/ambulance.png";
// import doctor from "../assets/docpatinj.png";

function Home() {
  // const context = useUserContext();
  // const navigate = useNavigate();
  const words = ["HealthRec", "Health Records", "Simplified", "Secure"];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loopIndex % words.length];
      if (isDeleting) {
        setText((prev) => prev.slice(0, prev.length - 1));
        setSpeed(60);
      } else {
        setText((prev) => currentWord.slice(0, prev.length + 1));
        setSpeed(200);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    };
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, speed, loopIndex]);

  return (
    <section className="w-full flex flex-col">
      <div className="w-full h-[100vh] relative overflow-hidden bg-gradient-to-br from-white via-green-300 to-green-600 flex items-center justify-start px-10">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-green-900 absolute top-[40%] left-[10%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {text}
          <span className="border-r-2 border-green-900 ml-1 animate-blink"></span>
        </motion.h1>
        <img
          src={cartoondoc}
          alt="background"
          className="w-1/8 h-3/4 object-cover absolute right-1 bottom-10"
          draggable={false}
        />
      </div>
      <Footer />
    </section>
  );
}

export default Home;

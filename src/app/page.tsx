"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Stars, MapPin, Plane } from "lucide-react";

export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

  const photos = useMemo(() => [
    "/IMG_8824.jpg",
    "/IMG_9307.jpg",
    "/IMG_9663.jpg"
  ], []);

  // Generate static heart positions to avoid Math.random during render
  const hearts = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 20 + 20}px`
    }));
  }, []);

  const handleNoHover = () => {
    const newX = Math.random() * 300 - 150;
    const newY = Math.random() * 300 - 150;
    setNoButtonPosition({ x: newX, y: newY });
    setNoCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setAccepted(true);
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const noTexts = [
    "No",
    "¿Segura? 🥺",
    "La distancia es difícil, pero yo te amo... 🌹",
    "Elizabeth, por favooor ❤️",
    "¡Ni los kilómetros nos separan! 💔",
    "¿Y mis flores virtuales? ✨",
    "No te dejaré ir tan fácil 👀",
  ];

  return (
    <main className="main-container">
      {/* Background Floating Hearts */}
      <div className="heart-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              fontSize: heart.size,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="card"
          >
            <div className="distance-badge">
              <MapPin size={16} />
              <span>Sin importar la distancia</span>
              <Plane size={16} />
            </div>

            <div className="text-content">
              <h1 className="title">Elizabeth</h1>
              <h2 className="subtitle">¿Quieres ser mi San Valentín este 14 de Febrero?</h2>
              <p className="description" style={{ marginTop: '0.5rem', color: '#800f2f' }}>
                Aunque estemos lejos, mi corazón está siempre contigo.
              </p>
            </div>

            <div className="photos-grid">
              {photos.map((src, i) => (
                <motion.div
                  key={i}
                  className="photo-item"
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                >
                  <img src={src} alt={`Nosotros ${i + 1}`} />
                </motion.div>
              ))}
            </div>

            <div className="button-group">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-yes"
                onClick={handleYes}
              >
                ¡SÍ! ❤️
              </motion.button>

              <motion.button
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                onMouseEnter={handleNoHover}
                className="btn btn-no"
              >
                {noTexts[Math.min(noCount, noTexts.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card success-card"
          >
            <div className="success-content">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Stars size={60} color="#ffb703" />
              </motion.div>

              <h1 className="title">¡Dijo que sí! ❤️</h1>
              <p className="subtitle">La espera valdrá la pena...</p>

              <div className="success-photo-container">
                {photos.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    className="success-photo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    alt="Celebración"
                  />
                ))}
              </div>

              <p className="romantic-text" style={{ fontSize: '1.4rem' }}>
                Te amo muchísimo Elizabeth. <br />
                Cada kilómetro que nos separa es un motivo más para amarte. ✨
              </p>

              <div style={{ marginTop: '1rem', color: '#ff4d6d', fontWeight: 600 }}>
                ❤️ Mi San Valentín a la distancia ❤️
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

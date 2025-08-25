import { useState } from "react";
import { motion } from "framer-motion";
import './coinflip.css';

export default function CoinFlip() {
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState("Heads");

  const flipCoin = () => {
    if (flipping) return;
    setFlipping(true);

    setTimeout(() => {
      setResult(Math.random() < 0.5 ? "Heads" : "Tails");
      setFlipping(false);
    }, 3000);
  };

  return (
    <div className="coinflip-container">
      <motion.div
        key={result + flipping}
        animate={{ rotateY: flipping ? 720 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        onClick={flipCoin}
        className="coin"
      >
        {result}
      </motion.div>

      <p className="coin-result">
        {flipping ? "Flipping..." : result}
      </p>

      <button
        onClick={flipCoin}
        disabled={flipping}
        className={`coin-button ${flipping ? "disabled" : ""}`}
      >
        Flip Coin
      </button>
    </div>
  );
}

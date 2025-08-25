import { useState, useRef, useEffect } from "react";
import { Wheel } from "./Wheel";
import '../index.css';

export default function Selector() {
  const [count, setCount] = useState<number | null>(null);
  const [useNames, setUseNames] = useState(false);
  const [names, setNames] = useState<string[]>([]);
  const [currentName, setCurrentName] = useState<string>("");
  const [step, setStep] = useState<"input" | "names" | "wheel">("input");

  const [participants, setParticipants] = useState<string[]>([]);
  const [orderedParticipants, setOrderedParticipants] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "names" && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [step, names]);

  const handleConfirmCount = () => {
    if (count && count >= 3 && count <= 30) {
      if (useNames) setStep("names");
      else {
        const nums = Array.from({ length: count }, (_, i) => `${i + 1}`);
        setParticipants(nums);
        setColors(generateColors(count));
        setStep("wheel");
      }
    }
  };

  const handleAddName = () => {
    if (currentName.trim() !== "" && names.length < (count ?? 0)) {
      setNames([...names, currentName.trim()]);
      setCurrentName("");
      nameInputRef.current?.focus();
    }
  };

  const handleGoToWheel = () => {
    if (names.length === count) {
      setParticipants(names);
      setColors(generateColors(count!));
      setStep("wheel");
    }
  };

  const generateColors = (n: number) =>
    Array.from({ length: n }, (_, i) => `hsl(${(i * 360) / n}, 70%, 50%)`);

  const shuffleArray = (arr: string[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);

    const interval = setInterval(() => {
      setColors(generateColors(participants.length).sort(() => Math.random() - 0.5));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      const shuffled = shuffleArray(participants);
      setOrderedParticipants(shuffled);
      setColors(generateColors(participants.length));
      setSpinning(false);
    }, 5000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step === "input") handleConfirmCount();
      else if (step === "names") handleAddName();
    }
  };

  const getOrdinal = (n: number) => n + "º";

  return (
    <div className="selector-container">
      {step === "input" && (
        <div className="step-container">
          <label>
            Number of participants (3–30):
            <input
              type="number"
              value={count ?? ""}
              onChange={(e) => setCount(parseInt(e.target.value))}
              min={3}
              max={30}
              onKeyDown={handleKeyDown}
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={useNames}
              onChange={(e) => setUseNames(e.target.checked)}
            />
            Use names instead of numbers
          </label>

          <button onClick={handleConfirmCount} className="btn btn-blue">
            Confirm
          </button>
        </div>
      )}

      {step === "names" && (
        <div className="step-container">
          <p>Enter <span className="highlight">{count}</span> names:</p>

          {names.length < (count ?? 0) && (
            <div className="name-input-row">
              <input
                ref={nameInputRef}
                type="text"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                placeholder="Enter a name"
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleAddName} className="btn btn-green">Add</button>
            </div>
          )}

          <div
            className="name-list"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
              gap: "0.5rem"
            }}
          >
            {names.map((n, i) => (
              <div key={i}>{n}</div>
            ))}
          </div>

          {names.length === count && (
            <button onClick={handleGoToWheel} className="btn btn-purple">
              Continue to wheel
            </button>
          )}
        </div>
      )}

      {step === "wheel" && (
        <div className="wheel-container">
          <Wheel items={participants} colors={colors} spinning={spinning} onSpin={handleSpin} />
          <div
            className="results-container"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))` }}
          >
            {orderedParticipants.map((p, i) => (
              <div 
                key={i} 
                style={{ fontWeight: i === 0 ? 'bold' : 'normal', color: i === 0 ? '#facc15' : undefined }}
              >
                {getOrdinal(i + 1)} → {p}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

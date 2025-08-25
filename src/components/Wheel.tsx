import { useState } from "react";
import '../index.css';

type WheelProps = {
  items: string[];
  colors: string[];
  spinning: boolean;
  onSpin: () => void;
};

export function Wheel({ items, colors, spinning, onSpin }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const radius = 150;

  const handleSpin = () => {
    if (spinning) return;
    const extraRotation = 720 + Math.floor(Math.random() * 360);
    setRotation(rotation + extraRotation);
    onSpin();
  };

  return (
    <div 
      className="wheel-wrapper" 
      onClick={handleSpin} 
      style={{ cursor: spinning ? 'not-allowed' : 'pointer' }}
    >
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        style={{
          width: '100%',
          maxWidth: '300px',
          height: 'auto',
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)' : 'none'
        }}
      >
        {items.map((_, i) => {
          const anglePerSlice = 360 / items.length;
          const startAngle = ((i * anglePerSlice - 90) * Math.PI) / 180;
          const endAngle = (((i + 1) * anglePerSlice - 90) * Math.PI) / 180;

          const x1 = radius + radius * Math.cos(startAngle);
          const y1 = radius + radius * Math.sin(startAngle);
          const x2 = radius + radius * Math.cos(endAngle);
          const y2 = radius + radius * Math.sin(endAngle);
          const largeArc = anglePerSlice > 180 ? 1 : 0;

          const pathData = `
            M ${radius} ${radius}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
            Z
          `;

          return <path key={i} d={pathData} fill={colors[i]} stroke="black" strokeWidth="1" />;
        })}
      </svg>
      <div className="wheel-pointer">▲</div>
    </div>
  );
}

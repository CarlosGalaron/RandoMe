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
  const center = radius;
  const anglePerSlice = 360 / items.length;

  const handleSpin = () => {
    if (spinning) return;
    const extraRotation = 720 + Math.floor(Math.random() * 360);
    setRotation(rotation + extraRotation);
    onSpin();
  };

  return (
    <div className="wheel-wrapper" onClick={handleSpin}>
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
        {items.map((item, i) => {
          const startAngle = ((i * anglePerSlice - 90) * Math.PI) / 180;
          const endAngle = (((i + 1) * anglePerSlice - 90) * Math.PI) / 180;

          const x1 = center + radius * Math.cos(startAngle);
          const y1 = center + radius * Math.sin(startAngle);
          const x2 = center + radius * Math.cos(endAngle);
          const y2 = center + radius * Math.sin(endAngle);

          const largeArc = anglePerSlice > 180 ? 1 : 0;

          const pathData = `
            M ${center} ${center}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
            Z
          `;

          const textAngle = ((i + 0.5) * anglePerSlice - 90) * (Math.PI / 180);
          const textX = center + (radius / 2) * Math.cos(textAngle);
          const textY = center + (radius / 2) * Math.sin(textAngle);

          return (
            <g key={i}>
              <path d={pathData} fill={colors[i]} stroke="black" strokeWidth="1" />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={Math.max(12, radius / 10)}
              >
                {item}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="wheel-pointer">▲</div>
    </div>
  );
}

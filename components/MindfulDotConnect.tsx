import React, { useRef, useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

export const MindfulDotConnect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const parent = canvas.parentElement;
    if(parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    context.fillStyle = '#F5F5F5';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#28B4A7';
    points.forEach(point => {
      context.beginPath();
      context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      context.fill();
    });

    if (points.length > 1) {
      context.strokeStyle = '#FF6F61';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
      }
      context.stroke();
    }
  }, [points]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints(prevPoints => [...prevPoints, { x, y }]);
  };

  const handleReset = () => {
    setPoints([]);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full h-80 bg-soft-gray rounded-lg shadow-inner border border-gray-200 cursor-pointer">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full rounded-lg"
          />
      </div>
      <button 
        onClick={handleReset}
        className="px-6 py-2 bg-secondary text-white font-poppins font-semibold rounded-full hover:bg-red-500 transition-colors"
      >
        Clear Canvas
      </button>
    </div>
  );
};

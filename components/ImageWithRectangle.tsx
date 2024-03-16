import { useEffect, useRef } from 'react';
import { any } from 'zod';

function ImageWithRectangle({ imgSrc, objects }: any) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      if (Array.isArray(objects)) {
        objects.forEach((object: any) => {
          const { box } = object;
          context.beginPath();
          context.rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
          context.lineWidth = 2;
          context.strokeStyle = 'red';
          context.stroke();
        });
      }
    };
  }, [imgSrc, objects]);

  return <canvas ref={canvasRef} />;
}
export default ImageWithRectangle;

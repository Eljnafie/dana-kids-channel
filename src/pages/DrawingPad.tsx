import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Eraser, Download, Trash2, Palette, ArrowLeft, ArrowRight, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';

const DrawingPad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t, dir } = useLanguage();
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');

  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const COLORS = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', 
    '#800080', '#A52A2A', '#FFFFFF'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.beginPath(); // Reset path to prevent lines connecting
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = mode === 'erase' ? '#FFFFFF' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'my-dana-drawing.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 py-8 px-4">
      <div className="max-w-5xl mx-auto h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
           <Link to="/games" className="inline-flex items-center gap-2 text-gray-500 hover:text-dana-blue font-bold">
               <ArrowIcon size={20} /> <span className="hidden sm:inline">{t('games_title')}</span>
           </Link>
           <h1 className="font-heading text-3xl text-dana-blue">{t('draw_title')}</h1>
           <button 
             onClick={saveDrawing}
             className="bg-dana-green text-white px-4 py-2 rounded-full font-bold shadow-md hover:bg-green-600 flex items-center gap-2"
           >
             <Download size={18} /> {t('draw_save')}
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 flex-grow overflow-hidden">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-3xl shadow-xl flex md:flex-col gap-4 items-center justify-between md:justify-start overflow-x-auto">
                
                {/* Mode Switch */}
                <div className="flex md:flex-col gap-2 bg-gray-100 p-2 rounded-xl">
                    <button 
                        onClick={() => setMode('draw')}
                        className={`p-3 rounded-lg transition-colors ${mode === 'draw' ? 'bg-dana-purple text-white shadow' : 'text-gray-500'}`}
                        title={t('draw_brush')}
                    >
                        <Brush size={24} />
                    </button>
                    <button 
                        onClick={() => setMode('erase')}
                        className={`p-3 rounded-lg transition-colors ${mode === 'erase' ? 'bg-dana-coral text-white shadow' : 'text-gray-500'}`}
                        title={t('draw_erase')}
                    >
                        <Eraser size={24} />
                    </button>
                </div>

                {/* Colors */}
                <div className="flex md:flex-col gap-2 flex-wrap justify-center max-w-[200px] md:max-w-none">
                    {COLORS.map(c => (
                        <button
                            key={c}
                            onClick={() => { setColor(c); setMode('draw'); }}
                            className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c && mode === 'draw' ? 'border-gray-800 scale-125' : 'border-gray-200'}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>

                {/* Brush Size */}
                <div className="flex md:flex-col gap-2 items-center">
                    {[3, 8, 15].map(size => (
                        <button
                           key={size}
                           onClick={() => setBrushSize(size)}
                           className={`rounded-full bg-gray-800 transition-opacity ${brushSize === size ? 'opacity-100' : 'opacity-30'}`}
                           style={{ width: size * 2, height: size * 2, minWidth: 10, minHeight: 10 }}
                        />
                    ))}
                </div>

                <div className="flex-grow md:hidden"></div>

                <button 
                    onClick={clearCanvas}
                    className="p-3 bg-red-100 text-red-500 rounded-xl hover:bg-red-200"
                    title={t('draw_clear')}
                >
                    <Trash2 size={24} />
                </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-grow bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-dashed border-gray-300 relative touch-none">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchEnd={stopDrawing}
                    onTouchMove={draw}
                    className="w-full h-full cursor-crosshair"
                />
            </div>
        </div>

      </div>
    </div>
  );
};

export default DrawingPad;
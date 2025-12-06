import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ASCIIHumanProps {
  className?: string;
  isMobile?: boolean;
}

interface BodyPart {
  y: number;
  rx: number;
  rz: number;
  h: number;
  taperT: number;
  taperB: number;
  curve: number;
  offsetX?: number;
  offsetZ?: number;
}

const ASCIIHuman = ({ className = '', isMobile = false }: ASCIIHumanProps) => {
  const [t] = useTranslation('global');
  const canvasRef = useRef<HTMLPreElement>(null);
  const animationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [controls, setControls] = useState({
    speed: 25,
    muscle: 20,
    quality: 55,
    glow: 50
  });
  const [showControls, setShowControls] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for visibility detection
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Fermeture par clic en dehors seulement sur desktop
    if (isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const controlsPanel = document.querySelector('.controls-panel');
      const gearButton = document.querySelector('.gear-button');
      
      // Ferme si on clique en dehors du panneau et du bouton engrenage
      if (showControls && 
          controlsPanel && !controlsPanel.contains(target) &&
          gearButton && !gearButton.contains(target)) {
        setShowControls(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showControls, isMobile]);

  useEffect(() => {
    // Fast noise implementation
    const P = new Uint8Array(512);
    const perm = new Uint8Array([151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]);
    for(let i = 0; i < 256; i++) P[256+i] = P[i] = perm[i];

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t: number, a: number, b: number) => a + t * (b - a);
    const grad = (hash: number, x: number, y: number, z: number) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
    };

    const noise = (x: number, y: number, z: number) => {
      const X = (x & 255), Y = (y & 255), Z = (z & 255);
      x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
      const u = fade(x), v = fade(y), w = fade(z);
      const A = P[X] + Y, AA = P[A] + Z, AB = P[A + 1] + Z, B = P[X + 1] + Y, BA = P[B] + Z, BB = P[B + 1] + Z;
      return lerp(w, lerp(v, lerp(u, grad(P[AA], x, y, z), grad(P[BA], x - 1, y, z)),
                         lerp(u, grad(P[AB], x, y - 1, z), grad(P[BB], x - 1, y - 1, z))),
                     lerp(v, lerp(u, grad(P[AA + 1], x, y, z - 1), grad(P[BA + 1], x - 1, y, z - 1)),
                         lerp(u, grad(P[AB + 1], x, y - 1, z - 1), grad(P[BB + 1], x - 1, y - 1, z - 1))));
    };

    // Config & state
    const W = 55, H = 60;
    const aspectScale = 50;
    
    let rotSpeed = controls.speed / 1000;
    let muscleFactor = controls.muscle / 10;
    let resolution = controls.quality;
    let angle = 0;
    let time = 0;

    let bodyPoints = new Float32Array(0);

    const zBuffer = new Float32Array(W * H);
    const charBuffer = new Uint8Array(W * H);
    const chars = " ..::--==+*#%@@";
    const charLen = chars.length - 1;

    // Body definition
    const bodyParts: Record<string, BodyPart> = {
      head: { y: 0.07, rx: 0.065, rz: 0.07, h: 0.11, taperT: 0.7, taperB: 0.8, curve: 0.2 },
      neck: { y: 0.14, rx: 0.03, rz: 0.03, h: 0.05, taperT: 1.0, taperB: 1.2, curve: 0 },
      chest: { y: 0.24, rx: 0.09, rz: 0.06, h: 0.14, taperT: 1.1, taperB: 0.85, curve: 0.3 },
      abdomen: { y: 0.36, rx: 0.075, rz: 0.055, h: 0.12, taperT: 0.9, taperB: 0.9, curve: 0.1 },
      hips: { y: 0.46, rx: 0.075, rz: 0.05, h: 0.10, taperT: 0.9, taperB: 0.95, curve: 0.05 },
      upperArmL: { y: 0.26, rx: 0.03, rz: 0.03, h: 0.16, taperT: 1.1, taperB: 0.8, offsetX: -0.11, curve: 0.3 },
      lowerArmL: { y: 0.40, rx: 0.025, rz: 0.025, h: 0.15, taperT: 0.9, taperB: 0.6, offsetX: -0.13, curve: 0.2 },
      handL: { y: 0.54, rx: 0.02, rz: 0.015, h: 0.05, taperT: 1.0, taperB: 0.5, offsetX: -0.13, curve: 0 },
      upperArmR: { y: 0.26, rx: 0.03, rz: 0.03, h: 0.16, taperT: 1.1, taperB: 0.8, offsetX: 0.11, curve: 0.3 },
      lowerArmR: { y: 0.40, rx: 0.025, rz: 0.025, h: 0.15, taperT: 0.9, taperB: 0.6, offsetX: 0.13, curve: 0.2 },
      handR: { y: 0.54, rx: 0.02, rz: 0.015, h: 0.05, taperT: 1.0, taperB: 0.5, offsetX: 0.13, curve: 0 },
      upperLegL: { y: 0.58, rx: 0.042, rz: 0.042, h: 0.22, taperT: 1.0, taperB: 0.7, offsetX: -0.04, curve: 0.3 },
      lowerLegL: { y: 0.78, rx: 0.035, rz: 0.035, h: 0.20, taperT: 0.9, taperB: 0.6, offsetX: -0.04, curve: 0.3 },
      footL: { y: 0.97, rx: 0.03, rz: 0.06, h: 0.05, taperT: 0.8, taperB: 1.0, offsetX: -0.04, offsetZ: 0.03, curve: 0.1 },
      upperLegR: { y: 0.58, rx: 0.042, rz: 0.042, h: 0.22, taperT: 1.0, taperB: 0.7, offsetX: 0.04, curve: 0.3 },
      lowerLegR: { y: 0.78, rx: 0.035, rz: 0.035, h: 0.20, taperT: 0.9, taperB: 0.6, offsetX: 0.04, curve: 0.3 },
      footR: { y: 0.97, rx: 0.03, rz: 0.06, h: 0.05, taperT: 0.8, taperB: 1.0, offsetX: 0.04, offsetZ: 0.03, curve: 0.1 }
    };

    const checkBody = (x: number, y: number, z: number) => {
      for (const key in bodyParts) {
        const part = bodyParts[key as keyof typeof bodyParts];
        const py = y - part.y;
        const halfH = part.h * 0.5;
        if (py < -halfH || py > halfH) continue;

        const t = (py + halfH) / part.h;
        const st = t * t * (3 - 2 * t);
        let taper = part.taperT * (1 - st) + part.taperB * st;
        
        if (part.curve > 0) taper += Math.sin(t * Math.PI) * part.curve * muscleFactor;
        
        const px = x - (part.offsetX || 0);
        const pz = z - (part.offsetZ || 0);
        const rx = part.rx * taper;
        const rz = part.rz * taper;
        
        if ((px * px) / (rx * rx) + (pz * pz) / (rz * rz) <= 1.0) return true;
      }
      return false;
    };

    const bakeBody = () => {
      const step = 1.0 / resolution;
      const tempPoints: number[] = [];
      const eps = 0.01;

      for (let y = 0; y <= 1.05; y += step) {
        const scanW = 0.35;
        for (let x = -scanW; x <= scanW; x += step * 0.7) {
          for (let z = -0.22; z <= 0.22; z += step * 0.7) {
            if (checkBody(x, y, z)) {
              const nx = checkBody(x - eps, y, z) ? -1 : (checkBody(x + eps, y, z) ? 1 : 0);
              const ny = checkBody(x, y - eps, z) ? -1 : (checkBody(x, y + eps, z) ? 1 : 0);
              const nz = checkBody(x, y, z - eps) ? -1 : (checkBody(x, y, z + eps) ? 1 : 0);
              let l = Math.sqrt(nx * nx + ny * ny + nz * nz);
              if (l === 0) l = 1;
              
              tempPoints.push(x, y, z, nx / l, ny / l, nz / l);
            }
          }
        }
      }
      
      bodyPoints = new Float32Array(tempPoints);
    };

    const render = () => {
      if (!canvasRef.current || !isVisible) return;

      rotSpeed = controls.speed / 1000;
      muscleFactor = controls.muscle / 10;
      
      zBuffer.fill(-Infinity);
      charBuffer.fill(0);
      
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      
      const lx = 0.6, ly = -0.4, lz = 0.8;
      const il = 1 / 1.077;
      const nlx = lx * il, nly = ly * il, nlz = lz * il;

      const len = bodyPoints.length;
      
      for (let i = 0; i < len; i += 6) {
        const bx = bodyPoints[i];
        const by = bodyPoints[i + 1];
        const bz = bodyPoints[i + 2];

        const rx = bx * cosA - bz * sinA;
        const rz = bx * sinA + bz * cosA;
        
        const sx = (W >> 1) + rx * aspectScale * 2.0;
        const sy = (H * 0.05) + by * aspectScale;
        
        if (sx < 0 || sx >= W || sy < 0 || sy >= H) continue;

        const screenIdx = (sy | 0) * W + (sx | 0);

        if (rz > zBuffer[screenIdx]) {
          zBuffer[screenIdx] = rz;
          
          const bnx = bodyPoints[i + 3];
          const bny = bodyPoints[i + 4];
          const bnz = bodyPoints[i + 5];

          const rnx = bnx * cosA - bnz * sinA;
          const rnz = bnx * sinA + bnz * cosA;

          let dot = rnx * nlx + bny * nly + rnz * nlz;
          if (dot < 0.1) dot = 0.1;

          const nVal = noise(bx * 12 + time * 0.2, by * 12, bz * 12);
          
          let b = dot * 0.8 + 0.1 + nVal * 0.15;
          if (dot < 0.2 && dot > -0.2) b += 0.2;

          let ci = (b * charLen) | 0;
          if (ci < 0) ci = 0;
          if (ci > charLen) ci = charLen;
          
          charBuffer[screenIdx] = ci;
        }
      }

      let output = "";
      let rowStart = 0;
      for (let y = 0; y < H; y++) {
        let row = "";
        for (let x = 0; x < W; x++) {
          const c = charBuffer[rowStart + x];
          row += (c === 0) ? ' ' : chars[c];
        }
        output += row + '\n';
        rowStart += W;
      }

      canvasRef.current.textContent = output;
      angle += rotSpeed;
      time += 0.02;
      animationRef.current = requestAnimationFrame(render);
    };

    bakeBody();
    if (isVisible) {
      render();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [controls, isVisible]);

  const updateControls = (key: keyof typeof controls, value: number) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div ref={containerRef} className={`ascii-human-container ${isMobile ? 'flex flex-col items-center' : 'relative inline-block'} ${className}`}>
      {/* Container du bonhomme avec engrenage */}
      <div className="relative inline-block">
        <pre 
          ref={canvasRef}
          className="ascii-canvas font-mono text-[6px] leading-[6px] tracking-wider text-purple-400 whitespace-pre select-none"
          style={{
            textShadow: `0 0 ${controls.glow * 0.1}px rgba(147, 51, 234, ${controls.glow * 0.008}), 0 0 ${controls.glow * 0.2}px rgba(147, 51, 234, ${controls.glow * 0.006}), 0 0 ${controls.glow * 0.3}px rgba(147, 51, 234, ${controls.glow * 0.004}), 0 0 ${controls.glow * 0.4}px rgba(147, 51, 234, ${controls.glow * 0.002})`,
            transform: 'translateZ(0)',
            willChange: 'contents',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            filter: `brightness(${1 + controls.glow * 0.006}) contrast(${1 + controls.glow * 0.008})`,
            animation: controls.glow > 0 ? 'glow 2s ease-in-out infinite alternate' : 'none'
          }}
        />
        
        {/* Bouton engrenage - toujours à droite du bonhomme */}
        <button
          onClick={() => setShowControls(!showControls)}
          className={`gear-button absolute top-0 right-0 ${isMobile ? 'w-8 h-8' : 'w-4 h-4'} flex items-center justify-center text-slate-400 hover:text-purple-400 transition-colors duration-300 z-10`}
          aria-label="Toggle controls"
        >
          <svg width={isMobile ? "20" : "12"} height={isMobile ? "20" : "12"} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
          </svg>
        </button>
      </div>
      
      {/* Sliders */}
      {showControls && (
        <div className={`controls-panel ${isMobile ? 'mt-6 flex flex-col gap-4 max-w-xs mx-auto' : 'absolute top-6 -right-16 flex-col gap-2'} flex opacity-80 hover:opacity-100 transition-all duration-300 bg-slate-900/10 backdrop-blur-sm border border-slate-700/20 rounded-lg ${isMobile ? 'p-4' : 'p-2'}`}>
        <div className={`control-group flex items-center ${isMobile ? 'gap-3' : 'gap-1'}`}>
          <label className={`${isMobile ? 'text-xs' : 'text-[9px]'} font-normal text-slate-400 uppercase tracking-widest ${isMobile ? 'min-w-[40px]' : ''}`}>{t('aboutme.controls.speed')}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={controls.speed}
            onChange={(e) => updateControls('speed', parseInt(e.target.value))}
            className={`${isMobile ? 'w-20 h-1' : 'w-10 h-0.5'} bg-transparent border-b border-slate-400/50 appearance-none cursor-pointer slider`}
          />
          <span className={`${isMobile ? 'text-xs' : 'text-[8px]'} text-slate-300 ${isMobile ? 'min-w-[20px]' : 'min-w-[12px]'} text-right font-normal`}>{controls.speed}</span>
        </div>
        
        <div className={`control-group flex items-center ${isMobile ? 'gap-3' : 'gap-1'}`}>
          <label className={`${isMobile ? 'text-xs' : 'text-[9px]'} font-normal text-slate-400 uppercase tracking-widest ${isMobile ? 'min-w-[40px]' : ''}`}>{t('aboutme.controls.muscle')}</label>
          <input
            type="range"
            min="0"
            max="20"
            value={controls.muscle}
            onChange={(e) => updateControls('muscle', parseInt(e.target.value))}
            className={`${isMobile ? 'w-20 h-1' : 'w-10 h-0.5'} bg-transparent border-b border-slate-400/50 appearance-none cursor-pointer slider`}
          />
          <span className={`${isMobile ? 'text-xs' : 'text-[8px]'} text-slate-300 ${isMobile ? 'min-w-[20px]' : 'min-w-[12px]'} text-right font-normal`}>{controls.muscle}</span>
        </div>
        
        <div className={`control-group flex items-center ${isMobile ? 'gap-3' : 'gap-1'}`}>
          <label className={`${isMobile ? 'text-xs' : 'text-[9px]'} font-normal text-slate-400 uppercase tracking-widest ${isMobile ? 'min-w-[40px]' : ''}`}>{t('aboutme.controls.quality')}</label>
          <input
            type="range"
            min="30"
            max="80"
            value={controls.quality}
            onChange={(e) => updateControls('quality', parseInt(e.target.value))}
            className={`${isMobile ? 'w-20 h-1' : 'w-10 h-0.5'} bg-transparent border-b border-slate-400/50 appearance-none cursor-pointer slider`}
          />
          <span className={`${isMobile ? 'text-xs' : 'text-[8px]'} text-slate-300 ${isMobile ? 'min-w-[20px]' : 'min-w-[12px]'} text-right font-normal`}>{controls.quality}</span>
        </div>
        
        <div className={`control-group flex items-center ${isMobile ? 'gap-3' : 'gap-1'}`}>
          <label className={`${isMobile ? 'text-xs' : 'text-[9px]'} font-normal text-slate-400 uppercase tracking-widest ${isMobile ? 'min-w-[40px]' : ''}`}>{t('aboutme.controls.glow')}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={controls.glow}
            onChange={(e) => updateControls('glow', parseInt(e.target.value))}
            className={`${isMobile ? 'w-20 h-1' : 'w-10 h-0.5'} bg-transparent border-b border-slate-400/50 appearance-none cursor-pointer slider`}
          />
          <span className={`${isMobile ? 'text-xs' : 'text-[8px]'} text-slate-300 ${isMobile ? 'min-w-[20px]' : 'min-w-[12px]'} text-right font-normal`}>{controls.glow}</span>
        </div>
        </div>
      )}

      <style>{`
        @keyframes glow {
          0% {
            filter: brightness(1.2) contrast(1.3);
          }
          50% {
            filter: brightness(1.4) contrast(1.5);
          }
          100% {
            filter: brightness(1.2) contrast(1.3);
          }
        }
        
        .slider {
          background: transparent;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #9333ea;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: none;
          transition: all 0.3s ease;
          opacity: 0.8;
        }
        
        .slider::-webkit-slider-thumb:hover {
          opacity: 1;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(147, 51, 234, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #9333ea;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: none;
          opacity: 0.8;
        }
        
        .slider::-moz-range-thumb:hover {
          opacity: 1;
          transform: scale(1.5);
        }
      `}</style>
    </div>
  );
};

export default ASCIIHuman;
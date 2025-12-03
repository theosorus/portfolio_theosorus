import { useEffect, useRef, useState } from 'react';

interface ASCIIHumanProps {
  className?: string;
  isMobile?: boolean;
}

const ASCIIHuman = ({ className = '', isMobile = false }: ASCIIHumanProps) => {
  const canvasRef = useRef<HTMLPreElement>(null);
  const animationRef = useRef<number>();
  const [controls, setControls] = useState({
    speed: 25,
    muscle: 10,
    quality: 55
  });

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
    let pointsCount = 0;

    const zBuffer = new Float32Array(W * H);
    const charBuffer = new Uint8Array(W * H);
    const chars = " ..::--==+*#%@@";
    const charLen = chars.length - 1;

    // Body definition
    const bodyParts = {
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
      pointsCount = tempPoints.length / 6;
    };

    const render = () => {
      if (!canvasRef.current) return;

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
    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [controls]);

  const updateControls = (key: keyof typeof controls, value: number) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`ascii-human-container relative inline-block ${className}`}>
      <pre 
        ref={canvasRef}
        className="ascii-canvas font-mono text-[6px] leading-[6px] tracking-wider text-purple-400 whitespace-pre select-none"
        style={{
          textShadow: '0 0 10px rgba(147, 51, 234, 0.6), 0 0 20px rgba(147, 51, 234, 0.3)',
          transform: 'translateZ(0)',
          willChange: 'contents',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          filter: 'brightness(1.2) contrast(1.3)'
        }}
      />
      
      <div className={`controls-panel ${isMobile ? 'relative top-0 right-0 mt-4 flex-row justify-center' : 'absolute top-10 -right-12 flex-col'} flex gap-2 opacity-60 hover:opacity-90 transition-opacity duration-500`}>
        <div className="control-group flex items-center gap-1">
          <label className="text-[9px] font-normal text-slate-400 uppercase tracking-widest">Vit</label>
          <input
            type="range"
            min="0"
            max="100"
            value={controls.speed}
            onChange={(e) => updateControls('speed', parseInt(e.target.value))}
            className="w-10 h-0.5 bg-transparent border-b border-slate-400/50 appearance-none cursor-pointer slider"
          />
          <span className="text-[8px] text-slate-300 min-w-[12px] text-right font-normal">{controls.speed}</span>
        </div>
        
        <div className="control-group flex items-center gap-1">
          <label className="text-[9px] font-normal text-slate-400 uppercase tracking-widest">Mus</label>
          <input
            type="range"
            min="0"
            max="20"
            value={controls.muscle}
            onChange={(e) => updateControls('muscle', parseInt(e.target.value))}
            className="w-10 h-0.5 bg-transparent border-b border-slate-400/50 appearance-none cursor-pointer slider"
          />
          <span className="text-[8px] text-slate-300 min-w-[12px] text-right font-normal">{controls.muscle}</span>
        </div>
        
        <div className="control-group flex items-center gap-1">
          <label className="text-[9px] font-normal text-slate-400 uppercase tracking-widest">Qua</label>
          <input
            type="range"
            min="30"
            max="80"
            value={controls.quality}
            onChange={(e) => updateControls('quality', parseInt(e.target.value))}
            className="w-10 h-0.5 bg-transparent border-b border-slate-400/50 appearance-none cursor-pointer slider"
          />
          <span className="text-[8px] text-slate-300 min-w-[12px] text-right font-normal">{controls.quality}</span>
        </div>
      </div>

      <style>{`
        .slider {
          background: transparent;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 5px;
          height: 5px;
          background: #9333ea;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: none;
          transition: all 0.3s ease;
          opacity: 0.8;
        }
        
        .slider::-webkit-slider-thumb:hover {
          opacity: 1;
          transform: scale(1.5);
          box-shadow: 0 0 8px rgba(147, 51, 234, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 5px;
          height: 5px;
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
// src/components/InfoBulle.tsx
import { useState, useLayoutEffect, useEffect, useRef } from 'react';

export default function InfoBulle() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [useLayout, setUseLayout] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Version useEffect — flash visible car exécuté APRÈS l'affichage
  useEffect(() => {
    if (useLayout) return;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    }
  }, [useLayout]);

  // Version useLayoutEffect — pas de flash car exécuté AVANT l'affichage
  useLayoutEffect(() => {
    if (!useLayout) return;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    }
  }, [useLayout]);

  return (
    <div style={{ padding: '1rem', borderBottom: '1px solid #ddd', background: '#fff' }}>
      <button 
        onClick={() => {
          setPosition({ top: 0, left: 0 }); // On reset pour forcer le flash
          setUseLayout(prev => !prev);
        }}
        style={{ marginBottom: '10px' }}
      >
        Mode : <strong>{useLayout ? 'useLayoutEffect (Stable)' : 'useEffect (Flash)'}</strong>
      </button>
      <br />
      <button ref={buttonRef}>Survolez-moi</button>
      
      <div style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        background: position.top === 0 ? 'red' : '#333',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        zIndex: 1000
      }}>
        {position.top === 0 ? '⚡ FLASH (0,0)' : 'Positionné !'}
      </div>
    </div>
  );
}
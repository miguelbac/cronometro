import { useState, useEffect, useRef } from 'react';
import './Cronometro.css';

function Cronometro() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const toggleRunning = () => setRunning(!running);
  const reset = () => {
    setSeconds(0);
    setRunning(false);
  };

  let color = '#f0f0f0';
  let mensaje = '';

  if (seconds < 10) {
    color = '#d0f0c0';
    mensaje = '¡Vamos bien!';
  } else if (seconds < 20) {
    color = '#ffe082';
    mensaje = '¡Casi, casi!';
  } else {
    color = '#ef9a9a';
    mensaje = '¡Tiempo agotado!';
  }

  return (
    <div className="cronometro" style={{ backgroundColor: color }}>
      <h1>{seconds}s</h1>
      <p>{mensaje}</p>
      <div className="controls">
        <button onClick={toggleRunning}>
          {running ? 'Pausar' : 'Reanudar'}
        </button>
        <button onClick={reset}>Reiniciar</button>
      </div>
    </div>
  );
}

export default Cronometro;

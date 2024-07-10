import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 10);
      }, 10);
    } else {
      clearIntrval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    const milliseconds = Math.floor(elapsedTime / 10) % 100;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60));

    const formattedMilliseconds = `0${milliseconds}`.slice(-2);
    const formattedSeconds = `0${seconds}`.slice(-2);
    const formattedMinutes = `0${minutes}`.slice(-2);

    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="stopwatch-display">{formatTime()}</div>
      <div className="stopwatch-controls">
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleReset} disabled={isRunning}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;

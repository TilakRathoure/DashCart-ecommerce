import { useState, useEffect } from "react";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursto: string = hours >= 9 ? hours.toString() : `0${hours}`;
  const minutesto: string = minutes >= 9 ? minutes.toString() : `0${minutes}`;
  const secondsto: string = seconds >= 9 ? seconds.toString() : `0${seconds}`;

  return `${hoursto}:${minutesto}:${secondsto}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalID: ReturnType<typeof setInterval>;
    if (isRunning)
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center text-admin-text">
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight">
        Stopwatch
      </h1>
      <section className="admin-card flex w-full max-w-md flex-col items-center gap-8 p-10">
        <h2 className="font-mono text-4xl font-light tracking-widest">
          {formatTime(time)}
        </h2>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setIsRunning((prev) => !prev)}
            className="admin-btn px-8 py-3"
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            type="button"
            onClick={resetHandler}
            className="admin-btn-ghost px-8 py-3"
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
};

export default Stopwatch;

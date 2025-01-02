
import { useState, useEffect } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursto:string = hours>=9 ? hours.toString() : `0${hours}`
  const minutesto:string = minutes>=9 ? minutes.toString() : `0${minutes}`
  const secondsto:string = seconds>=9 ? seconds.toString() : `0${seconds}`

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
    let intervalID: ReturnType<typeof setInterval> ;
    if (isRunning)
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  return (
    <div className=" backgco text-gray-100 h-screen flex justify-center items-center">

      <AdminSidebar />

      <main className="md:w-3/4 flex flex-col p-16 backgco h-[75vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">Stopwatch</h1>
        <section className="flex flex-col items-center justify-center h-full gap-8">
          <div className="stopwatch text-center">
            <h2 className="text-2xl font-light">{formatTime(time)}</h2>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setIsRunning((prev) => !prev)}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
              >
                {isRunning ? "Stop" : "Start"}
              </button>
              <button
                onClick={resetHandler}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
  
};

export default Stopwatch;
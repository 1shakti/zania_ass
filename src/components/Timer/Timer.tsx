import { useEffect, useState } from "react";

interface TimerProps {
  lastSavedTime: number | null;
}

function Timer({ lastSavedTime }: TimerProps) {
  const [timeElapsed, setTimeElapsed] = useState<string>("Not saved yet");

  useEffect(() => {
    const calculateTimeElapsed = () => {
      if (lastSavedTime) {
        const now = Date.now();
        const secondsSinceLastSave = Math.floor((now - lastSavedTime) / 1000);
        const minutesSinceLastSave = Math.floor(secondsSinceLastSave / 60);
        const hoursSinceLastSave = Math.floor(minutesSinceLastSave / 60);

        const seconds = secondsSinceLastSave % 60;
        const minutes = minutesSinceLastSave % 60;
        const hours = hoursSinceLastSave;

        const formattedTime = `${hours} hours ${minutes} minutes ${seconds} seconds ago`;
        setTimeElapsed(formattedTime);
      } else {
        setTimeElapsed("Not saved yet");
      }
    };

    calculateTimeElapsed();
    const intervalId = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(intervalId);
  }, [lastSavedTime]);

  return (
    <span>
      <span className="font-bold">Since last saved: </span>
      {timeElapsed}
    </span>
  );
}

export default Timer;

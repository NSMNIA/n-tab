import { createContext, useEffect, useState } from 'react';

type Time = {
  absolute: Date;
  zoned: Date;
};

const getTime = (timeZone: string | null = null): Time => {
  const absolute = new Date();
  const zoned = timeZone ? new Date(absolute.toLocaleString('en-US', { timeZone })) : absolute;
  return { absolute, zoned };
};

export const TimeContext = createContext(getTime());

const TimeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [time, setTime] = useState(getTime(timeZone));

  useEffect(() => {
    setTime(getTime(timeZone));
    const interval = setInterval(() => setTime(getTime(timeZone)), 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};

export default TimeProvider;

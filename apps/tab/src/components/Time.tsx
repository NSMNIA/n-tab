import { useTime } from '@/hooks/useTime';

const Time = () => {
  const language = Intl.DateTimeFormat().resolvedOptions().locale;
  const time = useTime();

  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col gap-3 p-4 z-30">
      <h1 className="scroll-m-20 font-bold tracking-tight text-5xl sm:text-[12vw] leading-none lg:text-9xl text-primary">
        {time.toLocaleString(language, {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </h1>
      <h2 className="text-lg font-bold text-primary">
        {time.toLocaleString(language, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </h2>
    </div>
  );
};

export default Time;

import { useTime } from "./hooks/useTime";

const App = () => {
    const time = useTime();
    return <div>{time.toLocaleTimeString()}</div>;
};

export default App;

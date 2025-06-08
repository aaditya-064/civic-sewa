import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>Hello World</p>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
    </>
  );
}

export default App;

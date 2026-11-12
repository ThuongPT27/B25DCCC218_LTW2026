import { useState, useEffect } from 'react';

// Đếm 3, 2, 1 rồi gọi onDone
const Countdown = ({ onDone }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count > 1) setCount(count - 1);
      else onDone();
    }, 1000);
    return () => clearTimeout(timer);
  }, [count, onDone]);

  return <div className="countdown">{count}</div>;
};

export default Countdown;

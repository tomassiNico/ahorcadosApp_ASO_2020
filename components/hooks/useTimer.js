import { useState, useEffect } from "react";

const useTimer = () => {
    const [seconds, setSeconds] = useState(0);
    let interval;
  
    useEffect(()=>{
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000)
  
      return () => clearInterval(interval)
    }, [])
  
    const stopTimer = () => clearInterval(interval)
  
    return [seconds, stopTimer]
  }

  export default useTimer
import { useState, useEffect } from "react";

const useTimer = () => {
    const [timer, setTimer] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setPause] =  useState(false);
  
    useEffect(()=>{
      const timer = setInterval(() => {
        if(!isPaused){
          setSeconds(seconds => seconds + 1);
        }
      }, 1000);
      setTimer(timer);
      
      return () => clearInterval(timer);
    }, [])
  
    const stopTimer = () => {
      setPause(true);
      clearInterval(timer)
    }

    const resetTimer = () => {
      setSeconds(0);
      setPause(false);
      const timer = setInterval(() => {
        if(!isPaused){
          setSeconds(seconds => seconds + 1);
        }
      }, 1000);
      setTimer(timer);
    };
  
    return [seconds, stopTimer, resetTimer]
  }

  export default useTimer
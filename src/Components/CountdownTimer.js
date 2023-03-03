import React, { useState, useRef, useEffect } from 'react'
  
  
function CountdownTimer({ result, handleClick }) {
  
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');
    const [showTimer, setShowTimer] = useState(false)
  
    useEffect(() => {
        if(result.status === 'Ongoing') {
            setShowTimer(true)
        }else {
            setShowTimer(false)
        }
    }, [result.status])
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        return {
            total, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                seconds
            )
        }else {
            handleClick()
        }
    }
  
  
    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer(10);
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }
  
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
  
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());

        // eslint-disable-next-line
    }, [result.questionNumber, result.status]); 
  
    return (
        <div>
            {showTimer && <h2>{timer}</h2>}
        </div>
    )
}
  
export default CountdownTimer;

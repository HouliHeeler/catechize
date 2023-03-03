import React, { useState, useRef, useEffect } from 'react'
  
  
function CountdownTimer({ result, handleClick }) {
  
    //Ref used to access JS setInterval
    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');

    //Uses Display: "None" to hide the timer when not in use
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
  
    //Updates timer on a second by second basis
    const startTimer = (e) => {
        let { total, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                seconds
            )
        }else if(total === -1000 && result.status === "Start") {
            clearTimer(getDeadTime())
        }else {
            handleClick()
        }
    }
  
    const clearTimer = (e) => {
        //Set original timer display
        setTimer(20);
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if(Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust the timer starting position
        deadline.setSeconds(deadline.getSeconds() + 20);
        return deadline;
    }
  
    //Starts the timer anew when the status or question number change
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

import Classified from '../app/classified.png'
import AlarmClock from '../app/alarmclock.png'
import Binoculars from '../app/binoculars.png'
import UpsideDown from '../app/upsideDown.png'

function Challenges({ setPlayerOneChallenges, setPlayerTwoChallenges, upsideDown, setUpsideDown, redacted, setRedacted, thinkFast, setThinkFast, needGlasses, setNeedGlasses, result, quizType}) {
    
    //Function that updates remaining player challenges based on option selected/unselected
    function handleChallenges(e) {
        if(result.turn === 1) {
            if(e === 'redacted') {
                if(redacted) {
                    setPlayerTwoChallenges(prevTotal => prevTotal - 1)
                }else {
                    setPlayerTwoChallenges(prevTotal => prevTotal + 1)
                }
            }else if(e === 'thinkFast') {
                if(thinkFast) {
                    setPlayerTwoChallenges(prevTotal => prevTotal - 1)
                }else {
                    setPlayerTwoChallenges(prevTotal => prevTotal + 1)
                }
            }else if(e === 'upsideDown') {
                if(upsideDown) {
                    setPlayerTwoChallenges(prevTotal => prevTotal - 1)
                }else {
                    setPlayerTwoChallenges(prevTotal => prevTotal + 1)
                }
            }else {
                if(needGlasses) {
                    setPlayerTwoChallenges(prevTotal => prevTotal - 1)
                }else {
                    setPlayerTwoChallenges(prevTotal => prevTotal + 1)
                }
            }   
        }else {
            if(e === 'redacted') {
                if(redacted) {
                    setPlayerOneChallenges(prevTotal => prevTotal - 1)
                }else {
                    setPlayerOneChallenges(prevTotal => prevTotal + 1)
                }
            }else if(e === 'thinkFast') {
                if(thinkFast) {
                    setPlayerOneChallenges(prevTotal => prevTotal - 1)
                }else {
                    setPlayerOneChallenges(prevTotal => prevTotal + 1)
                }
            }else if(e === 'upsideDown') {
                if(upsideDown) {
                    setPlayerOneChallenges(prevTotal => prevTotal - 1)
                }else {
                    setPlayerOneChallenges(prevTotal => prevTotal + 1)
                }
            }else {
                if(needGlasses) {
                    setPlayerOneChallenges(prevTotal => prevTotal - 1)
                }else {
                    setPlayerOneChallenges(prevTotal => prevTotal + 1)
                }
            }   
        }
    }

    //Challenge Buttons
    return (
        <div className='challenge--buttons'>
            <div
                id="redacted"
                onClick={(e) => {setRedacted(prevState => !prevState); handleChallenges(e.target.parentNode.id)}} 
                className={redacted ? 'challenge--button--clicked' : 'challenge--button'} >
                  <img src={Classified} alt="Classified" />
            </div>
            <div
                id="upsideDown"
                onClick={(e) => {setUpsideDown(prevState => !prevState); handleChallenges(e.target.parentNode.id)}} 
                className={upsideDown ? 'challenge--button--clicked' : 'challenge--button'} >
                  <img src={UpsideDown} alt="Classified" />
            </div>
            {quizType.timer[0] !== 'none' && 
                <div 
                    id="thinkFast"
                    onClick={(e) => {setThinkFast(prevState => !prevState); handleChallenges(e.target.parentNode.id)}} 
                    className={thinkFast ? 'challenge--button--clicked' : 'challenge--button'}>
                      <img src={AlarmClock} alt="Alarm Clock" />
                </div>}
            <div 
                id="needGlasses"
                onClick={(e) => {setNeedGlasses(prevState => !prevState); handleChallenges(e.target.parentNode.id)}} 
                className={needGlasses ? 'challenge--button--clicked' : 'challenge--button'}>
                  <img src={Binoculars} alt="Binoculars" />
            </div>
        </div>
    )
}

export default Challenges
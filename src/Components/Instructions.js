import Classified from '../app/classified.png'
import AlarmClock from '../app/alarmclock.png'
import Binoculars from '../app/binoculars.png'
import UpsideDown from '../app/upsideDown.png'

function Instructions({ setInstructionsSeen }) {
    return (
        <section className="instructions">
            <div>
                <p>This is a place to take a quiz, either on a solo adventure, or against a friend!</p>
                <p>Set up the quiz you want by selecting as many categories as you like, then the number of contestants, number of questions, difficulty, and how long you can take with each question.</p>
                <p>There are challenges you can use to make your opponents life harder. They are a finite resource, so spend wisely.</p>
            </div>
            <div className='instructions--challenge'>
                <img src={Classified} alt="Classified" />
                <p>This challenge redacts one of the multiple choice options, sometimes the right answer!</p>
            </div>
            <div className='instructions--challenge'>
                <img src={AlarmClock} alt="Alarm Clock" />
                <p>This challenge cuts the allotted time in half.</p>
            </div>
            <div className='instructions--challenge'>
                <img src={Binoculars} alt="Binoculars" />
                <p>This challenge shrinks the font size of the answer selection way, way down. Rick Moranis approved!</p>
            </div>
            <div className='instructions--challenge'>
                <img src={UpsideDown} alt="Slipping Man" />
                <p>This challenge flips the answers right on their head. Shockingly difficult to read that way!</p>
            </div>
            <button 
                className='start--button' 
                onClick={() => setInstructionsSeen(true)}>
                    Let's Move On
            </button>
        </section>
    )
}

export default Instructions
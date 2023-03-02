import { FaCheck, FaSkullCrossbones } from 'react-icons/fa';

function ResultSpan({ result, status }) {

    return (
        <div>
            {result["text"] === 'Correct' && status === 'Ongoing' ?
                <div className='card--result' style={{color:"green"}}>
                    <FaCheck />
                    <span>{result["text"]}</span>
                </div> : result["text"] === 'Incorrect' && status === 'Ongoing' ?
                <div className='card--result' style={{color:"red"}}>
                    <FaSkullCrossbones />
                    <span>{result["text"]}</span>
                </div> :
                <div></div>
            }
        </div>
    )
}

export default ResultSpan
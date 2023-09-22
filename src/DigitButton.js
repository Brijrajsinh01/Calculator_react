import { ACTIONS } from "./App"
export default function DigitButton({ dispatch, digit,bclassname,}) {
    var newclassname="_" + bclassname;
    return <button className={bclassname}
    onClick={() => dispatch( {type: ACTIONS.ADD_DIGIT, payload: { digit }})}
    >
    <div className={newclassname}>{digit} </div>
    
    </button>
}
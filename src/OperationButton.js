import { ACTIONS } from "./App"
export default function OperationButton({ dispatch, operation ,bclassname,}) {
    var newclassname="_" + bclassname;
    return <button className={bclassname}
    onClick={() => dispatch( {type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}
    >
    <div className={newclassname}>{operation} </div>
    
    </button>
}
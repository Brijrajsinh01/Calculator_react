import logo from './logo.svg';
import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT:' delete-digit',
  EVALUATE:'evaluate'

}

function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:

      if (payload.digit ==="0" && state.currentOperand ==="0")
      {
        return {...state,
        }
      }
      if(state.currentOperand == null && payload.digit.includes("."))
      {
      return {
        ...state,
        currentOperand: `${state.currentOperand || "0"}${payload.digit}`
        }

      }
      if (payload.digit ==="." && state.currentOperand.includes("."))
      {
      return state
      }
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:

      if(state.currentOperand == null && state.previousOperand == null)
      {
        return state
      }

      if (state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null)
      {
        return { 
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.EVALUATE:

      if(state.currentOperand==null){
        return{
          ...state
        }
      }
      return{
      previousOperand: evaluate(state)
      }
    
    case ACTIONS.DELETE_DIGIT:
      if(state.currentOperand == null){
        return{
          ...state
        }
      }
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }

    case ACTIONS.CLEAR:
      return {}
  }

}

function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computaion =""
  switch(operation){
    case "+":
      computaion= prev + current
      break
    case "-":
      computaion=  prev - current
      break
    case "*":
      computaion= prev * current
      break
    case "÷":
      computaion=  prev / current
      break
  }
  return computaion.toString()
}

function App() {
  const [{currentOperand,previousOperand,operation}, dispatch] =useReducer(reducer,{})

  
  return (
  <div className="base">
    <div className="calculator">
      <div className="frame-2">
        <div className="output">
          <div className="previous-output">{previousOperand} {operation}</div>
          <div className="current-output">{currentOperand}</div>
        </div>
        <div className="input">
          <div className="row-1">
            <button className="frame-3" onClick={() => dispatch({ type: ACTIONS.CLEAR})}>
              <div className="ac" >AC </div>
            </button>
            <button className="delete" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT})}>
              <div className="del">DEL </div>
            </button>
            <OperationButton bclassname="division" operation="÷" dispatch={dispatch} />            
          </div>
          <div className="row-2">
            <DigitButton bclassname="one" digit="1" dispatch={dispatch} />
            <DigitButton bclassname="two" digit="2" dispatch={dispatch} />
            <DigitButton bclassname="three" digit="3" dispatch={dispatch} />
            <OperationButton bclassname="multiplication" operation="*" dispatch={dispatch} />
          </div>
          <div className="row-3">
          <DigitButton bclassname="four" digit="4" dispatch={dispatch} />
            <DigitButton bclassname="five" digit="5" dispatch={dispatch} />
            <DigitButton bclassname="six" digit="6" dispatch={dispatch} />
            <OperationButton bclassname="addition" operation="+" dispatch={dispatch} />
          </div>
          <div className="row-4">
          <DigitButton bclassname="seven" digit="7" dispatch={dispatch} />
          <DigitButton bclassname="eight" digit="8" dispatch={dispatch} />
          <DigitButton bclassname="nine" digit="9" dispatch={dispatch} />
          <OperationButton bclassname="subtraction" operation="-" dispatch={dispatch} />
          </div>
          <div className="row-5">
          <DigitButton bclassname="decimal" digit="." dispatch={dispatch} />
          <DigitButton bclassname="zero" digit="0" dispatch={dispatch} />
            <button className="evaluate" onClick={() => dispatch({ type: ACTIONS.EVALUATE})}>
              <div className="_evaluate">= </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
);
}

export default App;

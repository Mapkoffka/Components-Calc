import React, { useState } from 'react';
import styles from './App.module.css';

const NUMS = ['1','2','3','4','5','6','7','8','9'];
const OPS = ['+', '-', '=', 'C'];

const App = () => {
  const [operand1, setOperand1] = useState('');
  const [operator, setOperator] = useState('');
  const [operand2, setOperand2] = useState('');
  const [resultComputed, setResultComputed] = useState(false);

  const onDigitClick = (digit) => {
    if (resultComputed) {
      setOperand1(digit);
      setOperator('');
      setOperand2('');
      setResultComputed(false);
      return;
    }
    if (!operator) {
      setOperand1(prev => (prev === '0' ? digit : prev + digit));
    } else {
      setOperand2(prev => (prev === '0' ? digit : prev + digit));
    }
  };

  const onOpClick = (op) => {
    if (op === 'C') {
      setOperand1('');
      setOperator('');
      setOperand2('');
      setResultComputed(false);
      return;
    }
    if (op === '=' && operator && operand2) {
      let n1 = parseInt(operand1, 10);
      let n2 = parseInt(operand2, 10);
      let res = 0;
      if (operator === '+') res = n1 + n2;
      else if (operator === '-') res = n1 - n2;
      setOperand1(res.toString());
      setOperator('');
      setOperand2('');
      setResultComputed(true);
      return;
    }
    if (!operand1) return;
    if (resultComputed) {
      setOperator(op);
      setOperand2('');
      setResultComputed(false);
    } else {
      if (operator && operand2) {
        let n1 = parseInt(operand1, 10);
        let n2 = parseInt(operand2, 10);
        let res = 0;
        if (operator === '+') res = n1 + n2;
        else if (operator === '-') res = n1 - n2;
        setOperand1(res.toString());
        setOperator(op);
        setOperand2('');
      } else {
        setOperator(op);
      }
    }
  };

  const displayText = operand1 + operator + operand2;

  let resultColorClass = '';
  if (resultComputed) {
    const value = parseInt(operand1, 10);
    if (value > 0) {
      resultColorClass = styles.resultPositive;
    } else {
      resultColorClass = styles.resultNegative;
    }
  }

  return (
    <div className={styles.app}>
      <h1>Калькулятор</h1>
      <div
        className={`${styles.display} ${resultColorClass}`}
        data-testid="display"
      >
        {displayText || '0'}
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.numsWrapper}>
          <div className={styles.numsGrid}>
            {NUMS.map(num => (
              <button
                key={num}
                type="button"
                className={styles.button}
                onClick={() => onDigitClick(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`${styles.button} ${styles.zeroButton}`}
            onClick={() => onDigitClick('0')}
          >
            0
          </button>
        </div>
        <div className={styles.ops}>
          {OPS.map(op => (
            <button
              key={op}
              type="button"
              className={styles.button}
              onClick={() => onOpClick(op)}
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
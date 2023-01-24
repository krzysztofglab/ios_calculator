export class Calculator {
  constructor() {
    this.output = '0';
    this.currentValue = '0';
    this.previousValue = null;
    this.currentOperator = null;
    this.numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
    this.elResult = document.querySelector('.result');
    this.elClear = document.querySelector('.btn-clear');
    this.elButtons = document.querySelectorAll('button');
    this.initEventListeners();
  }

  action(value, button) {
    const key = this.numbers.includes(value) ? "number" : value;
    this.elButtons.forEach(button => button.classList.remove('active'));

    switch (key) {
      case "AC":
        this.clearResult();
        this.writeResult();
      break;
      case "C":
        this.clearResult();
        this.writeResult();
      break;
      case "±":
        if(this.currentValue.includes('-')) {
          this.currentValue = this.currentValue.replace('-', '');
        } else {
          this.currentValue = `-${this.currentValue}`;
        }
        this.writeResult();
      break;
      case "%":
      break;
      case "÷":
        this.setOperator('/');
        button.classList.add('active');
      break;
      case "×":
        this.setOperator('*');
        button.classList.add('active');
      break;
      case "-":
        this.setOperator('-');
        button.classList.add('active');
      break;
      case "+":
        this.setOperator('+');
        button.classList.add('active');
      break;
      case "=":
        this.calculate();
      break;
      case "number":
        this.updateResult(value);
      break;
      default:
        break;
    }
  }

  clearResult() {
    this.currentValue = "0"
    this.previousValue = '';
    this.currentOperator = '';
  }

  calculate() {
    if(this.currentOperator == '') return
    if(this.currentValue == '') {
      this.currentValue = eval(`${Number(this.previousValue.replace(',','.'))} ${this.currentOperator} ${Number(this.previousValue.replace(',','.'))}`);
    } else {
      this.currentValue = eval(`${Number(this.previousValue.replace(',','.'))} ${this.currentOperator} ${Number(this.currentValue.replace(',','.'))}`);
    }
    this.validateResult();
    this.previousValue = this.currentValue;
    this.currentValue = '';
  }

  validateResult() {
    const valueLength = this.currentValue.toString().length > 9 ? 7 : this.currentValue.toString().length - 2;
    if(this.currentValue < 1) {
      this.currentValue = this.currentValue.toFixed(valueLength).toString().replace('.',',');
      this.writeResult(this.currentValue);
    } else {
      this.currentValue = this.currentValue.toString().replace('.',',');
      this.writeResult(this.currentValue);
    }

  }

  setOperator(operator) {
    if(this.previousValue != '' && this.currentValue != '') {
      this.calculate();
    } else {
      if(this.currentValue != '') {
        this.previousValue = this.currentValue;
        this.currentValue = '';
      }
    }

    this.currentOperator = operator;
  }

  updateResult(value) {
    const valueLength = this.currentValue.replace('-','').replace(',','').length;

    if(valueLength < 9) {
      if(value == "0") {
        if(this.currentValue != "0" && this.currentValue != "-0") {
          this.currentValue += value;
        }
      } else {
        if(this.currentValue == "0" || this.currentValue == "-0") {
          if(value == ",") {
            this.currentValue = `${this.currentValue},`;
          } else {
            if(this.currentValue == "0" ) {
              this.currentValue = value;
            } else {
              this.currentValue = `-${value}`;
            }
          }
        } else {
          if(value == ",") {
            if(!this.currentValue.includes(",")) {
              this.currentValue += value;
            }
          } else {
            this.currentValue += value;
          }
        }  
      }
      this.writeResult();
    }
  }

  writeResult() {
    this.currentValue == "0" || this.currentValue == "-0" ? this.elClear.textContent = "AC" : this.elClear.textContent = "C";

    const isComma = this.currentValue.includes(',');
    const value0 = this.currentValue.split(',')[0];
    let array = value0.split("").reverse();
    let result = this.currentValue;

    if(value0.length > 6) {
      array.splice(3,0," ");
      array.splice(7,0," ");
      result = array.reverse().join("");
      isComma ? result = `${result},${this.currentValue.split(',')[1]}`: '';

      this.elResult.textContent = result;
    } else if(value0.length > 3) {
      array.splice(3,0," ");
      result = array.reverse().join("");
      isComma ? result = `${result},${this.currentValue.split(',')[1]}`: '';

      this.elResult.textContent = result;
    } else {
      this.elResult.textContent = result;
    }

    // Adjust font-size if overflows container
    let decreasePixels = 0;
    this.elResult.style.fontSize = `${85-decreasePixels}px`;
    for (let i = 0; i < 40; i++) {
      if(this.elResult.offsetWidth > 360) {
        this.elResult.style.fontSize = `${85-decreasePixels}px`;
        decreasePixels += 1;
      }
    }
  }

  initEventListeners() {
    this.elButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.action(e.target.innerText, button);
      });
    });
  }
}
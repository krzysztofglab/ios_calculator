export class Calculator {
  constructor() {
    this.currentValue = '0';
    this.previousValue = '';
    this.currentOperator = '';
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
    // console.log(value);
    // console.log(this.currentValue);
    if(this.currentValue.length < 9) {
      if(value == "0") {
        if(this.currentValue != "0") {
          this.currentValue += value;
        }
      } else {
        if(this.currentValue == "0") {
          if(value == ",") {
            this.currentValue = "0,";
          } else {
            this.currentValue = value;
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

    if(this.currentValue.length > 6) {
      this.elResult.textContent = this.currentValue;
    } else if(this.currentValue.length > 3) {
      this.elResult.textContent = this.currentValue;
    } else {
      this.elResult.textContent = this.currentValue;
    }
    
    if(this.currentValue.toString().length <= 6) {
      this.elResult.style = "font-size: 85px";
    } else if(this.currentValue.length == 7) {
      this.elResult.style = "font-size: 79px";
    } else if(this.currentValue.length == 8) {
      this.elResult.style = "font-size: 70px";
    } else if(this.currentValue.length == 9){
      this.elResult.style = "font-size: 62px";
    } else {
      this.elResult.style = "font-size: 56px";
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
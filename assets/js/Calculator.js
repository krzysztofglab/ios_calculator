export class Calculator {
  constructor() {
    this.initValues();
    this.initElements();
    this.initEventListeners();
  }

  initValues() {
    this.val1 = null;
    this.val2 = null;
    this.result = null;
    this.operator = null;
    this.inputValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
    this.output = '0';
  }

  initElements() {
    this.UI = {
      "result": document.querySelector('.result'),
      "clear": document.querySelector('.btn-clear'),
      "buttons": document.querySelectorAll('button'),
    }
  }

  initEventListeners() {
    this.UI.buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.action(e.target.innerText, button);
      });
    });
  }

  action(value, button) {
    const key = this.inputValues.includes(value) ? "input" : value;
    //Clear CSS active class for operator buttons
    this.UI.buttons.forEach(button => button.classList.remove('active'));

    switch (key) {
      case "AC":
        this.clearOutput();
      break;
      case "C":
        this.clearOutput();
      break;
      case "±":
        this.nagateOutput();
      break;
      case "%":
        this.getOutputPercentage();
      break;
      case "÷":
        this.setOperator('/', button);
      break;
      case "×":
        this.setOperator('*', button);
      break;
      case "-":
        this.setOperator('-', button);
      break;
      case "+":
        this.setOperator('+', button);
      break;
      case "=":
        this.calculate();
      break;
      case "input":
        this.updateOutput(value);
      break;
      default:
        break;
    }
  }

  clearOutput() {
    this.val1 = null;
    this.val2 = null;
    this.result = null;
    this.operator = null;
    this.output = '0';
    this.writeResult();
  }

  getOutputPercentage() {
    const value = Number(this.output.replace(',','.'));
    const valuePercentage = (value / 100);
    this.output = valuePercentage.toString().replace('.',',');
    this.writeResult();
  }

  nagateOutput() {
    this.output == null ? this.output = this.val1 : '';
    const isNegativeNumber = this.output.includes('-');
    isNegativeNumber ? this.output = this.output.replace('-', '') : this.output = `-${this.output}`;
    this.writeResult();
  }

  calculate() {
    if(this.val1 == null) {
      this.val1 = this.output;
    } else if(this.val2 == null) {
      if(this.operator == null) {
        console.log('c');
      } else {
        if(this.output == null) {
          this.val2 = this.val1;
        } else {
          this.val2 = this.output;
        }
        this.output = eval(`${this.val1} ${this.operator} ${this.val2}`).toString();
        this.writeResult();
        this.output = '0';
      }
    } else {
      this.val1 = eval(`${this.val1} ${this.operator} ${this.val2}`).toString();
      this.output = eval(`${this.val1} ${this.operator} ${this.val2}`).toString();
      this.writeResult();
      this.output = '0';
    }
  }

  setOperator(operator, button) {
    button.classList.add('active');
    
    if(this.val1 == null) {
      this.val1 = this.output;
      this.writeResult();
      this.output = null;
    } else if(this.val2 == null) {
      this.val1 = eval(`${this.val1} ${this.operator} ${this.output}`);
      this.output = this.val1.toString();
      this.writeResult();
      this.output = null;
    } else {
      this.val1 = eval(`${this.val1} ${this.operator} ${this.val2}`);
      this.val2 = null;
      this.output = this.val1.toString();
      this.writeResult();
      this.output = null;
    }

    this.operator = operator;
  }

  updateOutput(value) {
    this.output = this.output == null ? this.output = '0' : this.output;
    const valueLengthLimit = 9;
    const valueLength = this.output.replace('-','').replace(',','').length;

    if(valueLength < valueLengthLimit) {
      if(value == "0") {
        if(this.output != "0" && this.output != "-0") {
          this.output += value;
        }
      } else {
        if(this.output == "0" || this.output == "-0") {
          if(value == ",") {
            this.output = `${this.output},`;
          } else {
            if(this.output == "0" ) {
              this.output = value;
            } else {
              this.output = `-${value}`;
            }
          }
        } else {
          if(value == ",") {
            if(!this.output.includes(",")) {
              this.output += value;
            }
          } else {
            this.output += value;
          }
        }  
      }
      this.writeResult();
    } else {
      console.log('Value lenght limit (9) exceeded!');
    }
  }

  writeResult() {
    console.log('Operator set to: ' + this.operator);
    console.log(`${this.val1} ${this.operator} ${this.val2}`)
    this.output == "0" || this.output == "-0" ? this.UI.clear.textContent = "AC" : this.UI.clear.textContent = "C";

    const isComma = this.output.includes(',');
    const isMinus = this.output.includes('-');
    const intiger = this.output.split(',')[0].replace('-','');
    let array = intiger.split("").reverse();
    let result = this.output;

    //Add space every 3 intiger values
    if(intiger.length > 6) {
      array.splice(3,0," ");
      array.splice(7,0," ");
      result = array.reverse().join("");
      isComma ? result = `${result},${this.output.split(',')[1]}`: '';
      result = isMinus ? `-${result}` : result;
      this.UI.result.textContent = result;
    } else if(intiger.length > 3) {
      array.splice(3,0," ");
      result = array.reverse().join("");
      isComma ? result = `${result},${this.output.split(',')[1]}`: '';
      result = isMinus ? `-${result}` : result;
      this.UI.result.textContent = result;
    } else {
      this.UI.result.textContent = result;
    }

    this.adjustFontSize();

  }

  adjustFontSize() {
    let decreasePixels = 0;
    this.UI.result.style.fontSize = `${85-decreasePixels}px`;
    for (let i = 0; i < 40; i++) {
      if(this.UI.result.offsetWidth > 360) {
        this.UI.result.style.fontSize = `${85-decreasePixels}px`;
        decreasePixels += 1;
      }
    }
  }
}
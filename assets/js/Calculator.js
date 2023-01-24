export class Calculator {
  constructor() {
    this.result = '0';
    this.result2 = '';
    this.numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
    this.elementResult = document.querySelector('.result');
    this.elementClear = document.querySelector('.btn-clear');
    this.buttons = document.querySelectorAll('button');
    this.initEventListeners();
  }

  action(value, button) {
    const key = this.numbers.includes(value) ? "number" : value;
    this.buttons.forEach(button => button.classList.remove('active'));

    switch (key) {
      case "AC":
        this.result = "0"
        this.writeResult();
      break;
      case "C":
        this.result = "0"
        this.writeResult();
      break;
      case "±":
        if(this.result.includes('−')) {
          this.result = this.result.replace('−', '');
        } else {
          this.result = `−${this.result}`;
        }
        this.writeResult();
      break;
      case "%":
      break;
      case "÷":
        this.calculate('/');
        button.classList.add('active');
      break;
      case "×":
        this.calculate('*');
        button.classList.add('active');
      break;
      case "−":
        this.calculate('-');
        button.classList.add('active');
      break;
      case "+":
        this.calculate('+');
        button.classList.add('active');
      break;
      case "=":
      break;
      case "number":
        this.updateResult(value);
      break;
      default:
        break;
    }
  }

  calculate() {

  }

  updateResult(value) {
    if(this.result.length < 9) {
      if(value == "0") {
        if(this.result != "0") {
          this.result += value;
        }
      } else {
        if(this.result == "0") {
          if(value == ",") {
            this.result = "0,";
          } else {
            this.result = value;
          }
        } else {
          if(value == ",") {
            if(!this.result.includes(",")) {
              this.result += value;
            }
          } else {
            this.result += value;
          }
        }  
      }
      this.writeResult();
    }
  }

  writeResult() {
    this.result == "0" || this.result == "−0" ? this.elementClear.textContent = "AC" : this.elementClear.textContent = "C";
    this.elementResult.textContent = this.result;
    
    if(this.result.length <= 6) {
      this.elementResult.style = "font-size: 85px";
    } else if(this.result.length == 7) {
      this.elementResult.style = "font-size: 79px";
    } else if(this.result.length == 8) {
      this.elementResult.style = "font-size: 70px";
    } else if(this.result.length == 9){
      this.elementResult.style = "font-size: 62px";
    } else {
      this.elementResult.style = "font-size: 56px";
    }
  }

  initEventListeners() {
    this.buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.action(e.target.innerText, button);
      });
    });
  }
}
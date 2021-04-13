`use strict`;
const operators = document.querySelectorAll(`[data-operator]`);
const numbers = document.querySelectorAll(`[data-number]`);
const clear = document.querySelector(`[data-clear]`);
const deleteButton = document.querySelector(`[data-delete]`);
const equals = document.querySelector(`[data-equal]`);
const topValue = document.querySelector(`[data-top]`);
const bottomValue = document.querySelector(`[data-bottom]`);
const input = document.querySelector(`input`);
const ouput = document.querySelector(`output`);

class Calculator {
  constructor(topValue, bottomValue) {
    this.topValue = topValue;
    this.bottomValue = bottomValue;
    this.clear();
  }
  clear() {
    this.currentValue = ``;
    this.previousValue = ``;
    this.operator = undefined;
  }
  delete() {
    this.currentValue = this.currentValue.toString().slice(0, -1);
  }
  selectNumber(num) {
    if (num === `.` && this.currentValue.includes(`.`)) return;
    this.currentValue = this.currentValue.toString() + num.toString();
  }
  selectOperator(operator) {
    if (this.currentValue == ``) return;
    if (this.previousValue != ``) {
      this.compute();
    }
    this.operator = operator;
    this.previousValue = this.currentValue;
    this.currentValue = ``;
  }
  compute() {
    let compute;
    const top = parseFloat(this.previousValue);
    const bottom = parseFloat(this.currentValue);
    if (isNaN(top) || isNaN(bottom)) return;
    switch (this.operator) {
      case `+`:
        compute = top + bottom;
        break;
      case `-`:
        compute = top - bottom;
        break;
      case `*`:
        compute = top * bottom;
        break;
      case `/`:
        compute = top / bottom;
        break;
    }

    this.currentValue = compute;
    this.previousValue = ``;
    this.operator = undefined;
  }
  delimitNumber(value) {
    const stringValue = value.toString();
    const intValue = parseFloat(stringValue.split(`.`)[0]);
    const decValue = stringValue.split(`.`)[1];
    let digits;
    if (isNaN(intValue)) {
      digits = ``;
    } else {
      digits = intValue.toLocaleString(`en`, { maximumFractionDigits: 0 });
    }
    if (decValue != null) {
      return `${digits}.${decValue}`;
    } else {
      return `${digits}`;
    }
  }
  updateValue() {
    if (this.operator != null) {
      this.topValue.textContent = `${this.delimitNumber(this.previousValue)} ${
        this.operator
      }`;
    } else {
      this.topValue.textContent = ``;
    }
    this.bottomValue.textContent = this.delimitNumber(this.currentValue);
  }
}
const calculator = new Calculator(topValue, bottomValue);
numbers.forEach((num) => {
  num.addEventListener(`click`, () => {
    calculator.selectNumber(num.textContent);
    calculator.updateValue();
  });
});
operators.forEach((operator) => {
  operator.addEventListener(`click`, () => {
    calculator.selectOperator(operator.textContent);
    calculator.updateValue();
  });
});
equals.addEventListener(`click`, () => {
  calculator.compute();
  calculator.updateValue();
});
deleteButton.addEventListener(`click`, () => {
  calculator.delete();
  calculator.updateValue();
});
clear.addEventListener(`click`, () => {
  calculator.clear();
  calculator.updateValue();
});

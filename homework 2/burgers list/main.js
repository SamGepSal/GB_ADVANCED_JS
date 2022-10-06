"use strict"

window.onload = () =>{
    document.getElementById('check').addEventListener('click', event => {
        event.preventDefault();
        let burger = new Burger('sizeBurger', 'burgersFilling', 'burgersAddOptions');
        burger.getSum('.totalAmount', '.totalCalories');
    });
}


class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories']
    }
}

class Burger {
    constructor (sizeBurger, burgersFilling, burgersAddOptions) {
        this.sizeBurger = new Param (this._select(sizeBurger));
        this.burgersFilling = this._getOptions(burgersFilling);
        this.burgerAddOprions = this._getOptions(burgersAddOptions);
    }

    _select(name){
        return document.querySelector(`input[name=${name}]:checked`);
    }

    _selectAll(name){
        return [...document.querySelectorAll(`input[name=${name}]:checked`)];
    }

    _getOptions(name) {
        let result = [];
        this._selectAll(name).forEach(el => {
            let obj = new Param(el);
            result.push(obj);
        })
        return result;
    }  

    getSum(price, calories) {
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }

    _sumPrice(){
        let result = this.sizeBurger.price;
        this.burgersFilling.forEach(el => result += el.price);
        this.burgerAddOprions.forEach(el => result += el.price);
        return result;
    }

    _sumCalories(){
        let result = this.sizeBurger.calories;
        this.burgersFilling.forEach(el => result += el.calories);
        this.burgerAddOprions.forEach(el => result += el.calories);
        return result;
    }
}
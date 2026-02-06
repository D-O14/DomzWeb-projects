// DOM Manipulation //

//const title = document.querySelector('#main-heading');

//title.style.color = 'red'

/*const listitem = document.querySelectorAll('li');


for( i = 0; i < listitem.length; i++){

    listitem[i].style.fontSize = '2rem';
}

console.log(listitem);


const firstlistitem = document.querySelector('li')

console.log(firstlistitem.innerText)
console.log(firstlistitem.textContent)
console.log(firstlistitem.innerHTML)

li.setAttribute('id', 'main-heading');
li.removeAttribute('id');

const title = document.querySelector('#main-heading');

console.log(title.getAttribute('id'));




const ul = document.querySelector('ul');
const li = document.createElement('li'); 

ul.append(li)

li.innerText = 'X-men';

li.classList.add('list-item')

console.log(li.classList.contains('list-item'))

const html = document.documentElement;

console.log(html.parentNode);
console.log(html.parentElement)


//console.log(ul.parentNode.parentNode)
//console.log(ul.parentElement.parentElement)

console.log(ul.childNodes);

console.log(ul.firstChild);

console.log(ul.lastChild);


ul.childNodes[1].style.backgroundColor = 'blue';


let ul = document.querySelector('ul');
const div = document.querySelector('div');

console.log(div.childNodes)

console.log(ul.previousElementSibling);
console.log(ul.nextElementSibling);


const button = document.querySelector(".btn-2")

function alertBtn(){
    alert('You a bad man');
}

button.addEventListener("click", alertBtn)



const newBackgroundColor = document.querySelector('.box-3');

function ChangeBgColor(){
    newBackgroundColor.style.backgroundColor = 'black';
};

newBackgroundColor.addEventListener("mouseover", ChangeBgColor);

window.addEventListener("click", function(){
    console.log('window');
},false);

document.addEventListener("click", function(){
    console.log('Document');
},false);

document.querySelector(".c").addEventListener
("click", function(e) {
    //e.stopPropagation()
    console.log('c');
},{once:true});

document.querySelector(".b").addEventListener
("click", function(){
    console.log('b');
} ,false);

document.querySelector("button").addEventListener
("click", function(e){
    console.log(e.target.innerText = 'clicked');
}, false);

revealBtn.addEventListener('click', revealContent)

document.querySelector('#football').addEventListener
('click', function(e) {
    console.log('Football is clicked');

    const target = e.target;

    if(target.matches('li')){
        target.style.backgroundColor = 'lightgrey'
    }
})

document.querySelector('#basketball').addEventListener
('click', function(e) {
    console.log('Basketball is clicked');

    const target = e.target;

    if(target.matches('li')){
        target.style.backgroundColor = 'lightblue'
    }
})

document.querySelector('#boxing').addEventListener
('click', function(e) {
    console.log('Boxing is clicked');

    const target = e.target;

    if(target.matches('li')){
        target.style.backgroundColor = 'yellow'
    }
})

document.querySelector('#tennis').addEventListener
('click', function(e) {
    console.log('Tennis is clicked');

    const target = e.target;

    if(target.matches('li')){
        target.style.backgroundColor = 'coral'
    }
})

document.querySelector('#golf').addEventListener
('click', function(e) {
    console.log('Golf is clicked');

    const target = e.target;

    if(target.matches('li')){
        target.style.backgroundColor = 'pink'
    }
})

document.querySelector('#sports').addEventListener
('click', function(e){
    console.log(e.target.getAttribute('id') + ' is clicked');

    const target = e.target;
    if(target.matches('li')){
        target.style.backgroundColor = 'yellow'
    }
})

const body = document.getElementsByTagName("body")[0]
body.style.backgroundColor = "#334"
console.log(body)

const title = document.querySelector("#main-heading")
title.style.color = "rebeccapurple"

const list = document.getElementsByClassName(".list-item");
console.log(list);

const listItem = document.getElementsByTagName('li');
console.log(listItem)

const container = document.querySelector('div')
container.style.backgroundColor = "yellow"
container.style.color = "red"
console.log(container)

const lists = document.querySelectorAll('li')
console.log(lists)

const ul = document.querySelector('ul')
const li = document.createElement('li')

ul.append(li)
li.innerText = 'Superman'
li.classList.add('list-item')
ul.childNodes[1].style.backgroundColor = 'orange';

const firstListItem = document.querySelector(".list-item");

console.log(firstListItem.innerText);

li.setAttribute('id', 'main-heading')
li.removeAttribute('id')

console.log(ul.children);
console.log(ul.firstElementChild);
console.log(ul.lastElementChild);


const button = document.querySelector(".btn")

function alertBtn(){
    alert('Watch now for free');
}

button.addEventListener("click", alertBtn)

/*const body = document.getElementsByTagName("body")[0]
function setColor(name){
    body.style.backgroundColor = name;
}

function randomColor() {
    const beige = Math.round(Math.random() * 255)
    const black = Math.round(Math.random() * 255)
    const white = Math.round(Math.random() * 255)

    const color = `rgb(${beige}, ${black}, ${white})`
    body.style.backgroundColor = color;
}


let secondsElapsed = 0;
let interval = null;
const time = document.getElementById("time")

function padStart(value){
    return String(value).padStart(2, "0") 
}

function setTime() {
    const minutes = Math.floor(secondsElapsed / 60)
    const seconds = secondsElapsed % 60
    time.innerHTML = `${padStart(minutes)}:${padStart(seconds)}`;
}

function timer() {
    secondsElapsed++;
    setTime()
}

function startClock() {
    if (interval) stopClock()
    interval = setInterval(timer, 1000)
}

function stopClock() {
    clearInterval(interval)
}

function restartClock() {
    stopClock()
    secondsElapsed = 0
    setTime()
}





const accordion = document.getElementsByClassName("content-container");

for( i = 0; i < accordion.length; i++) {

    accordion[i].addEventListener('click', function (){
        this.classList.toggle('active');
    })

}


let openBtn = document.getElementById('open-btn');
let modalContainer = document.getElementById('modal-container');
let closeBtn = document.getElementById('close-btn')

openBtn.addEventListener("click", function() {
    modalContainer.style.display = 'block';    
})

closeBtn.addEventListener('click', function(){
    modalContainer.style.display = 'none'
})

window.addEventListener('click', function(e){
    if (e.target === modalContainer){
        modalContainer.style.display = 'none';
    }
})

    let btn = document.querySelector('#new-quote');
let quote = document.querySelector('.Quote');
let person = document.querySelector('.person')


const quotes = [{
    quote: '"I do the very best I know how - the very best i can and i mean to keep on doing so until the end."',
    person: 'Abraham lincoln'
}, {
    quote: '"If you want to live a happy life, tie it to a goal, not to people or things."',
    person: 'Albert Einstein'
}, {
    quote: '"The best way to find yourself is to lose yourself in the service of others."',
    person: 'Mahatma Gandhi'
}, {
    quote: '"At his best, man is the noblest of all animals; seperated from law and justice he is the worst."',
    person: 'Aristotle'
}, {
    quote: '"Your time is limited, so dont waste it living someone elses life."',
    person: 'Steve Jobs'
}, {
    quote: '"Tell me and I forget. Teach me and I remember. Involve me and I learn."',
    person: 'Benjamin Franklin'
},   {
    quote: '"If you look at what you have in life, you will always have more more. If you look at what you do not have in life, you will never have enough."',
    person: 'Oprah Winfrey'
},   {
    quote: '"It does not matter how slowly you go as long as you do not stop."',
    person: 'Confucius'
},  {
    quote: '"Our lives begin to end the day we become silent about things that matter."',
    person: 'Marthin Luther King, Jr'
},  {
    quote: '"Remember that not getting what you want is sometimes a wonderful stroke of luck."',
    person: 'Dalai Lama'
},  {
    quote: '"The journey of a thousand miles begins with one step."',
    person: 'Lao Tzu'
}, ];

btn.addEventListener('click', function(){

    let random = Math.floor(Math.random() * quotes.length);

    quote.innerText = quotes[random].quote;
    person.innerText = quotes[random].person;
})

const revealBtn = document.querySelector('.reveal-btn');

const hiddenContent = document.querySelector('.div');

function revealContent(){
    if(hiddenContent.classList.contains('reveal-btn')
     ) {
        hiddenContent.classList.remove('reveal-btn')
    } else {
        hiddenContent.classList.add('reveal-btn')
    }
}*/

// JavaScript Mastery //

/* operator precedence
1. parenthesis ()
2. exponents
3. multiplication & divison & multiplication
4. addition & subtraction
*/

//document.getElementById('myH2').textContent = `Enrolled: ${ student}`
//document.getElementById('myH3').textContent = `you are ${age} years old`

/*document.getElementById("mySubmit").onclick = function () {
    userName = document.getElementById("myText").value;
    document.getElementById("myh1").textContent = `Hello ${userName}`
    console.log(userName)
}*/

/*const pi = 3.14159;
let radius;
//radius = window.prompt(`Enter the radius of a circle`)
//radius = Number(radius)
let circumference;


let x = ''
x = Number(x)
let y = ''
y = String(y)
let z = ''
z = Boolean(z)
let age = 25
//let age = window.prompt(`how old are you?`);
//age = Number(age);
let price = 10.99;
let email = 'dominion123@gmail.com'
let online = true
let fullName = `Ogwai Dominion`
let student = false
let students = 30;
let userName;
userName = window.prompt(`what's your username?`)
let passWord;
passWord = window.prompt(`what's your password?`)
students = students * 16 - 160 + 40 ** 2
let extraStudents = students / 2
students += -47
students++


//console.log(Math.PI)
//console.log(Math.E)
//console.log(userName)
//console.log(passWord)
//console.log(circumference)
//console.log(age, typeof age)
//console.log(x, typeof x);
//console.log(y, typeof y);
//console.log(z, typeof z);
//console.log(extraStudents)
//console.log(typeof price)
//console.log(age)
//console.log(price)
//console.log(`sade is ${age} years old`)
//console.log(`That water bottle cost $${price}`)
//console.log(firstName)
//console.log(typeof email)
//console.log(`bro is online: ${online}`)
//console.log(typeof online)
//console.log(students)
//console.log(typeof firstName)

// Counter project @ 58m:33s/12:00:00 //

*/

// Understanding Math functions //

/*let v = -3.21
let g = 2
let l;
let max = Math.max(v, g, l);
let min = Math.min(v, g, l);

l = Math.round(v)
l = Math.floor(v)
l = Math.ceil(v)
l = Math.trunc(v)
l = Math.pow(v, g)
l = Math.sqrt(v)
l = Math.log(v)
l = Math.cos(v)
l = Math.tan(v)
l = Math.abs(v)
l = Math.sign(v)
*/

// IF statements //

//const myText = document.getElementById("myText");
//const mySubmit = document.getElementById("mySubmit");
//const result = document.getElementById("result")

//let years;

/*mySubmit.onclick = function(){

    years = myText.value;
    years = Number(years)
    if (years >= 100) {
        result.textContent = 'ho, how you still alive?!'
    }
    else if (years == 0) {
        result.textContent = "You can't enter yet, you've just been born"
    }
    else if (years >= 18) {
        result.textContent = 'You are old enough to use this site'
    }
    else if (years < 0) {
        result.textContent = 'Age cannot be below zero'
    }
    else {
        result.textContent = 'You must be 18 years and above to enter site'
    }
}*/

/*let time = 19;

if (time < 12){
    console.log("Good morning")
}
    else {
    console.log('Good afternoon')
}

let isStudent = false;

if (isStudent){
    console.log('You are a student')
}
else {
    console.log('you are not a student')
}*/

// Checked property //

/*const myCheckBox = document.getElementById("myCheckBox")
const visaBtn = document.getElementById("visaBtn")
const masterCardBtn = document.getElementById("masterCardBtn")
const payPalBtn = document.getElementById("payPalBtn")
const mySubmit = document.getElementById("mySubmit")
const subResult = document.getElementById("subResult")
const paymentResult = document.getElementById("paymentResult")

mySubmit.onclick = function(){
    
    if(myCheckBox.checked){
        subResult.textContent = `you are subscribed`;
    }
    else{
        subResult.textContent = `you are not subscribed`;
    }

    if (visaBtn.checked) {
        paymentResult.textContent = 'You are paying with visa'
    }
    else if (masterCardBtn.checked) {
        paymentResult.textContent = 'You are paying with mastercard'
    }
    else if (payPalBtn.checked) {
        paymentResult.textContent = 'You are paying with Paypal'
    }
    else {
        paymentResult.textContent = 'payment type not selected!'
    }
}*/

/* ternary operator 

let age = 25
let message = age >= 18 ? "You're an adult" : "You're a minor"
console.log(message)

let time = 16;
let greeting = time < 12 ? "Good morning" : "Good afternoon"
console.log(greeting)

let amount = 99;
let discount = amount >= 100 ? 10 : 0;
console.log(`Your total is $${amount - amount * (discount/100)}`)
*/

// switch //

const day = 1;

/*switch (day) {
     case 1:
        console.log("it is sunday")
        break
    case 2:
        console.log('it is monday')
        break
    case 3:
        console.log("it is tuesday")
        break
    case 4:
        console.log('it is wednesday')
        break
    case 5:
        console.log("it is thursday")
        break
    case 6:
        console.log('it is friday')
        break
    case 7:
        console.log("it is saturday ")
        break
    default:
        console.log(`${day} is not a day`)
}*/

/*let score = 97
let grade;

switch (true) {
    case score >= 95:
        grade = "A+";
        console.log("Simply awesome.")
        break
    case score >= 90:
        grade = "A";
        console.log("Great job, you got an A.")
        break
    case score >= 85:
        grade = "B";
        console.log("Pretty Good. Keep it up.")
        break
    case score >= 70:
        grade = "C";
        console.log("It's alright but you can do better.")
        break
    case score >= 65:
        grade = "D";
        console.log("Further practice is definitely needed.")
        break
    case score >= 50:
        grade = "E";
        console.log("Not the best you can do.")
        break
    case score >= 40:
        grade = "F";
        console.log("Failed.")
        break
    default:
        console.log('Class not attended. class failed.')
}*/

// String methods //

//let username = "@Deo";
//let outcome = username.startsWith("@")
//let output = username.endsWithWith(" ")
//let display = username.includes(" ")
//username = username.trim()
//username = username.toUpperCase()
//username = username.toLowerCase()
//username = username.repeat(3)
//username = username.replaceAll("@", "_")
//username = username.padStart(5, "~")
//username = username.padEnd(7, "0")

//console.log(username.charAt(0))
//console.log(username.indexOf("o"))
//console.log(username.lastIndexOf("e"))
//console.log(username.length)
//console.log(username)

/*if (outcome) {
    console.log('your username cannot have any symbols')
}
else {
    console.log(outcome)
}

// string slicing //

const fullName = "Ogwai Dominion"
let firstName = fullName.slice(0, 6)
let lastName = fullName.slice(6, 14)

console.log(firstName)
console.log(lastName)*/

// Method chaining //

//let user = window.prompt("Enter your username nigga")

//user = user.trim()
//let letter = user.charAt(0);
//letter = letter.toUpperCase()
//let extraChars = user.slice(1)
//extraChars = extraChars.toLowerCase()
//user = letter + extraChars

//user = user.trim().charAt(0).toUpperCase() + user.trim().slice(1).toLowerCase()
//console.log(user)

/* Logical operators 

1. AND = &&
2. OR = ||
3. NOT = !

*/

/*
    if (temp > 0 && temp <= 30) {
    console.log("The weather is good")
}


const sunny = true;

if (sunny) {
    console.log("it is sunny")
}
else {
    console.log("it is cloudy")
}

// operators //

const PI = 3.14;

if (PI !== "3.14"){
    console.log("That is not Pi");
}
else{
    console.log("That is Pi");    
}*/

// while loop

/*let nameOfUser = "";
let logged = false
let usee;
let pass

while (!logged) {
    usee = window.prompt("Enter your username")
    pass = window.prompt("Enter your password")

    if (usee === "myusername" && pass === "mypassword") {
        logged = true;
        console.log("you are logged in")
    }
    else {
        console.log("invalid credentials! please try again")
    }
}*/

/*while (nameOfUser === "" || nameOfUser === null) {
   nameOfUser = window.prompt("Enter your name")
}

console.log(`hello ${nameOfUser}`)*/

// for loops //

for (let i = 1; i <= 20; i++) {
	if (i == 13) {
	} else {
		//console.log(i)
	}
}

// number guessing game //

/*const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum

let attempts = 0;
let guess;
let running = true;

while (running) {

    guess = window.prompt(`Guess a number between ${minNum} & ${maxNum} `)
    guess = Number(guess);
    
    if (isNaN(guess)){
        window.alert("please guess a valid number"); 
    }
    else if(guess < minNum || guess > maxNum){
        window.alert("please enter a valid number");
    }
    else {
        attempts++
        if(guess < answer){
            window.alert("too low, try again")
        }
       else if (guess > answer){
            window.alert("too high, try again")
        }
        else {
            window.alert(`Correct, the answer was ${answer}. And it only took you ${attempts} attempts`),
            running = false
        }
    }
}

// weather conversion app //

const textBox = document.getElementById("textBox");
const toFahrenheit = document.getElementById("toFahrenheit")
const toCelsius = document.getElementById("toCelsius")
const result = document.getElementById("result")
let temp;

function convert() {

    if (toFahrenheit.checked) {
        temp = Number(textBox.value);
        temp = temp * 9 / 5 + 32;
        result.textContent = temp + "F"
    }
    else if (toCelsius.checked) {
        temp = Number(textBox.value);
        temp = (temp - 32) * (5/9);
        result.textContent = temp + "C"
    }
    else {
        result.textContent = "select a unit"
    }
    
}*/

// arrays //

const fruits = ["apple", "orange", "banana"];
const numOfFruits = fruits.length;

///fruits.push("")
//fruits.pop()
//fruits.unshift()
//fruits.shift
//fruits.join
fruits[3] = "coconut";

//console.log(numOfFruits)
//console.log(fruits)
//console.log(fruits[3])
//console.log(fruits[0])
//console.log(fruits[1])
//console.log(fruits[2])

// spread operator //

const numbers = [1, 2, 3, 4, 5];
const maxnum = Math.max(...numbers);
const minnum = Math.min(...numbers);

//console.log(numbers)

// rest parameters //

/*function openFridge(...foods) {
    console.log(foods)
}

function sum(...numbers) {
    
    let result = 0;
    for (let number of numbers) {
        result += number
    }
    return result;
}

function getAverage(...numbers) {

    let result = 0;
    for (let number of numbers) {
        result += number
    }
    return result / numbers.length;
}

//const total = sum(1, 2, 3, 4, 5);

const total = getAverage(75, 100, 85, 90, 50);

console.log(total)
//console.log(`your total is $${total}`)

const food1 = "pizza"
const food2 = "hamburger"

const food3 = "hotdog"
const food4 = "sushi"
const food5 = "ramen"

openFridge(food1, food2, food3, food4, food5) */

/* Dice roller  3:44:59 



*/

// Random Password Generator //

function generatePassword(
	length,
	includeLowercase,
	includeUppercase,
	includeNumbers,
	includeSymbols,
) {
	const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
	const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numberChars = "0123456789";
	const symbolChars = "!@#$%^&*()_-+";

	let allowedChars = "";
	let password = "";

	allowedChars += includeLowercase ? lowercaseChars : "";
	allowedChars += includeUppercase ? upperCaseChars : "";
	allowedChars += includeNumbers ? numberChars : "";
	allowedChars += includeSymbols ? symbolChars : "";

	//console.log(allowedChars)

	if (length <= 0) {
		return `(password lenght must be at least 1)`;
	}

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * allowedChars.length);
		password += allowedChars[randomIndex];
	}

	return password;
}

const passwordLength = 12;
const includeLowercase = true;
const includeUppercase = true;
const includeNumbers = true;
const includeSymbols = true;

const password = generatePassword(
	passwordLength,
	includeLowercase,
	includeUppercase,
	includeNumbers,
	includeSymbols,
);

// console.log(`Generated Password: ${password}`)

// Callback function //

/*function hello(callback) {
   // console.log("hello")
    callback()
}*/

function leave() {
	// console.log("Cynthia ofori go home")
}

function goodbye() {
	// console.log("goodbye")
}

//hello(leave)

// foreach() //

const num = [1, 2, 3, 4, 5];

num.forEach(display);

function display(element) {
	//console.log(element)
}

// .filter() //

const figure = [1, 2, 3, 4, 5, 6, 7];
const evenNums = figure.filter(isEven);
const oddNums = figure.filter(isOdd);

//console.log(evenNums)
//console.log(oddNums)

function isEven(element) {
	return element % 2 === 0;
}

function isOdd(element) {
	return element % 2 !== 0;
}

// function expression //

//function hello(){}

setTimeout(() => {
	//  console.log("ello gov'nor")
}, 3000);

// arrow functions //

const hello = (name, age) => {
	//console.log(`Hello ${name}`);
	//console.log("Happy birthday")
	//console.log(`you are ${age} years old today!! 🥳`)
};

hello("Bro", 16);

// objects, this, constructor //

const person = {
	firstName: "Spongebob",
	lastName: "Squarepants",
	age: 30,
	isEmployed: true,
	//sayHello: function () { console.log(`Hi I'm ${this.firstName}`) }
};

//console.log(person.firstName)
//console.log(person.lastName)
//console.log(person.age)
//console.log(person.isEmployed)
//person.sayHello()
//console.log(this)

function Car(make, model, year, color) {
	(this.make = make),
		(this.model = model),
		(this.year = year),
		(this.color = color);
}

const car = new Car("Ford", "Mustang", 2024, "red");

//console.log(car.make)
//console.log(car.model)
//console.log(car.year)
//console.log(car.color)

// class //

class Product {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}

	displayProduct() {
		console.log(`Product: ${this.name}`);
		console.log(`Price: $${this.price.toFixed(2)}`);
	}
}

const product1 = new Product("Shirt", 19.99);
const product2 = new Product("trousers", 12.37);

//product1.displayProduct()
//product2.displayProduct()
//product3.displayProduct()

// static //

/*class Mathutil{
    static pi = 3.14159
}*/

//console.log(Mathutil.pi)

class User {
	static userCount = 0;

	constructor(username) {
		this.username = username;
		User.userCount++;
	}
}

const user1 = new User("Spongebob");
const user2 = new User("Patrick");
const user3 = new User("Sandy");
const user4 = new User("Squidward");

//console.log(user1.username)
//console.log(user2.username)
//console.log(user3.username)
//console.log(user4.username)
//console.log(User.userCount)

// inheritance //

class Animal {
	alive = true;

	eat() {
		console.log(`This ${this.name} is eating`);
	}
	sleep() {
		console.log(`This ${this.name} is sleeping`);
	}
}

class Rabbit extends Animal {
	name = "Rabbit";
}

class Fish extends Animal {
	name = "Fish";
}

class Hawk extends Animal {
	name = "Hawk";
}

const rabbit = new Rabbit();
const fish = new Fish();
const hawk = new Hawk();

//rabbit.eat()

//console.log(rabbit.alive)

// getter - makes items readable &  setter - makes items writeable //

class rect {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	set width(newWidth) {
		if (newWidth > 0) {
			this._width = newWidth;
		} else {
			console.error("Width must be a positive number");
		}
	}

	set height(newHeight) {
		if (newHeight > 0) {
			this._height = newHeight;
		} else {
			console.error("Height must be a positive number");
		}
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}
}

const rectangle = new rect(34, 17);

rectangle.width = 6;
rectangle.height = 7;

//console.log(rectangle.width)
//console.log(rectangle.height)
const product3 = new Product("Underwear", 112.3);

// DESTRUCTURING //

let a = 1;
let b = 2;

[a, b] = [b, a];

//console.log(a);
//console.log(b);

const colors = ["red", "green", "blue", "black", "white"];

[colors[0], colors[4]] = [colors[4], colors[0]];

//console.log(colors)

const [firstColor, secondColor, thirdColor, ...extraColors] = colors;

//console.log(firstColor);
//console.log(secondColor);
//console.log(thirdColor)
//console.log(extraColors)

// objects //

function displayPerson({ name, surName, age, occupation }) {
	console.log(`name:${name} ${surName}`);
	console.log(`age:${age}`);
	console.log(`occupation:${occupation}`);
}

const person1 = {
	name: "spongebob",
	surName: "squarepants",
	age: 27,
	occupation: "fry cook",
};

const person2 = {
	name: " Patrick",
	surName: "star",
	age: 36,
	occupation: "unemployed",
};

//displayPerson(person1)
//displayPerson(person2)

/*const { name, surName, age, occupation } = person1

console.log(name)
console.log(surName)
console.log(age)
console.log(occupation)


const { name, surName, age, occupation } = person2

console.log(name)
console.log(surName)
console.log(age)
console.log(occupation)*/

// nested objects //

const body = {
	fullName: "Spongebob Squarepants",
	age: 30,
	isStudent: true,
	hobbies: ["Karate", "Jellyfishing", "Cooking"],
	address: {
		street: "124 Conch St",
		city: "Bikini Bottom",
		country: "Int. Waters",
	},
};

//console.log(body.fullName)
//console.log(body.age)
//console.log(body.isStudent)
//console.log(body.hobbies[2])
//console.log(body.address.city)

// date objects //

const date = new Date();

//date.setFullYear(2024)
//date.setMonth(0)
//date.setDate(1)
//date.setHours(2)
//date.setMinutes(3)
//date.setSeconds(4)

const year = date.getFullYear();
const month = date.getMonth();
const weekDate = date.getDate();
const weekDay = date.getDay();
const hr = date.getHours();
const min = date.getMinutes();
const sec = date.getSeconds();
const ms = date.getMilliseconds();

//console.log(date);
//console.log(year);
//console.log(month);
//console.log(weekDay);
//console.log(weekDate);
//console.log(hr);
//console.log(min);
//console.log(sec);
//console.log(ms);

const date1 = new Date("2025-12-31");
const date2 = new Date("2026-01-01");

if (date2 > date1) {
	//console.log("Happy new year")
}

function outer() {
	const message = "Hello";

	function inner() {
		console.log(message);
	}

	//inner()
}

outer();

function createCounter() {
	let count = 0;

	function increase() {
		count++;
		console.log(`Count increased to ${count}`);
	}

	return { increase };
}

const counter = createCounter();

//counter.increase();
//counter.increase();
//counter.increase();

function Creategame() {
	let score = 0;

	function increaseScore(points) {
		score += points;
		console.log(`+${points}pts`);
	}

	function decreaseScore(points) {
		score -= points;
		console.log(`-${points}pts`);
	}

	function getScore() {
		return score;
	}

	return { increaseScore, decreaseScore, getScore };
}

const game = Creategame();

//game.increaseScore(65)
//game.increaseScore(42)
//game.decreaseScore(59)
//console.log(`The final score is ${game.getScore()}`)

// setTimeout //

let timeoutId;

function start() {
	timeoutId = setTimeout(() => window.alert("hello"), 3000);
	//console.log("started");
}

function clear() {
	clearTimer(timeoutId);
	// console.log("cleared");
}

// Digital clock //

/*function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;
    document.getElementById("clock").textContent = timeString
}

updateClock()
setInterval(updateClock, 1000);*/

/* ES6 Module 

export const pi = 2.345;

export function getCircumference(radius) {
    return 2 * pi * radius;
}

export function getArea(radius) {
    return pi * radius * radius;
}

export function getVolume(radius) {
    return 4 * pi * radius * radius;
}*/

// synchronous & asynchronous //

function func1(callback) {
	setTimeout(() => {
		console.log("Task 1");
		callback();
	}, 3000);
}

function func2() {
	//    console.log("Task 2");
	//    console.log("Task 3");
	//    console.log("Task 4");
}

//func1(func2);

// Errors //

try {
	//console.log("hello")
} catch (error) {
	//console.error(error);
} finally {
	//  console.log("this always executes")
}

//const dividend = window.prompt("enter a dividend:");
//const divisor = window.prompt("enter a divisor:");

//const result = dividend / divisor;
//console.log(result)
//window.alert(result)

/* Calculator 




*/

// key events //

const myBox = document.getElementById("myBox");
const moveAmount = 10;
let x = 0;
let y = 0;

document.addEventListener("keydown", (event) => {
	if (event.key.startsWith("Arrow")) {
		event.preventDefault();

		switch (event.key) {
			case "ArrowUp":
				y -= moveAmount;
				break;
			case "ArrowDown":
				y += moveAmount;
				break;
			case "ArrowLeft":
				x -= moveAmount;
				break;
			case "ArrowRight":
				x += moveAmount;
				break;
		}

		myBox.style.top = `${y}px`;
		myBox.style.left = `${x}px`;
	}
});

/*document.addEventListener("keydown", event => {
    myBox.textContent = "😞"
    myBox.style.background = "tomato"

});

document.addEventListener("keyup", event => {
    myBox.textContent = "🥳"
    myBox.style.background = "lightblue"
});*/

/* hide & display content 

const mybutton = document.getElementById("myBtn")
const myimage = document.getElementById("myImg") 

mybutton.addEventListener("click", event => {

    if (myimage.style.display === "none") {
        myimage.style.display = "block";
        mybutton.textContent = "Hide";
    }
    else {
        myimage.style.display = "none";
        mybutton.textContent = "Show";
    }
});*/

// classList //
//.replace()
//.add()
//.remove()
//.toggle()
//.contains()

// image slider //

/*const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

//initializeSlider()
document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0 ) {
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 3000);   
    }
}

function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0
    }
    else if (index < 0) {
        slideIndex = slides.length - 1
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide")
}

function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex)
}

const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const increaseBtn = document.getElementById('increaseBtn');
const countLabel = document.getElementById("countLabel");

let count = 0;

increaseBtn.onclick = function () {
    count++;
    countLabel.textContent = count
}

decreaseBtn.onclick = function () {
    count--;
    countLabel.textContent = count
}

resetBtn.onclick = function () {
    countLabel.textContent = count
}*/

/*const modalReveal = document.getElementById("sendGift");
const modal = document.getElementById("GiftBox");
const exitModal = document.getElementById("close");
const notiBar = document.getElementById("noti")
const message = document.getElementById("Msg")
const notiClose = document.getElementById("notiCloseMsg")
const IgnMsg = document.getElementById("IgnMsg")
const AnsMsg = document.getElementById("AnsMsg")

modalReveal.addEventListener("click", function () {
    modal.style.display = "block"
})

IgnMsg.onclick = function () {
    notiBar.style.display = "none"
    notiClose.style.display = "none"
    console.log("Hey Bartholomew, your friend Terrence ignored your birthday message, he's such a jerk.")
}

AnsMsg.onclick = function () {
    console.log("Wow what a good friend you are")
    notiClose.style.display = "none"
}

exitModal.onclick = function () {
    notiClose.style.display = "block"
}

function setTimeout2() {
    let Msg = window.prompt("Would you like to send a message?")
    console.log("Hey Bartholomew, Terrence sent you a Happy birthday 🎊")
    console.log(`Message from Terrence: ${Msg}`)
}

const OpayBtn = document.getElementById("OpayBtn")
const KudakCardBtn = document.getElementById("KudakCardBtn")
const payPalBtn = document.getElementById("payPalBtn")
const mySubmit = document.getElementById("mySubmit")
const subResult = document.getElementById("subResult")
const paymentResult = document.getElementById("paymentResult")

const OpayInfo = {
    OwnerOfAcct: "Terrence Hardy",
    AcctNo: "10294816",
    Active: true,
    Bank: "Opay",
    Amount: "$1.00"
}

const KudakInfo = {
    OwnerOfAcct: "Terrence Hardy",
    AcctNo: "20212197",
    Active: true,
    Bank: "Kudak",
    Amount: "$137.200"
}

const payPalInfo = {
    OwnerOfAcct: "Terrence Hardy",
    AcctNo: "00194812",
    Active: false,
    Bank: "PayPal",
    Amount: "$26.42"
}

let acct;

mySubmit.onclick = function () {
    if (OpayBtn.checked) {
        //console.log(OpayInfo)
        //acct = window.alert(OpayInfo)
        console.log("Sorry lil nigga, you broke")
        window.alert("Couldnt find any money")
    }

    if (KudakCardBtn.checked) {
        //console.log(KudakInfo)
        //acct = window.alert(KudakInfo)
        //console.log("Ohh so you rich rich, aight, pick out your gift amount")
        let KudakMsg = window.prompt("Select Amount of money to send")
        console.log(`Your friend Terrence sent you a gift of $${KudakMsg}`)
    }

    if (payPalBtn.checked) {
        //console.log(payPalInfo)
        //acct = window.alert(payPalInfo)
        console.log("Account is dormant, sorry")
        window.alert("Account can't be used")
    }

}*/

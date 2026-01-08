/*import { gsap } from "gsap"
gsap.to(".box", {
    x: 200,
    duration: 2,
    rotation: 360,
    ease: 'power1.out'
});

gsap.to(".box", {
    x: 200,
    duration: 2,
    rotation: 360,
    ease: 'power1.out'
});

/*const incbtn = document.getElementById("incBtn");
const decbtn = document.getElementById("decBtn");
const label = document.getElementById("countLabel");
const resetBtn = document.getElementById("resetBtn");


incbtn.style.width = '105px'
incbtn.style.height = '40px'
incbtn.style.background = 'aqua'
incbtn.style.borderRadius = '5px'
incbtn.style.border = 'none'
incbtn.style.boxShadow = '1px 2px 3px'
incbtn.style.margin = '10px'

decbtn.style.width = '105px'
decbtn.style.height = '40px'
decbtn.style.background = 'cornflowerblue'
decbtn.style.borderRadius = '5px'
decbtn.style.border = 'none'
decbtn.style.boxShadow = '1px 2px 3px'
decbtn.style.margin = '10px'

resetBtn.style.width = '105px'
resetBtn.style.height = '30px'
resetBtn.style.background = 'yellow'
resetBtn.style.borderRadius = '5px'
resetBtn.style.border = 'none'
resetBtn.style.boxShadow = '1px 2px 3px'
resetBtn.style.margin = '10px'

let count = 0;

incbtn.onclick = function () {
    count++;
    label.textContent = count;
}

decbtn.addEventListener("click", function () {
    count--;
    label.textContent = count;
})

resetBtn.onclick = function () {
    let count = 0;
    label.textContent = count;
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
        acct = window.alert(OpayInfo.OwnerOfAcct)
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
/*
is_running = true
while (is_running) {

    user1 = window.prompt("What's your name?")
    while (user1 == '') {
        window.alert("This is a requirement!")
        window.prompt("What's your name?")
    }
    if(user1) {
        console.log(`Hello ${user1}`)    
    }
    
    Age = window.prompt("How old are you?")
    if (Age < 18) {
        window.alert("Too young to use this application!")
        is_running = false
        break
    }
    else if (Age >= 18) {
        console.log(`You are ${Age} years old`)    
    }

    Job = window.prompt("Do you have a job? (Y/N)")
    if (Job == 'Y') {
        //let occupation;
        //window.prompt("What is your occupation?")
        //occupation = Job.value = window.alert(`${occupation} is a cool job`)
        window.alert("That's cool")
    }
    else if (Job == 'N') {
        console.log("Haha, what a bum")
    }
    else {
        console.log("Invalid input")
    }   

    Email = window.prompt("Please put in an E-mail")
    if (Email.includes('@', 'gmail.com')) {
        console.log(`${Email} is a verified E-mail`)
    }
    else {
        console.log("Invalid E-mail!!".toUpperCase())
    }
    break
}
console.log()

console.log(`Your name is ${user1}`)
console.log(`You are ${Age} years old`)
console.log("You have a Job")
console.log(`your E-mail is ${Email}`)
console.log("You are now a member of the Java workspace")
*/

var cl = cloudinary.Cloudinary.new({ cloud_name: 'YOUR_CLOUD_NAME', secure: true });

// Generate a URL dynamically
var url = cl.url('sample.jpg', { width: 300, height: 200, crop: 'fill' });
document.getElementById('myImage').src = url;

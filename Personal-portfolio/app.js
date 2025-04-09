//  this is for the tab effects that give it that color feel
// basically an animation :)
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}



// previews of the side menu
var sidemeu = document.getElementById("sidemenu");

function openmenu() {
    sidemeu.style.right = "0";
}
function closemenu() {
    sidemeu.style.right = "-200px";
}



// script that will whoever sends a message all responsses will be recorded in a google sheets 
// until further update
// will research more on how to do it through email
const scriptURL = '< https://script.google.com/macros/s/AKfycbywBh4Fq2CLgNw7hN1gYGWjWw6Un8IjjHxNiyiAQt756nBHXKAwXj4ndMnCKSIGtlou_g/exec >' // add your own app script link here
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(function () {
                msg.innerHTML = ""
            }, 5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})

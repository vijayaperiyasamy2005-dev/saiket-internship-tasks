

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {


event.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message").value.trim();



if (name === "") {
    alert("Please enter your name.");
    return;
}



if (email === "") {
    alert("Please enter your email.");
    return;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
}



if (message === "") {
    alert("Please enter your message.");
    return;
}



alert("Message submitted successfully! 🎉");



form.reset();


});

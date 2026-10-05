

const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        alert("Product added to cart!");

    });

});




const offerButton =
    document.getElementById("offerButton");

offerButton.addEventListener("click", function() {

    alert("Coupon VIJAYA20 applied!");

});




const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (name === "") {

        alert("Please enter your name.");
        return;

    }


    if (email === "") {

        alert("Please enter your email.");
        return;

    }


    if (!email.includes("@")) {

        alert("Please enter a valid email.");
        return;

    }


    if (message === "") {

        alert("Please enter your message.");
        return;

    }


    alert("Message submitted successfully!");

    contactForm.reset();

});
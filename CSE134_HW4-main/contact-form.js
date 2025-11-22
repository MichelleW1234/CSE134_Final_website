document.documentElement.classList.add("js-enabled");

// For contact form: 

class form_error {

    constructor(inputID, invalidInput, message){

        this.inputID = inputID;
        this.invalidInput = invalidInput;
        this.message = message;

    }

}

document.addEventListener("DOMContentLoaded", function () {

    let form_errors = [];

    const form = document.getElementById("contact_form");
    const hiddenInput = document.getElementById("form_errors");

    const firstNameInput = document.getElementById("first_name");
    const lastNameInput = document.getElementById("last_name");
    const emailInput = document.getElementById("email_address");
    const phoneInput = document.getElementById("phone_number");

    const commentInput = document.getElementById("comments");
    const charCount = document.getElementById("comments-info");

    // Submit
    form.addEventListener("submit", function (event) {

        hiddenInput.value = JSON.stringify(form_errors);

    });


    function addError(inputID, invalidInput, message) {

        let newError = new form_error(inputID, invalidInput, message);
        form_errors.push(newError);

    }


    function showError(input, message) {

        const errorOutput = document.getElementById(input.id + "-error");
        errorOutput.textContent = message;
        errorOutput.classList.remove("hidden");
        input.classList.add("flash");

        setTimeout(() => {

            errorOutput.classList.add("hidden");
            input.classList.remove("flash");

        }, 2000);

    }

    const allowedNameChars = /^[A-Za-z]+$/;

    function enforceNameCharacterRules(event) {
        if (!allowedNameChars.test(event.target.value)){

            showError(event.target, "Invalid character entered.");
            event.target.value = event.target.value.replace(/[^A-Za-z]/g, "");

        }
    }

    firstNameInput.addEventListener("input", enforceNameCharacterRules);

    firstNameInput.addEventListener("invalid", (e) => {

        addError(e.target.id, e.target.value, "Invalid name entered.");

        showError(firstNameInput, "Please enter your first name.");

    });

    lastNameInput.addEventListener("input", enforceNameCharacterRules);

    lastNameInput.addEventListener("invalid", (e) => {

        addError(e.target.id, e.target.value, "Invalid name entered.");

        showError(lastNameInput, "Please enter your last name.");

    });


    emailInput.addEventListener("invalid", (e) => {

        addError(e.target.id, e.target.value, "Email pattern not matched.");

        showError(emailInput, "Please enter a valid email.");

    });
    

    const allowedPhoneChars = /^[0-9-]+$/;

    function enforcePhoneCharacterRules(event) {
        if (!allowedPhoneChars.test(event.target.value)){

            showError(event.target, "Invalid character entered.");
            event.target.value = event.target.value.replace(/[^0-9-]/g, "");

        }
    }

    phoneInput.addEventListener("input", enforcePhoneCharacterRules);

    phoneInput.addEventListener("invalid", (e) => {

        addError(e.target.id, e.target.value, "Phone pattern not matched.");

        showError(phoneInput, "Please enter a valid number.");

    });

    function informCommentCharLength(event) {
        const charactersRemaining = 500 - event.target.value.length;
        charCount.textContent = `The maximum length is 500 characters. ${charactersRemaining} characters remaining.`;
        
        if (charactersRemaining <= 50){
            charCount.style.color = "red";
        } else if (charactersRemaining <= 100){
            charCount.style.color = "orange";
        } else {
            charCount.style.color = "rgb(223, 206, 255)";
        }

    }

    commentInput.addEventListener("input", informCommentCharLength);

    commentInput.addEventListener("invalid", (e) => {

        addError(e.target.id, e.target.value, "Comment not entered.");

        showError(commentInput, "Please enter a comment.");

    });

});



// For switch: 

function setTheme(theme){

    const root = document.documentElement;

    if (theme === "dark"){

        root.style.setProperty("background-color", "var(--bg-color-dark)");
        root.style.setProperty("font-family", "var(--text-font-dark)");

    } else {

        root.style.setProperty("background-color", "var(--bg-color-light)");
        root.style.setProperty("font-family", "var(--text-font-light)");

    }

}

function toggleTheme(){

    const currTheme = localStorage.getItem("theme") || "light";

    const newTheme = currTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);

}

function setSavedTheme(){

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme){ 

        setTheme(savedTheme);
        document.getElementById("themeToggle").checked = (savedTheme === "dark");

    }

}

document.addEventListener("DOMContentLoaded", setSavedTheme);
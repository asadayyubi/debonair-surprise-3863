const form = document.querySelector("form");
const fnameInp = document.getElementById("fname");
const lnameInp = document.getElementById("lname");
const emailInp = document.getElementById("email");
const passInp = document.getElementById("password");

let allUserData = JSON.parse(localStorage.getItem("users")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    fname: fnameInp.value,
    lname: lnameInp.value,
    email: emailInp.value,
    password: passInp.value,
  };
  allUserData.push(formData);
  localStorage.setItem("users", JSON.stringify(allUserData));
  window.location.href =
    "file:///C:/Users/asadayyubi/Desktop/debonair-surprise-3863/signin.html";
});

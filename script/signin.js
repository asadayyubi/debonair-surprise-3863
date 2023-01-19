const form = document.querySelector("form");
const userInp = document.getElementById("user");
const userPass = document.getElementById("password");
const container = document.querySelector(".container");
const userData = JSON.parse(localStorage.getItem("users"));
console.log("connected");
let flag = JSON.parse(localStorage.getItem("userstatus")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userData.forEach((obj) => {
    if (obj.email === userInp.value && obj.password === userPass.value) {
      const flagUser = {
        status: true,
        email: userInp.value,
      };
      flag = [];
      flag.push(flagUser);
      localStorage.setItem("userstatus", JSON.stringify(flag));
      window.location.href =
        "file:///C:/Users/asadayyubi/Desktop/debonair-surprise-3863/index.html";
    } else {
      container.innerHTML = "";
      const errMsg = document.createElement("h1");
      errMsg.innerText = "Wrong credential!";
      errMsg.classList.add("errh1");
      const p = document.createElement("p");
      p.innerText = "Please Signup First";
      p.classList.add("p");
      const div = document.createElement("div");
      div.style.marginLeft = "76px";
      const btn = document.createElement("button");
      btn.innerText = "SignUp";
      btn.addEventListener("click", () => {
        window.location.href =
          "file:///C:/Users/asadayyubi/Desktop/debonair-surprise-3863/signup.html";
      });
      btn.classList.add("btn");
      div.append(btn);
      container.append(errMsg, p, div);
    }
  });
});

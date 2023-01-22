let cartProducts = JSON.parse(localStorage.getItem("buy")) || [];
let allUserData = JSON.parse(localStorage.getItem("users")) || [];
let flag = JSON.parse(localStorage.getItem("userstatus")) || [];
console.log(cartProducts);
let total = document.querySelector(".sub-total");
let total1 = document.querySelector(".sub-total1");
const flagUser = {
  status: true,
  email: userInp.value,
};
flag.push(flagUser);
localStorage.setItem("userstatus", JSON.stringify(flag));

let Container = document.querySelector(".cart-div");
window.addEventListener("load", () => {
  verifyUser();
});
function DisplayProduct(data) {
  let count = document.querySelector(".count");
  Container.innerHTML = "";
  count.textContent = cartProducts.length;
  cartProducts.forEach((product) => {
    let card = document.createElement("div");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    let image = document.createElement("img");
    div1.append(image);
    let title = document.createElement("h3");
    title.style.color = "rgb(104 103 103)";
    let category = document.createElement("p");
    category.style.color = "rgb(104 103 103)";
    let rating = document.createElement("p");
    rating.style.color = "rgb(104 103 103)";
    let quantity = document.createElement("span");
    let price = document.createElement("h4");
    price.style.color = "rgb(104 103 103)";
    let Remove = document.createElement("button");
    let Increment = document.createElement("button");
    let Decrement = document.createElement("button");
    div2.append(
      title,
      price,
      rating,
      category,
      Increment,
      quantity,
      Decrement,
      Remove
    );
    let hr = document.createElement("hr");
    quantity.textContent = product.quantity;
    Remove.textContent = "Remove";
    Increment.textContent = "+";
    Decrement.textContent = "-";
    image.src = product.image;
    title.textContent = product.title;
    category.textContent = `Category- ${product.category}`;
    price.textContent = `Price- ₹${product.price}`;
    rating.textContent = `Rating-${product.rating.rate}`;
    Remove.addEventListener("click", () => {
      cartProducts = cartProducts.filter((ele) => {
        return ele.id !== product.id;
      });
      localStorage.setItem("buy", JSON.stringify(cartProducts));
      DisplayProduct();
    });
    Increment.addEventListener("click", () => {
      product = product.quantity++;
      localStorage.setItem("buy", JSON.stringify(cartProducts));
      DisplayProduct();
    });
    Decrement.addEventListener("click", () => {
      if (product.quantity > 1) {
        product = product.quantity--;
        localStorage.setItem("buy", JSON.stringify(cartProducts));
        DisplayProduct();
      }
    });
    card.append(div1, div2);
    Container.append(hr, card);
  });

  let sum = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    sum += cartProducts[i].price * cartProducts[i].quantity;
  }
  total.textContent = Math.floor(sum);
  total1.textContent = Math.floor(sum);
}
DisplayProduct();

const cuponCode = document.querySelector("#code");
const cuponBtn = document.querySelector("#apply-code");
console.log(cuponBtn);
const applied = document.querySelector(".applied");
let flag1 = true;
cuponBtn.addEventListener("click", () => {
  console.log(cuponCode.value);
  if (cuponCode.value === "Masai30" && flag1) {
    let withOutDiscount = +total.textContent;
    let afterDiscount = Math.floor(
      withOutDiscount - (withOutDiscount * 30) / 100
    );
    total.textContent = afterDiscount;
    total1.textContent = afterDiscount;
    applied.innerHTML = "";
    const div = document.createElement("div");
    div.setAttribute("class", "applied1");
    const h4 = document.createElement("h4");
    h4.innerText = "Masai30";
    const h41 = document.createElement("h4");
    h41.innerText = "Applied🤑";
    div.append(h4, h41);
    applied.append(div);
    console.log(afterDiscount);
    flag1 = false;
  }
});

// function modal() {

// }
console.log("insise check");
const modal = document.querySelector(".modal");

const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
const modal1 = document.querySelector(".modal-content");
const alertMsg = document.getElementById("alert");
modal1.style.backgroundColor = "white";
//alertMsg.innerText = 'inside modal'

const checkoutOrder = document.querySelector(".checkout > button");

checkoutOrder.addEventListener("click", () => {
  if (flag[0].status) {
    toggleModal();
    const gif = document.querySelector(".gif");

    const html = `<div style="width:100%;height:130px; margin-left:120px"><iframe src="https://giphy.com/embed/Is6hiXAQkDod3NXs72" width="100px" height="100px"  frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><div style="text-align: center;">
    <h1 style='color:#228B22'>Order Confirmed</h1>
    <h2 style='color:#333'>Thank You</h2>
    <h4 style='color:#333'>for choosing our service!</h4>
    <h4 style='color:#333'>We appreciate the opportunity</h4>
    <h4 style='color:#333'>to serve you.</h4>
  </div>`;

    gif.insertAdjacentHTML("afterend", html);

    localStorage.removeItem("buy");
    setTimeout(() => {
      location.reload();
    }, 3000);
  } else {
    alert("Please Signin First");
    window.location.href = "signin.html";
  }
});

window.onscroll = function () {
  myFunction();
};

var navbar = document.querySelector(".navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// verifiy user
function verifyUser() {
  if (allUserData.length && flag.length) {
    console.log(flag[0].status);
    if (flag[0].status) {
      const h3 = document.getElementById("check");
      const logoutDiv = document.querySelector(".logout");
      h3.addEventListener("mouseover", () => {
        logoutDiv.style.display = "block";
        const out = document.getElementById("out");
        out.addEventListener("click", () => {
          flag[0].status = false;
          window.location.href = "signin.html";
        });
      });
      allUserData.forEach((obj) => {
        if (obj.email === flag[0].email) {
          h3.innerText = `${obj.fname}${obj.lname}`;
        }
      });
    }
  }
}

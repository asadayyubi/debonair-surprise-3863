const url = "https://fakestoreapi.com/products";
const productContainer = document.getElementById("product");
const searchInp = document.querySelector(".search > input");
const searchBtn = document.querySelector(".search > button");
const sortInp = document.querySelector(".sort3");
const cartCount = document.querySelector(".count");

let allProductData = JSON.parse(localStorage.getItem("products")) || [];
let allUserData = JSON.parse(localStorage.getItem("users")) || [];
let searchData = JSON.parse(localStorage.getItem("search-data")) || [];
let flag = JSON.parse(localStorage.getItem("userstatus")) || [];
const cartData = JSON.parse(localStorage.getItem("buy")) || [];

window.addEventListener("load", () => {
  fetchData(url);
  verifyUser();
  setTimeout(() => {
    searchType()
  },1000)
});
function verifyUser() {
  if (allUserData.length && flag.length) {
    console.log(flag[0].status);
    if (flag[0].status) {
      const h3 = document.getElementById("check");
      allUserData.forEach((obj) => {
        if (obj.email === flag[0].email) {
          h3.innerText = `${obj.fname}${obj.lname}`;
        }
      });
    }
  }
}

async function fetchData(url) {
  try {
    const request = await fetch(url);
    const data = await request.json();
    console.log(data);
    allProductData = data;
    localStorage.setItem("products", JSON.stringify(allProductData));
    //searchFunc();
  } catch (error) {
    console.log(error);
  }
}

function displayProduct(data) {
  productContainer.innerHTML = "";
  cartCount.innerText = cartData.length;
  data.forEach((ele) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", ele.image);
    const content = document.createElement("div");
    const title = document.createElement("p");
    title.innerText = ele.title;
    const price = document.createElement("h3");
    price.innerText = "Price-" + ele.price;
    const rating = document.createElement("h4");
    rating.innerText = `Rating-${ele.rating.rate}`;
    const category = document.createElement("p");
    category.innerText = `Category-${ele.category}`;
    content.append(title, price, rating, category);
    const cartBtn = document.createElement("button");
    cartBtn.innerText = "Add to cart";
    cartBtn.setAttribute("class", "trigger");
    // const trigger = document.querySelector(".trigger");
    cartBtn.addEventListener("click", toggleModal);
    addToCart(cartBtn, ele);
    card.append(img, content, cartBtn);
    productContainer.append(card);
  });
}
// function searchFunc() {
//   if (
// searchData[0].searchValue === "all products" ||
// searchData[0].searchValue === "products" ||
// searchData[0].searchValue === "all product"
//   ) {
//     displayProduct(allProductData);
//   } else {
//     let filteredData = allProductData.filter((obj) => {
//       if (
//         obj.title
//           .toLowerCase()
//           .includes(searchData[0].searchValue.toLowerCase())
//       ) {
//         return true;
//       }
//     });
//     displayProduct(filteredData);
//   }
// }
searchBtn.addEventListener("click", () => {
  console.log("click");
  if (
    searchData[0].searchValue === "all products" ||
    searchData[0].searchValue === "products" ||
    searchData[0].searchValue === "all product"
  ) {
    displayProduct(allProductData);
  } else {
        searchType();
  }
});

function searchType() {
    searchData[0].searchValue = searchInp.value;
    localStorage.setItem("search-data", JSON.stringify(searchData));
    let filteredData = allProductData.filter((obj) => {
      if (
        obj.title
          .toLowerCase()
          .includes(searchData[0].searchValue.toLowerCase())
      ) {
        return true;
      }
    });
    displayProduct(filteredData);
}

sortInp.addEventListener("change", () => {
  if (sortInp.value === "") {
    fetchData(url);
    setTimeout(() => {
      console.log("inside ");
      displayProduct(allProductData);
    }, 1000);
  } else {
    if (sortInp.value === "asc") {
      allProductData.sort((a, b) => +a.price - +b.price);
      displayProduct(allProductData);
    } else {
      allProductData.sort((a, b) => +b.price - +a.price);
      displayProduct(allProductData);
    }
  }
});
const filterbtn = document.querySelector("#filter-btn");
const filterInpLow = document.querySelector("#lower");
const filterInpHigh = document.querySelector("#upper");
filterbtn.addEventListener("click", () => {
  let filteredData = allProductData.filter((ele) => {
    if (
      +ele.price >= +filterInpLow.value &&
      +ele.price <= +filterInpHigh.value
    ) {
      return true;
    } else {
      return false;
    }
  });
  console.log(filteredData);
  displayProduct(filteredData);
});

// function modal() {

// }
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
// add to cart function
function addToCart(buyBtn, obj) {
  console.log(obj);
  buyBtn.addEventListener("click", () => {
    if (cartData.length > 0) {
      let flag = true;
      cartData.forEach((ele) => {
        if (ele.id === obj.id) {
          alertMsg.innerText = "Product Already In Cart";
          modal1.style.backgroundColor = "#FF0000";
          cartCount.innerText = cartData.length;
          // modal(); #FF0000
          flag = false;
        }
      });
      if (flag) {
        obj.quantity = 1;
        cartData.push(obj);
        localStorage.setItem("buy", JSON.stringify(cartData));
        alertMsg.innerText = "Product Added In Cart";
        cartCount.innerText = cartData.length;
        modal1.style.backgroundColor = "#4BB543";
        //modal();
      }
    } else {
      obj.quantity = 1;
      cartData.push(obj);
      localStorage.setItem("buy", JSON.stringify(cartData));
      alertMsg.innerText = "Product Added In Cart";
      modal1.style.backgroundColor = "#4BB543";
      cartCount.innerText = cartData.length;
      //modal();
    }
  });
}
// sticky navbar
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

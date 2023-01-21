console.log("search");
const API = "https://fakestoreapi.com/products";
const productContainer = document.getElementById('product');

let allProductData = [];
let allUserData = JSON.parse(localStorage.getItem("users")) || [];
let searchData = JSON.parse(localStorage.getItem("search-data")) || [];
let flag = JSON.parse(localStorage.getItem("userstatus")) || [];

window.addEventListener("load", () => {
  fetchData();
  verifyUser();
 
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

const fetchData = async () => {
  try {
    const request = await fetch(API);
    const data = await request.json();
    console.log(data);
    allProductData = data;
    setTimeout(() => {
        searchFunc();
    },1000)
    
  } catch (error) {
    console.log(error);
  }
};

function displayProduct(data) {
    data.forEach((ele) => {
      const card = document.createElement('div');
      const img = document.createElement('img');
      img.setAttribute('src',ele.image);
      const content = document.createElement('div');
      const title = document.createElement('p');
      title.innerText = ele.title;
      const price = document.createElement('h3');
      price.innerText = ele.price;
      const rating = document.createElement('h4');
      rating.innerText = `Rating-${ele.rating.rate}`
      const category = document.createElement('p');
      category.innerText = `Category-${ele.category}`
      content.append(title,price,rating,category);
      const cartBtn = document.createElement('button');
      cartBtn.innerText = 'Add to cart'
      card.append(img,content,cartBtn)
      productContainer.append(card)
    })
}
function searchFunc() {
    if (searchData[0].searchValue === 'all products') {
        displayProduct(allProductData);
      } else {
        let filteredData = allProductData.filter((obj) => {
          if(obj.title.toLowerCase().includes(searchData[0].searchValue.toLowerCase()) ) {
            return true
          }
        })
        displayProduct(filteredData);
      }
}
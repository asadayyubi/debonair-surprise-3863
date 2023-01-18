console.log("connnected");
const carousol = document.querySelector(".carousol");
console.log(carousol);
const content = document.querySelector(".content0");
const slideContainer = document.querySelector(".slide-container");

const carousolImages = [
  "https://rukminim1.flixcart.com/merch/1400/1400/images/1473834622148.jpg?q=50",
  "https://m.media-amazon.com/images/G/31/img2020/fashion/WA_2020/WWnewstore/PC/pcbanner._CB427862063_.jpg",
  "https://assets.indiadesire.com/images/Amazon%20Fashion%20Wardrobe%20Refresh%20Sale%20dec%202022.jpg",
  "https://n3.sdlcdn.com/imgs/j/8/e/Health_ID_Snapdeal_ABDM_1300X410-6c79d.jpg",
  "https://mishry.com/wp-content/uploads/2021/01/cookware-set-sale.jpg",
];

window.addEventListener("load", () => {
  const slider = document.querySelectorAll(".content1");
  const contentTab = document.querySelector(".content-tab");

  let currentIndex = 0;

  const img = document.createElement("img");
  carousol.append(img);
  img.setAttribute("src", carousolImages[currentIndex]);
  let current = slider[currentIndex];
  setInterval(() => {
    if (currentIndex > carousolImages.length - 1) {
      currentIndex = 0;
    }

    //console.log(slider[currentIndex].innerText);
   
    current = slider[currentIndex];
    current.classList.remove("active");
   
    img.setAttribute("src", carousolImages[currentIndex]);
    const next = current.nextElementSibling || contentTab.firstElementChild;
    next.classList.add("active");
    currentIndex++;

  }, 3000);
});

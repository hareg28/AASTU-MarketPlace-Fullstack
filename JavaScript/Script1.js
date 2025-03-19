//Js applied to the footer indicating copyright and year of pubication.
const lastDiv = document.querySelector("footer div:last-child");
const newDiv = document.createElement("div");
newDiv.innerHTML = `
    <p class="currentYear">
        &copy; <span id="current-year"></span> AASTU MarketPlace. All rights reserved.
    </p>
`;
lastDiv.after(newDiv);
const currentYearElement = document.getElementById("current-year");
currentYearElement.textContent = new Date().getFullYear();

//js applied to search btn.
const searchButton = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    alert(`You searched for: ${query}`);
    searchInput.value = "";
  } else {
    alert("Please enter a search query!");
  }
});
//js applied on footer incon links
document.querySelectorAll(".contacts a").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    alert(`Redirecting to: ${icon.href}`);
    window.open(icon.href, "_blank");
  });
});
//Js applied to drop down list
function DropdownActivator() {
  const lastDiv = document.querySelector(".bottom-line");
  const existingMenu = document.querySelector(".menu-container");

  if (!existingMenu) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("menu-container");
    newDiv.innerHTML = `
      <div class="sidebar">
        <div class="menu-item">
          <i class="fas fa-user"></i>
          <a
            class="menu-text"
            href="/Account Settings/AccountSetting page.html"
            >Manage My Account</a
          >
        </div>
        <div class="menu-item">
          <i class="fas fa-shopping-bag"></i>
          <a class="menu-text" href="/Cart Page/index.html">My Order</a>
        </div>
        <div class="menu-item">
          <i class="fas fa-star"></i>
          <a class="menu-text" href="/Product-details Page/product details.html">My Reviews</a>
        </div>
        <div class="menu-item">
          <i class="fas fa-sign-out-alt"></i>
          <a class="menu-text" href="/Sign up page/signup.html">Logout</a>
        </div>
      </div>
    `;
    if (lastDiv) {
      lastDiv.after(newDiv);
      newDiv.style.display = "none";
      newDiv.style.display = "flex";
      newDiv.style.flexDirection = "column";
      newDiv.style.justifyItems = "flex-end";

      // Prevent dropdown from disappearing on hover over links
      newDiv.addEventListener("mouseover", () => {
        newDiv.style.display = "grid";
      });

      // Only hide dropdown onmouseout if not hovering over a child element
      newDiv.addEventListener("mouseout", (event) => {
        if (
          !event.relatedTarget ||
          !event.relatedTarget.closest(".menu-container")
        ) {
          newDiv.style.display = "none";
        }
      });
    }
  }
}

const AccountSetting = document.getElementById("AccountSetting");
if (AccountSetting) {
  AccountSetting.addEventListener("mouseover", () => {
    DropdownActivator();
    const menu = document.querySelector(".menu-container");
    if (menu) {
      menu.style.display = "block";
    }
  });

  // No need for mouseout event on AccountSetting, handled by menu container
}
//contact us page Form validation (Contact Us page example placeholder)
// function validateContactForm() {
//   const name = document.querySelector(".Name").value;
//   const email = document.getElementsByName("EmailAddress").value;
//   const phone = document.getElementsByName("PhoneNumber").value;
//   const message = document.getElementsByName("Message").value;
//   const form = document.getElementsByClassName("myForm");
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     if (name === "" || !email || !phone || !message) {
//       alert("Please fill Every Fields");
//       if (!email.includes("@")) {
//         alert("Please, Enter valid email");
//       }
//     }
//   });
//   // if (!emailField.value.includes("@")) {
//   //   alert("Please enter a valid email address.");
//   //   return false;
//   // }
//   // alert("Form submitted successfully!");
//   // return true;
// }

//Js added on home Page
const dots = document.querySelectorAll(".dots span");
const bannerContainer = document.querySelector(".banner");
const images = [
  "/Assets/playstation-5.png", // Replace with actual image paths
  "/Assets/Mac.svg",
];

// Set the default active dot and banner image
window.onload = () => {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[0].classList.add("active");
  bannerContainer.style.backgroundImage = `url(${images[0]})`;
  bannerContainer.style.backgroundSize = "cover";
  bannerContainer.style.backgroundPosition = "center";
  document.querySelector(".banner-image").style.display = "none";
  document.getElementById("text1").innerHTML = "PS5 Pro Series";
  document.querySelector(".banner").style.alignItems = "flex-end";
  document.getElementById("appleLogo").style.display = "none";
};

// Function to change the slide
const changeSlide = (index) => {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");

  if (index === 0) {
    bannerContainer.style.backgroundImage = `url(${images[0]})`;
    document.querySelector(".banner-image").style.display = "none";
    document.getElementById("text1").innerHTML = "PS5 Pro Series";
    document.querySelector(".banner").style.alignItems = "center";
    document.getElementById("appleLogo").style.display = "none";
  } else if (index === 1) {
    bannerContainer.style.background = "black";
    document.querySelector(".banner-image").style.display = "block";
    document.getElementById("text1").innerHTML = "Iphone Series";
    document.getElementById("appleLogo").style.display = "block";
    document.querySelector(".banner").style.alignItems = "center";
  } else if (index === 2) {
    bannerContainer.style.backgroundImage = `url(${images[1]})`;
    document.querySelector(".banner-image").style.display = "none";
    document.getElementById("text1").innerHTML = "MacBook Series";
    document.getElementById("appleLogo").style.display = "block";
    document.querySelector(".banner").style.alignItems = "center";
  }

  bannerContainer.style.backgroundSize = "cover";
  bannerContainer.style.backgroundPosition = "center";
};

// Click event for dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    changeSlide(index);
    dot.preventDefault();
  });
});

//Automatic slideshow functionality
let currentIndex = 0;
const totalDots = dots.length;

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalDots; // Cycle through the dots
  changeSlide(currentIndex);
}, 3000);

//js applied on product details page
document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;

  // Create a function to update the cart count display
  function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    if (!cartCountElement) {
      cartCountElement = document.createElement("span");
      cartCountElement.id = "cart-count";
      cartCountElement.className = "cart-count";
      document.querySelector(".btns").appendChild(cartCountElement);
    }
    cartCountElement.innerText = cartCount;
  }

  // Function to handle adding products to the cart
  function addToCart() {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart!");
      return;
    }
    cartCount++;
    updateCartCount();
    alert(`product added to cart! Size: ${selectedSize}`);
  }

  const addToCartButton = document.getElementById("addcart");

  // Add event listener for the button
  addToCartButton.addEventListener("click", addToCart);

  // Initialize the cart count display
  updateCartCount();

  // Size selection functionality
  let selectedSize = null;

  const sizeButtons = document.querySelectorAll(".size .space");

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Deselect all buttons
      sizeButtons.forEach((btn) => btn.classList.remove("selected"));

      // Select the clicked button
      button.classList.add("selected");
      selectedSize = button.value; // Store the selected size
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Delivery functionality
  const checkDeliveryLink = document.getElementById("check-delivery-link");
  const postalCodeContainer = document.getElementById("postal-code-container");
  const checkDeliveryBtn = document.getElementById("check-delivery-btn");
  const postalCodeInput = document.getElementById("postal-code");
  const deliveryMessage = document.getElementById("delivery-message");

  // Show the postal code input when the link is clicked
  checkDeliveryLink.addEventListener("click", (event) => {
    event.preventDefault();
    postalCodeContainer.style.display = "block";
    deliveryMessage.innerText = ""; // Clear any previous messages
  });

  // Check delivery availability when the button is clicked
  checkDeliveryBtn.addEventListener("click", () => {
    const postalCode = postalCodeInput.value.trim();

    if (postalCode === "") {
      deliveryMessage.innerText = "Please enter a valid postal code.";
      return;
    }

    //  checking delivery availability with a random result
    const isDeliveryAvailable = Math.random() > 0.5;

    if (isDeliveryAvailable) {
      deliveryMessage.innerText = "Delivery is available in your area!";
    } else {
      deliveryMessage.innerText = "Sorry, we do not deliver to your area.";
    }
  });
});
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    console.log("Hovered over:", item.querySelector(".content p").innerText);
  });
});

//js apllied on checkout page

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("billing-form");
  const confirmationMessage = document.getElementById("confirmation-message");

  // Form submission handling
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Simple validation
    if (!form.checkValidity()) {
      alert("Please fill out all required fields.");
      return;
    }

    // Handle saving information
    const saveInfo = document.getElementById("check").checked;
    if (saveInfo) {
      console.log("User information will be saved for next time.");
    }

    // Display confirmation message
    confirmationMessage.textContent =
      "Thank you! Your billing details have been submitted.";
    confirmationMessage.style.color = "green";

    // Optionally reset the form
    form.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const productdetails = document.getElementById("ps");
  productdetails.addEventListener("click", () => {
    window.location.href = "/Product-details Page/product details.html";
  });
});

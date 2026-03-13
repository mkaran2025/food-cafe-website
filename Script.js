
//navbar section 

const menuToggleBtn = document.getElementById("menuToggleBtn");
const navLinks = document.getElementById("navLinks");

if (menuToggleBtn && navLinks) {
  menuToggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}



// ad to cart button 
// Cart array to store items

let cart = [];

function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  if (cartSidebar) {
    cartSidebar.classList.toggle("visible");
  }
}

// Add to Cart Function
function addToCart(name, price, image) {

  // Check if item already exists in cart
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  updateCartDisplay();
  updateCartCount();

  // Show cart sidebar when item is added
  const cartSidebar = document.getElementById("cart-sidebar");
  if (cartSidebar) {
    cartSidebar.classList.add("visible");
  }
}

// Update Cart Count in Navbar
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Show/hide badge based on cart contents
    if (totalItems > 0) {
      cartCount.style.display = "block";
    } else {
      cartCount.style.display = "none";
    }
  }
}

// Update Cart Display
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p style='text-align:center; padding:20px;'>Your cart is empty!</p>";
    if (cartTotalElement) cartTotalElement.textContent = "0.00";
    return;
  }

  let cartHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartHTML += `
     <div class="cart-item">
  <img src="${item.image}" alt="${item.name}" class="cart-img">

  <div class="cart-details">
    <strong>${item.name}</strong>
    <p>Rs ${item.price} x ${item.quantity}</p>

    <div class="item-qty">
      <button onclick="updateQuantity(${index}, -1)">-</button>
      <span>${item.quantity}</span>
      <button onclick="updateQuantity(${index}, 1)">+</button>
    </div>
  </div>

  <!-- Updated Delete Button -->
  <button class="remove-btn"
          onclick="removeFromCart(${index})"
          title="Remove item">×</button>
</div>
    `;
  });

  cartItemsContainer.innerHTML = cartHTML;

  if (cartTotalElement) {
    cartTotalElement.textContent = total.toFixed(2);
  }
}

// Update Quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCartDisplay();
  updateCartCount();
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  updateCartCount();
}




// home 1

document.addEventListener("DOMContentLoaded", function () {

  const homeText = document.querySelector(".home-text");
  const homeImage = document.querySelector(".home-image");

  if (homeText) {
    homeText.style.opacity = "0";
    homeText.style.transform = "translateY(30px)";
    homeText.style.transition = "all 0.8s ease";

    setTimeout(() => {
      homeText.style.opacity = "1";
      homeText.style.transform = "translateY(0)";
    }, 200);
  }

  if (homeImage) {
    homeImage.style.opacity = "0";
    homeImage.style.transform = "translateX(30px)";
    homeImage.style.transition = "all 1s ease";

    setTimeout(() => {
      homeImage.style.opacity = "1";
      homeImage.style.transform = "translateX(0)";
    }, 400);
  }

});






// 2️ ABOUT SECTION 


document.addEventListener("DOMContentLoaded", function () {

  const aboutSection = document.querySelector("#about");

  // ✅ Stop if #about does not exist
  if (!aboutSection) return;

  function revealAbout() {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      aboutSection.classList.add("show-about");
    }
  }

  window.addEventListener("scroll", revealAbout);
  revealAbout();

});




// SERVICES SECTION about page 

document.addEventListener("DOMContentLoaded", function () {

  const serviceCards = document.querySelectorAll(".services-container .grid div");

  function revealServices() {
    const triggerBottom = window.innerHeight * 0.85;

    serviceCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  // Initial hidden state (without changing CSS file)
  serviceCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease";
  });

  window.addEventListener("scroll", revealServices);
  revealServices(); // run once on load

});






// 3️ MENU SECTION


document.addEventListener("DOMContentLoaded", function () {

  const menuItems = document.querySelectorAll(".menu-item");
  const menuBtn = document.querySelector(".menu-btn");

  // Click effect on menu items
  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.97)";

      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // See More Button (Redirect to Menu Page)
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      window.location.href = "pages/menu.html";
    });
  }

});









// 4. Testimonials Slider

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonials-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!slider || !slider.querySelector(".testimonial-item")) return;

  let scrollAmount = 0;
  let itemWidth = slider.querySelector(".testimonial-item").offsetWidth + 20;

  function updateValues() {
    itemWidth = slider.querySelector(".testimonial-item").offsetWidth + 20;
  }

  function getMaxScroll() {
    return slider.scrollWidth - slider.clientWidth;
  }

  nextBtn?.addEventListener("click", () => {
    if (scrollAmount < getMaxScroll()) {
      scrollAmount += itemWidth;
      slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  });

  prevBtn?.addEventListener("click", () => {
    if (scrollAmount > 0) {
      scrollAmount -= itemWidth;
      slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  });

  setInterval(() => {
    scrollAmount = scrollAmount < getMaxScroll() ? scrollAmount + itemWidth : 0;
    slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
  }, 4000);

  // Responsive Fix
  window.addEventListener("resize", updateValues);
});





// 5 GALLERY SECTION LIGHTBOX

document.addEventListener("DOMContentLoaded", function () {

  const galleryImages = document.querySelectorAll(".gallery-item img");

  // Create Lightbox
  const lightbox = document.createElement("div");
  lightbox.style.position = "fixed";
  lightbox.style.top = "0";
  lightbox.style.left = "0";
  lightbox.style.width = "100%";
  lightbox.style.height = "100%";
  lightbox.style.background = "rgba(0,0,0,0.8)";
  lightbox.style.display = "none";
  lightbox.style.justifyContent = "center";
  lightbox.style.alignItems = "center";
  lightbox.style.zIndex = "9999";

  const lightboxImg = document.createElement("img");
  lightboxImg.style.maxWidth = "90%";
  lightboxImg.style.maxHeight = "80%";
  lightboxImg.style.borderRadius = "10px";
  lightboxImg.style.boxShadow = "0 0 20px rgba(255,255,255,0.3)";

  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  // Open Lightbox
  galleryImages.forEach(image => {
    image.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = image.src;
    });
  });

  // Close Lightbox
  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

});





//6 CONTACT SECTION FORM HANDLER
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill all fields.");
      return;
    }

    alert("Thank you " + name + "! Your message has been sent successfully.");

    form.reset();

  });

});



// 7FOOTER SECTION 
document.addEventListener("DOMContentLoaded", function () {


  // AUTO COPYRIGHT YEAR
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }


  // SMOOTH SCROLL FOR FOOTER LINKS
  const footerLinks = document.querySelectorAll(".footer-links a");

  footerLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    });
  });


  // SOCIAL ICON HOVER EFFECT
  const socialIcons = document.querySelectorAll(".social-icons a");

  socialIcons.forEach(icon => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2)";
      this.style.transition = "0.3s ease";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

});

const menuData = [
  {
    name: "Margherita Pizza",
    price: 200,
    category: "Pizza",
    image:
      "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg",
    description: "Classic cheese pizza with tomato sauce and herbs.",
  },
  {
    name: "Paneer Pizza",
    price: 250,
    category: "Pizza",
    image: "images/pizza.jpg",
    description: "Indian style pizza with spicy paneer toppings.",
  },
  {
    name: "Veg Burger",
    price: 120,
    category: "Burger",
    image:
      "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_640.jpg",
    description: "Juicy vegetable patty with lettuce and sauces.",
  },
  {
    name: "Cheese Burger",
    price: 140,
    category: "Burger",
    image:
      "https://cdn.pixabay.com/photo/2016/03/05/19/02/burger-1238246_640.jpg",
    description: "Burger with creamy cheese and spicy mayo.",
  },
  {
    name: "French Fries",
    price: 90,
    category: "Burger",
    image: "images/frenchfries.jpg",
    description: "Crispy golden fries with salt and seasoning.",
  },
  {
    name: "Masala Fries",
    price: 100,
    category: "Burger",
    image: "images/Masala Fries.jpg",
    description: "Spicy Indian-style fries with masala mix.",
  },
  {
    name: "Coke",
    price: 50,
    category: "Drinks",
    image: "images/cola.jpg",
    description: "Chilled Coca-Cola soft drink.",
  },
  {
    name: "Pepsi",
    price: 50,
    category: "Drinks",
    image: "images/Pepsi.jpg",
    description: "Refreshing Pepsi cola for your meal.",
  },
  {
    name: "Sprite",
    price: 50,
    category: "Drinks",
    image: "images/sprite.jpg",
    description: "Lemon-lime flavored soft drink.",
  },
  {
    name: "Cold Coffee",
    price: 80,
    category: "Drinks",
    image: "images/Cold Coffee.jpg",
    description: "Iced cold coffee with a creamy blend.",
  },
  {
    name: "Choco Lava Cake",
    price: 110,
    category: "Dessert",
    image: "images/Choco Lava Cake.jpg",
    description: "Molten chocolate cake with rich filling.",
  },
  {
    name: "Brownie Sundae",
    price: 130,
    category: "Dessert",
    image: "images/Brownie Sundae.jpg",
    description: "Brownie with vanilla ice cream & chocolate sauce.",
  },
  {
    name: "Idli Sambar",
    price: 60,
    category: "South Indian",
    image: "images/Idli Sambar.jpg",
    description: "Soft idlis served with hot sambar and chutney.",
  },
  {
    name: "Dosa",
    price: 70,
    category: "South Indian",
    image: "images/dosa.jpg",
    description: "Crispy dosa with masala filling and side dips.",
  },
  {
    name: "Vada Sambar",
    price: 55,
    category: "South Indian",
    image: "images/Vada Sambar.jpg",
    description: "Fried lentil donuts soaked in flavorful sambar.",
  },
  {
    name: "Vanilla Ice Cream",
    price: 50,
    category: "Dessert",
    image: "images/Vanilla Ice Cream.jpg",
    description: "Classic vanilla scoop with creamy texture.",
  },
  {
    name: "Chocolate Ice Cream",
    price: 60,
    category: "Dessert",
    image: "images/Chocolate Ice Cream.jpg",
    description: "Rich chocolate flavor with smooth finish.",
  },
  {
    name: "Strawberry Sundae",
    price: 70,
    category: "Dessert",
    image: "images/Strawberry Sundae.jpg",
    description: "Refreshing strawberry delight with syrup topping.",
  },
  {
    name: "Burger + Fries + Coke",
    price: 199,
    category: "Combo",
    image: "images/Burger + Fries + Coke.jpg",
    description: "Combo meal with burger, fries, and chilled coke.",
  },
  {
    name: "Pizza Combo Meal",
    price: 299,
    category: "Combo",
    image: "images/Pizza Combo Meal.jpg",
    description: "1 medium pizza, garlic bread & soft drink.",
  },
  {
    name: "South Indian Thali",
    price: 150,
    category: "Combo",
    image: "images/south indian thali.jpg",
    description: "Traditional thali with rice, curries, curd & sweet.",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "all";

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize based on current page
  if (document.getElementById("menu-items")) {
    renderMenu();
  }

  if (document.getElementById("cart-items")) {
    renderCartPage();
  }

  updateCartCount();
});

// Render food menu
function renderMenu() {
  const container = document.getElementById("menu-items");
  const searchTerm =
    document.getElementById("search")?.value.toLowerCase() || "";

  container.innerHTML = "";

  const filteredItems = menuData.filter((item) => {
    const matchesCategory =
      currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (filteredItems.length === 0) {
    container.innerHTML =
      '<div class="col-12 text-center py-5"><h5>No items found</h5></div>';
    return;
  }

  filteredItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "food-item card mb-4";
    card.style.minHeight = "400px";

    card.innerHTML = `
      <img src="${item.image}" class="card-img-top" alt="${
      item.name
    }" style="height: 200px; object-fit: cover;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text text-muted">${item.description}</p>
        <div class="mt-auto">
          <p class="card-text fw-bold">₹${item.price}</p>
          <button class="btn btn-success w-100" onclick="addToCart('${item.name.replace(
            /'/g,
            "\\'"
          )}', ${item.price}, '${item.image.replace(/'/g, "\\'")}')">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Add item to cart
function addToCart(name, price, image) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
      image: image || "images/default-food.jpg",
    });
  }

  saveCart();
  updateCartCount();
  showToast(`${name} added to cart`);

  // If on cart page, refresh the view
  if (document.getElementById("cart-items")) {
    renderCartPage();
  }
}

// Render cart page
function renderCartPage() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const subtotalElement = document.getElementById("subtotal");
  const deliveryFee = 50;
  let subtotal = 0;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart text-center py-5">
        <i class="fas fa-shopping-cart fa-4x mb-3 text-muted"></i>
        <h4>Your cart is empty</h4>
        <a href="index.html" class="btn btn-primary mt-3">Browse Menu</a>
      </div>
    `;
    subtotalElement.textContent = "0";
    totalElement.textContent = "0";
    document.getElementById("checkout-btn").disabled = true;
    return;
  }

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item mb-3 p-3 border rounded";
    cartItem.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-2 col-4">
          <img src="${item.image}" alt="${
      item.name
    }" class="img-fluid rounded" style="height: 80px; width: 100%; object-fit: cover;">
        </div>
        <div class="col-md-4 col-8">
          <h6 class="mb-1">${item.name}</h6>
          <p class="mb-1 text-muted">₹${item.price} each</p>
        </div>
        <div class="col-md-3 col-6 mt-md-0 mt-2">
          <div class="input-group">
            <button class="btn btn-outline-secondary" type="button" onclick="updateCartItem('${item.name.replace(
              /'/g,
              "\\'"
            )}', -1)">
              <i class="fas fa-minus"></i>
            </button>
            <input type="text" class="form-control text-center" value="${
              item.quantity
            }" readonly>
            <button class="btn btn-outline-secondary" type="button" onclick="updateCartItem('${item.name.replace(
              /'/g,
              "\\'"
            )}', 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="col-md-2 col-4 text-md-center mt-md-0 mt-2">
          <span class="fw-bold">₹${itemTotal}</span>
        </div>
        <div class="col-md-1 col-2 text-end mt-md-0 mt-2">
          <button class="btn btn-sm btn-danger" onclick="removeCartItem('${item.name.replace(
            /'/g,
            "\\'"
          )}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  subtotalElement.textContent = subtotal;
  totalElement.textContent = subtotal + deliveryFee;
  document.getElementById("checkout-btn").disabled = false;
}

// Update cart item quantity
function updateCartItem(name, delta) {
  const item = cart.find((i) => i.name === name);
  if (item) {
    item.quantity += delta;

    if (item.quantity <= 0) {
      removeCartItem(name);
    } else {
      saveCart();
      updateCartCount();
      renderCartPage();
    }
  }
}

// Remove item from cart
function removeCartItem(name) {
  cart = cart.filter((item) => item.name !== name);
  saveCart();
  updateCartCount();
  renderCartPage();
  showToast(`${name} removed from cart`);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart count in navbar
function updateCartCount() {
  const cartCountElements = document.querySelectorAll(".cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountElements.forEach((element) => {
    element.textContent = totalItems;
    element.style.display = totalItems > 0 ? "block" : "none";
  });
}

// Show toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast show position-fixed bottom-0 end-0 m-3";
  toast.style.zIndex = "1100";
  toast.innerHTML = `
    <div class="toast-header bg-primary text-white">
      <strong class="me-auto">KrishKitchen</strong>
      <button type="button" class="btn-close btn-close-white" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
    <div class="toast-body">${message}</div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Filter by category
function filterCategory(category) {
  currentCategory = category;
  renderMenu();
}

// Search event
document.getElementById("search")?.addEventListener("input", renderMenu);

// Checkout form
function showCheckoutForm() {
  document.getElementById("checkout-form").classList.remove("d-none");
  document.getElementById("checkout-btn").classList.add("d-none");
  window.scrollTo(0, document.body.scrollHeight);
}

// Submit order
document.getElementById("order-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    showToast("Please fill all required fields");
    return;
  }

  // Create order object
  const order = {
    customer: { name, phone, address },
    items: [...cart],
    total: document.getElementById("total").textContent,
    date: new Date().toLocaleString(),
  };

  // In a real app, you would send this to your backend
  console.log("Order placed:", order);

  // Show confirmation
  alert(`Thank you, ${name}! Your order for ₹${order.total} has been placed.`);

  // Clear cart
  cart = [];
  saveCart();
  updateCartCount();

  // Reset form
  this.reset();
  document.getElementById("checkout-form").classList.add("d-none");
  document.getElementById("checkout-btn").classList.remove("d-none");

  // If on cart page, refresh view
  if (document.getElementById("cart-items")) {
    renderCartPage();
  }
});

// Dark Mode Toggle
document.getElementById("theme-toggle")?.addEventListener("click", function () {
  document.body.classList.toggle("dark"); // changed to match CSS
  this.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";

  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Initialize dark mode if previously set
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) toggleBtn.textContent = "Light Mode";
}

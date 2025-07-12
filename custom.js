/* ====================== */
/* MENU DATA DEFINITION */
/* ====================== */

// Array containing all menu items with their details
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
    image: "images/Burger Fries Coke.jpg",
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
/* ====================== */
/* CORE SYSTEM VARIABLES */
/* ====================== */
let currentCategory = "all";

/* ====================== */
/* OPTIMIZED THEME SYSTEM */
/* ====================== */
const ThemeManager = {
  init() {
    this.applyTheme(localStorage.getItem("darkMode") === "true");
    document
      .getElementById("theme-toggle")
      ?.addEventListener("click", () => this.toggle());
  },
  toggle() {
    const isDark = !document.body.classList.contains("dark");
    this.applyTheme(isDark);
    localStorage.setItem("darkMode", isDark);
  },
  applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.style.backgroundColor = isDark ? "#ff6b6b" : "#dc3545";
    });
  },
};

/* ====================== */
/* CART MANAGEMENT SYSTEM */
/* ====================== */
const CartManager = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  init() {
    this.updateCartCount();
  },

  addToCart(name, price, image) {
    const existingItem = this.cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        name,
        price,
        quantity: 1,
        image: image || "images/default-food.jpg",
      });
    }
    this.saveCart();
    this.updateCartCount();
    Toast.show(`${name} added to cart`);
    if (document.getElementById("cart-items")) {
      this.renderCartPage();
    }
  },

  updateCartItem(name, delta) {
    const item = this.cart.find((i) => i.name === name);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeCartItem(name);
      } else {
        this.saveCart();
        this.updateCartCount();
        this.renderCartPage();
      }
    }
  },

  removeCartItem(name) {
    this.cart = this.cart.filter((item) => item.name !== name);
    this.saveCart();
    this.updateCartCount();
    this.renderCartPage();
    Toast.show(`${name} removed from cart`);
  },

  renderCartPage() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    const totalElement = document.getElementById("total");
    const subtotalElement = document.getElementById("subtotal");
    const deliveryFee = 50;
    let subtotal = 0;

    cartContainer.innerHTML = "";

    if (this.cart.length === 0) {
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

    this.cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item mb-3 p-3 border rounded";
      cartItem.innerHTML = `
        <div class="row align-items-center">
          <div class="col-md-2 col-4">
            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" style="height: 80px; width: 100%; object-fit: cover;">
          </div>
          <div class="col-md-4 col-8">
            <h6 class="mb-1">${item.name}</h6>
            <p class="mb-1 text-muted">₹${item.price} each</p>
          </div>
          <div class="col-md-3 col-6 mt-md-0 mt-2">
            <div class="input-group">
              <button class="btn btn-outline-secondary" type="button" data-action="update-quantity" data-item-name="${item.name}" data-delta="-1"><i class="fas fa-minus"></i></button>
              <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
              <button class="btn btn-outline-secondary" type="button" data-action="update-quantity" data-item-name="${item.name}" data-delta="1"><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <div class="col-md-2 col-4 text-md-center mt-md-0 mt-2">
            <span class="fw-bold">₹${itemTotal}</span>
          </div>
          <div class="col-md-1 col-2 text-end mt-md-0 mt-2">
            <button class="btn btn-sm btn-danger" data-action="remove-item" data-item-name="${item.name}"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    });

    subtotalElement.textContent = subtotal;
    totalElement.textContent = subtotal + deliveryFee;
    document.getElementById("checkout-btn").disabled = false;
  },

  updateCartCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const counters = document.querySelectorAll(".cart-count");
    counters.forEach((counter) => {
      counter.textContent = totalItems;
      counter.style.display = totalItems > 0 ? "inline-block" : "none";
    });
    localStorage.setItem("cartCount", totalItems);
  },

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    localStorage.setItem("cartUpdated", Date.now());
  },
};

/* ====================== */
/* EVENT MANAGEMENT SYSTEM */
/* ====================== */
const EventSystem = {
  init() {
    document.addEventListener("click", (e) => this.handleClick(e));
    window.addEventListener("storage", (e) => this.handleStorage(e));
    document
      .getElementById("search")
      ?.addEventListener("input", () => renderMenu());
    document
      .getElementById("order-form")
      ?.addEventListener("submit", (e) => this.handleOrderSubmit(e));
  },

  handleClick(e) {
    if (e.target.closest('[data-action="add-to-cart"]')) {
      const card = e.target.closest(".food-item");
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const image = card.dataset.image;
      CartManager.addToCart(name, price, image);
    }

    if (e.target.closest('[data-action="update-quantity"]')) {
      const btn = e.target.closest('[data-action="update-quantity"]');
      const name = btn.dataset.itemName;
      const delta = parseInt(btn.dataset.delta);
      CartManager.updateCartItem(name, delta);
    }

    if (e.target.closest('[data-action="remove-item"]')) {
      const btn = e.target.closest('[data-action="remove-item"]');
      const name = btn.dataset.itemName;
      CartManager.removeCartItem(name);
    }

    if (e.target.closest("#checkout-btn")) {
      this.showCheckoutForm();
    }
  },

  handleStorage(e) {
    if (e.key === "cart") {
      CartManager.cart = JSON.parse(e.newValue) || [];
      CartManager.updateCartCount();
      if (document.getElementById("cart-items")) {
        CartManager.renderCartPage();
      }
    }
    if (e.key === "darkMode") {
      ThemeManager.applyTheme(e.newValue === "true");
    }
  },

  showCheckoutForm() {
    document.getElementById("checkout-form").classList.remove("d-none");
    document.getElementById("checkout-btn").classList.add("d-none");
    window.scrollTo(0, document.body.scrollHeight);
  },

  handleOrderSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    if (!name || !phone || !address) {
      Toast.show("Please fill all required fields", "error");
      return;
    }
    const order = {
      customer: { name, phone, address },
      items: [...CartManager.cart],
      total: document.getElementById("total").textContent,
      date: new Date().toLocaleString(),
    };
    console.log("Order placed:", order);
    Toast.show(`Thank you, ${name}! Your order has been placed.`);
    CartManager.cart = [];
    CartManager.saveCart();
    CartManager.updateCartCount();
    e.target.reset();
    document.getElementById("checkout-form").classList.add("d-none");
    document.getElementById("checkout-btn").classList.remove("d-none");
    if (document.getElementById("cart-items")) {
      CartManager.renderCartPage();
    }
  },
};

/* ====================== */
/* TOAST NOTIFICATION SYSTEM */
/* ====================== */
const Toast = {
  show(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast show toast-${type}`;
    toast.innerHTML = `
      <div class="toast-header">
        <strong class="me-auto">KrishKitchen</strong>
        <button class="btn-close" data-dismiss="toast"></button>
      </div>
      <div class="toast-body">${message}</div>
    `;
    document.body.appendChild(toast);
    toast
      .querySelector('[data-dismiss="toast"]')
      .addEventListener("click", () => this.hide(toast));
    setTimeout(() => this.hide(toast), 3000);
  },
  hide(toast) {
    toast.classList.add("fade");
    setTimeout(() => toast.remove(), 150);
  },
};

/* ====================== */
/* MENU RENDERING FUNCTION */
/* ====================== */
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
    card.dataset.name = item.name;
    card.dataset.price = item.price;
    card.dataset.image = item.image;
    card.innerHTML = `
      <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text text-muted">${item.description}</p>
        <div class="mt-auto">
          <p class="card-text fw-bold">₹${item.price}</p>
          <button class="btn btn-success w-100" data-action="add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterCategory(category) {
  currentCategory = category;
  renderMenu();
}

/* ====================== */
/* INITIALIZATION ON PAGE LOAD */
/* ====================== */
document.addEventListener("DOMContentLoaded", function () {
  ThemeManager.init();
  CartManager.init();
  EventSystem.init();
  if (document.getElementById("menu-items")) renderMenu();
  if (document.getElementById("cart-items")) CartManager.renderCartPage();
});

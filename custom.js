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

// Render food menu
function renderMenu() {
  const container = document.getElementById("menu-items");
  const searchTerm = document.getElementById("search").value.toLowerCase();

  container.innerHTML = "";

  menuData.forEach((item) => {
    if (
      (currentCategory === "all" || item.category === currentCategory) &&
      item.name.toLowerCase().includes(searchTerm)
    ) {
      const card = document.createElement("div");
      card.className = "food-item card";

      card.innerHTML = `
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text fw-bold">₹${item.price}</p>
            <button class="btn btn-success" onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
          </div>
        `;
      container.appendChild(card);
    }
  });
}

function addToCart(name, price) {
  const index = cart.findIndex((item) => item.name === name);
  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCartUI();
}

function changeQuantity(name, delta) {
  const item = cart.find((i) => i.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) removeItem(name);
    else {
      saveCart();
      updateCartUI();
    }
  }
}

function removeItem(name) {
  cart = cart.filter((item) => item.name !== name);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
  const cartDiv = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
        <span>${item.name} (₹${item.price})</span>
        <span>
          <button onclick="changeQuantity('${item.name}', -1)">−</button>
          ${item.quantity}
          <button onclick="changeQuantity('${item.name}', 1)">+</button>
          <button onclick="removeItem('${item.name}')">🗑️</button>
        </span>
      `;
    cartDiv.appendChild(div);
    total += item.price * item.quantity;
  });

  totalSpan.textContent = total;
}

// Filter by category
function filterCategory(category) {
  currentCategory = category;
  renderMenu();
}

// Search event
document.getElementById("search").addEventListener("input", renderMenu);

// Checkout form
function showCheckout() {
  document.getElementById("checkout-form").classList.remove("hidden");
  window.scrollTo(0, document.body.scrollHeight);
}

function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !address) {
    alert("Please fill out all fields.");
    return;
  }

  alert(`Thank you, ${name}! Your order has been placed.`);
  cart = [];
  saveCart();
  updateCartUI();
  document.getElementById("checkout-form").classList.add("hidden");
  e.target.reset();
}

// Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initial Load
renderMenu();
updateCartUI();

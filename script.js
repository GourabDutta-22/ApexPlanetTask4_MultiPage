// Dark mode toggle
document.getElementById("darkModeToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Mobile menu toggle
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}

// ---------------- To-Do App ----------------
const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

if (todoForm) {
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    saveTasks();
  });
}

window.toggleTask = function(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
};

window.deleteTask = function(index) {
  tasks.splice(index, 1);
  saveTasks();
};

renderTasks();

// ---------------- Product Listing ----------------
const productGrid = document.getElementById("productGrid");

const products = [
  { name: "Smartphone", category: "electronics", price: 500, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 1000, rating: 4.8 },
  { name: "T-Shirt", category: "clothing", price: 20, rating: 4.2 },
  { name: "Novel", category: "books", price: 15, rating: 4.6 },
  { name: "Headphones", category: "electronics", price: 80, rating: 4.1 },
  { name: "Jacket", category: "clothing", price: 60, rating: 4.4 }
];

function renderProducts(filteredProducts) {
  if (!productGrid) return;
  productGrid.innerHTML = "";
  filteredProducts.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("project-card");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
      <p>Rating: ⭐ ${p.rating}</p>
    `;
    productGrid.appendChild(div);
  });
}

if (productGrid) {
  renderProducts(products);

  const filterCategory = document.getElementById("filterCategory");
  const sortProducts = document.getElementById("sortProducts");

  function updateProducts() {
    let filtered = [...products];

    // Filter
    if (filterCategory.value !== "all") {
      filtered = filtered.filter(p => p.category === filterCategory.value);
    }

    // Sort
    if (sortProducts.value === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortProducts.value === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortProducts.value === "ratingHighLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
  }

  filterCategory.addEventListener("change", updateProducts);
  sortProducts.addEventListener("change", updateProducts);
}

// ---------------- Contact Form ----------------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("formStatus").innerText = "✅ Message sent successfully!";
    contactForm.reset();
  });
}
const userInputs = document.querySelectorAll("#expenseForm .input-text");
const expenseForm = document.querySelector("#expenseForm");
const displayExpenses = document.querySelector(".display-expenses #data");
const viewExpenses = document.querySelector("#view-expenses tbody");

let list = JSON.parse(localStorage.getItem("expenses")) || [];
let data = {};

userInputs.forEach(function (input) {
  input.addEventListener("input", function (e) {
    data[e.target.name] = e.target.value;
  });
});

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  data.id = Date.now();

  list.push(data);

  localStorage.setItem("expenses", JSON.stringify(list));

  clearInputs();

  data = {};

  handleDisplay();

  handleDisplayTable();

  calculateTotal();
});

function clearInputs() {
  userInputs.forEach(function (input) {
    input.value = "";
  });
}

function handleDisplay() {
  if (!displayExpenses) return;

  displayExpenses.innerHTML = "";

  list.forEach(function (item) {
    const col = document.createElement("div");
    col.classList.add("col-md-3");

    col.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            ${item.description}
          </h4>
          <p class="card-price">
            ${item.amount}
          </p>
        </div>
      </div>

    `;

    displayExpenses.appendChild(col);
  });
}

handleDisplay();

function handleDisplayTable() {
  if (!viewExpenses) return;

  viewExpenses.innerHTML = "";

  list.forEach(function (item, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.description}</td>
      <td>${item.amount}</td>

      <td>
      <button
        class="btn btn-warning"
        onclick="handleEdit(${item.id})">
        Edit
      </button>
        <button
          class="btn btn-danger"
          onclick="handleDelete(${item.id})">
          Delete
        </button>

      </td>
    `;

    viewExpenses.appendChild(row);
  });
}

handleDisplayTable();

function handleDelete(id) {
  list = list.filter(function (item) {
    return item.id !== id;
  });

  localStorage.setItem("expenses", JSON.stringify(list));

  handleDisplay();

  handleDisplayTable();

  calculateTotal();
}

function calculateTotal() {
  const totalElement = document.getElementById("total-expense");

  if (!totalElement) return;

  let total = 0;

  list.forEach(function (item) {
    total += Number(item.amount);
  });

  totalElement.innerHTML = `${total.toFixed(2)}`;
}

function calculateCount() {
  const countElement = document.getElementById("expense-count");

  if (!countElement) return;

  countElement.innerHTML = list.length;
}

calculateTotal();
calculateTotal();

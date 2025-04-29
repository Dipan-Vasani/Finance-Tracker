const typeRadios = document.getElementsByName("type");
const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expenseTableBody = document.getElementById("expense-table-body");

const totalExpensesEl = document.getElementById("total-expenses");
const totalIncomeEl = document.getElementById("total-income");
const balanceEl = document.getElementById("balance");
const totalAmountEl = document.getElementById("total-amount");

let transactions = [];

addBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;
  const type = [...typeRadios].find(r => r.checked)?.value;

  if (!category || isNaN(amount) || !date || !type) {
    alert("Please fill all fields.");
    return;
  }

  const transaction = {
    id: Date.now(),
    category,
    amount,
    date,
    type
  };

  transactions.push(transaction);
  renderTransaction(transaction);
  updateSummary();

  amountInput.value = "";
  dateInput.value = "";
  categorySelect.value = "";
  document.querySelector('input[name="type"][value="Expense"]').checked = true;
});

function renderTransaction(transaction) {
  const row = document.createElement("tr");
  row.dataset.id = transaction.id;
  row.dataset.type = transaction.type;

  row.innerHTML = `
    <td>${transaction.category}</td>
    <td>₹${transaction.amount.toFixed(2)}</td>
    <td>${transaction.date}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  row.querySelector(".delete-btn").addEventListener("click", () => {
    deleteTransaction(transaction.id);
  });

  expenseTableBody.appendChild(row);
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  document.querySelector(`tr[data-id='${id}']`).remove();
  updateSummary();
}

function updateSummary() {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach(t => {
    if (t.type === "Expense") {
      totalExpenses += t.amount;
    } else {
      totalIncome += t.amount;
    }
  });

  const balance = totalIncome - totalExpenses;

  totalExpensesEl.textContent = totalExpenses.toFixed(2);
  totalIncomeEl.textContent = totalIncome.toFixed(2);
  balanceEl.textContent = balance.toFixed(2);
  totalAmountEl.textContent = totalExpenses.toFixed(2);
}

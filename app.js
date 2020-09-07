const myBalance = document.querySelector(".balance-section h2");
const incomee = document.querySelector(".income-price");
const expensee = document.querySelector(".expense-price");
const historyUl = document.querySelector(".history ul");
const form = document.querySelector("form");
const text = document.querySelector(".text");
const amount = document.querySelector(".amount");
let transactions = [];

const addTransaction = (e) => {
  e.preventDefault();
  const transaction = {
    id: generateId(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValue();
};

const updateValue = () => {
  const amount = transactions.map((val) => val.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0);
  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, sum) => (acc += sum), 0);

  const expense =
    amount.filter((item) => item < 0).reduce((acc, sum) => (acc += sum), 0) *
    -1;

  incomee.innerHTML = `$${income}`;
  expensee.innerHTML = `$${expense}`
  myBalance.innerHTML = `${total < 0 ? '-' : ''}$${Math.abs(total)}`;
};

const addTransactionDOM = (transaction) => {
  const li = document.createElement("li");
  const sign = transaction.amount < 0 ? '-' : '+'
  li.classList.add("li-section");
  li.innerHTML = `
  <span class="delete" onclick="removeTransaction(${transaction.id})">X</span>
            <span class="span">
              <span>${transaction.text}</span>
              <span>${sign}$${Math.abs(transaction.amount)}</span>
            </span>
  `;
  historyUl.appendChild(li);
};

function removeTransaction(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  init();
}

function generateId() {
  return Math.floor(Math.random() * 10000000);
}

function init() {
  (historyUl.innerHTML = ""), transactions.forEach(addTransactionDOM);
  updateValue();
}


init();

form.addEventListener("submit", addTransaction);

const addBtn = document.getElementById("add-btn");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("amount-input");
const categoryInput = document.getElementById("category-input");
const tableBody = document.getElementById("expenses-table-body");
const totalDisplay = document.getElementById("total-amount");
const filter = document.getElementById("filter-category");

let expenses = [];

addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (!name || amount <= 0) return alert("sayup ka bayot");

    expenses.push({ id: Date.now(), name, amount, category });
    nameInput.value = amountInput.value = "";

    updateUI();
});

function deleteExpense(id) {
    expenses = expenses.filter(e => e.id !== id);
    updateUI();
}

function updateUI() {
    const selected = filter.value;
    tableBody.innerHTML = "";

    const filtered = expenses.filter(e =>
        selected === "All" || e.category === selected
    );

    filtered.forEach(e => {
        tableBody.innerHTML += `
            <tr>
                <td>${e.name}</td>
                <td>₱${e.amount.toFixed(2)}</td>
                <td>${e.category}</td>
                <td><button onclick="deleteExpense(${e.id})">Delete</button></td>
            </tr>
        `;
    });

    const total = filtered.reduce((sum, e) => sum + e.amount, 0);
    totalDisplay.textContent = `₱${total.toFixed(2)}`;
}

filter.addEventListener("change", updateUI);

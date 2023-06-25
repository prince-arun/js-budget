const initializeUI = () => {
  const ui = {
    blAm: document.getElementById("balance-amount"),
    exI: document.getElementById("expense-input"),
    balance: document.getElementById("balance"),

    bdI: document.getElementById("budget-input"),
    bdAi: document.getElementById("budget-amount"),
    bdFm: document.getElementById("budget-form"),

    exAm: document.getElementById("expense-amount"),
    bdFb: document.querySelector(".budget-feedback"),

    exFm: document.getElementById("expense-form"),

    amI: document.getElementById("amount-input"),
    exFb: document.querySelector(".expense-feedback"),

    expenseList: document.getElementById("expense-list"),
    itemList: [],
    itemID: 0,
  };

  const budget = () => {
    const value = ui.bdI.value;
    if (value === "" || value < 0) {
      comment(
        ui.bdFb
        //   "Value cannot be empty or negative"
      );
    } else {
      ui.bdAi.textContent = value;
      ui.bdI.value = "";
      balance();
    }
  };

  const balance = () => {
    const expense = tExpense();
    const total = parseInt(ui.bdAi.textContent) - expense;
    ui.blAm.textContent = total;
    updateBl(total);
  };

  const expense = () => {
    const expenseValue = ui.exI.value;
    const amountValue = ui.amI.value;
    if (expenseValue === "" || amountValue === "" || amountValue < 0) {
      comment(ui.exFb, "Values cannot be empty or negative");
    } else {
      let amount = parseInt(amountValue);
      ui.exI.value = "";
      ui.amI.value = "";

      let expense = {
        id: ui.itemID,
        title: expenseValue,
        amount: amount,
      };
      ui.itemID++;
      ui.itemList.push(expense);
      includeExpense(expense);
      balance();
    }
  };

  const includeExpense = (expense) => {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
          <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
          <h5 class="expense-amount mb-0 list-item">$${expense.amount}</h5>
          <div class="expense-icons list-item">
            <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
              <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete-icon" data-id="${expense.id}">
              <i class="fas fa-trash"></i>
            </a>
          </div>
        </div>
      `;
    ui.expenseList.appendChild(div);
  };

  const tExpense = () => {
    let total = 0;
    if (ui.itemList.length > 0) {
      total = ui.itemList.reduce((acc, curr) => {
        acc += curr.amount;
        return acc;
      }, 0);
    }
    ui.exAm.textContent = total;
    return total;
  };

  const editExpense = (element) => {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    ui.expenseList.removeChild(parent);
    let expense = ui.itemList.filter((item) => item.id === id);
    ui.exI.value = expense[0].title;
    ui.amI.value = expense[0].amount;
    let tempList = ui.itemList.filter((item) => item.id !== id);
    ui.itemList = tempList;
    balance();
  };

  const deleteExpense = (element) => {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    ui.expenseList.removeChild(parent);
    let tempList = ui.itemList.filter((item) => item.id !== id);
    ui.itemList = tempList;
    balance();
  };

  const comment = (element, message) => {
    element.classList.add("showItem");
    element.innerHTML = `<p>${message}</p>`;
    setTimeout(() => {
      element.classList.remove("showItem");
    }, 3000);
  };

  const updateBl = (total) => {
    const balance = ui.balance;
    balance.classList.remove("showRed", "showGreen", "showBlack");
    if (total < 0) {
      balance.classList.add("showRed");
    } else if (total > 0) {
      balance.classList.add("showGreen");
    } else if (total === 0) {
      balance.classList.add("showBlack");
    }
  };

  ui.bdFm.addEventListener("submit", (event) => {
    event.preventDefault();
    budget();
  });

  ui.exFm.addEventListener("submit", (event) => {
    event.preventDefault();
    expense();
  });

  ui.expenseList.addEventListener("click", (event) => {
    if (event.target.parentElement.classList.contains("edit-icon")) {
      editExpense(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains("delete-icon")) {
      deleteExpense(event.target.parentElement);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeUI();
});

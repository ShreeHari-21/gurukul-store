let store = JSON.parse(localStorage.getItem('gurukulStore')) || {};

function saveStore() {
  localStorage.setItem('gurukulStore', JSON.stringify(store));
  displayItems();
}

function addItem() {
  const name = document.getElementById('itemName').value.trim();
  const qty = parseInt(document.getElementById('itemQty').value);
  const price = parseFloat(document.getElementById('itemPrice').value);

  if (!name || isNaN(qty) || isNaN(price)) {
    alert("Fill all fields!");
    return;
  }

  if (store[name]) {
    store[name].quantity += qty;
    store[name].price = price;
  } else {
    store[name] = { quantity: qty, price };
  }

  saveStore();
}

function displayItems() {
  const tableBody = document.querySelector('#inventoryTable tbody');
  tableBody.innerHTML = '';

  for (let item in store) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item}</td>
      <td>${store[item].quantity}</td>
      <td>₹${store[item].price.toFixed(2)}</td>
      <td><button onclick="sellItem('${item}')">Sell 1</button></td>
    `;

    tableBody.appendChild(row);
  }
}

function sellItem(name) {
  if (store[name].quantity > 1) {
    store[name].quantity -= 1;
  } else {
    delete store[name];
  }
  saveStore();
}

displayItems();

// =========================
// Clown Fiesta price list
// Change ONLY the numbers below when prices change.
// =========================
const foods = [
  { name: "Bearfoot Special", buff: "STR +8", stat: "STR", price: 50703 },
  { name: "Special Royal Jelly Herbal Tea", buff: "INT +7", stat: "INT", price: 52515 },
  { name: "Dragon Breath Cocktail", buff: "INT +10", stat: "INT", price: 175875 },
  { name: "Special Toast", buff: "DEX +8", stat: "DEX", price: 83091 },
  { name: "Hwergelmir's Tonic", buff: "DEX +10", stat: "DEX", price: 181461 },
  { name: "Steamed Alligator With Vegetable", buff: "AGI +7", stat: "AGI", price: 55845 },
  { name: "Special Meat Stew", buff: "AGI +7", stat: "AGI", price: 61512 },
  { name: "Sumptuous Feast", buff: "VIT +7", stat: "VIT", price: 52518 },
  { name: "Strawberry Flavored Rice Ball", buff: "LUK +8", stat: "LUK", price: 40608 }
];

const groupMeta = {
  STR: { color: "#ff4b5c", icon: "💪", tagline: "Power feeds victory" },
  INT: { color: "#4c8dff", icon: "🔮", tagline: "Fuel your magic" },
  DEX: { color: "#bd66ff", icon: "🎯", tagline: "Precision in every move" },
  AGI: { color: "#ff9b31", icon: "👟", tagline: "Speed feeds victory" },
  VIT: { color: "#41d778", icon: "🛡️", tagline: "Tank more, worry less" },
  LUK: { color: "#ff5bbd", icon: "🍀", tagline: "A little luck goes a long way" }
};

const quantities = new Array(foods.length).fill(0);

const foodGroups = document.getElementById("foodGroups");
const playerName = document.getElementById("playerName");
const orderSummary = document.getElementById("orderSummary");
const grandTotal = document.getElementById("grandTotal");
const summaryTitle = document.getElementById("summaryTitle");
const copyMessage = document.getElementById("copyMessage");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");
const setOneBtn = document.getElementById("setOneBtn");

const groupedFoods = foods.reduce((groups, food, index) => {
  (groups[food.stat] ||= []).push({ ...food, index });
  return groups;
}, {});

const format = value => value.toLocaleString("en-IN");

function renderGroups() {
  foodGroups.innerHTML = "";

  Object.entries(groupedFoods).forEach(([stat, items]) => {
    const meta = groupMeta[stat];
    const group = document.createElement("section");
    group.className = "food-group";
    group.style.setProperty("--group-color", meta.color);

    const header = document.createElement("div");
    header.className = "group-header";
    header.innerHTML = `
      <span class="group-stat">${meta.icon}</span>
      <span class="group-name">${stat}</span>
      <span class="group-tagline">${meta.tagline}</span>
    `;
    group.appendChild(header);

    const head = document.createElement("div");
    head.className = "food-row food-head";
    head.innerHTML = `
      <div>Food</div><div>Buff</div><div>Price</div><div>Quantity</div><div>Total</div>
    `;
    group.appendChild(head);

    items.forEach(food => {
      const row = document.createElement("div");
      row.className = "food-row";
      row.dataset.index = food.index;
      row.innerHTML = `
        <div class="food-name">${food.name}</div>
        <div class="food-buff">${food.buff}</div>
        <div class="food-price">${format(food.price)}</div>
        <div class="qty">
          <button type="button" class="minus" aria-label="Decrease ${food.name}" data-action="minus" data-index="${food.index}">−</button>
          <span class="qty-value" id="qty-${food.index}">0</span>
          <button type="button" class="plus" aria-label="Increase ${food.name}" data-action="plus" data-index="${food.index}">+</button>
        </div>
        <div class="food-cost" id="cost-${food.index}">0</div>
      `;
      group.appendChild(row);
    });

    foodGroups.appendChild(group);
  });
}

function calculate() {
  let total = 0;
  const selected = [];

  foods.forEach((food, index) => {
    const qty = quantities[index];
    const cost = food.price * qty;
    total += cost;

    document.getElementById(`qty-${index}`).textContent = qty;
    document.getElementById(`cost-${index}`).textContent = format(cost);

    if (qty > 0) selected.push({ ...food, qty, cost });
  });

  grandTotal.textContent = `${format(total)} Zeny`;
  summaryTitle.textContent = playerName.value.trim() ? `${playerName.value.trim()}'s order` : "Your order";

  if (!selected.length) {
    orderSummary.className = "order-summary empty";
    orderSummary.textContent = "No items selected yet.";
  } else {
    orderSummary.className = "order-summary";
    orderSummary.innerHTML = selected.map(item => `
      <div class="order-line">
        <span class="order-line-name">${item.name} × ${item.qty}</span>
        <span class="order-line-cost">${format(item.cost)}</span>
      </div>
    `).join("");
  }

  return { selected, total };
}

function adjust(index, delta) {
  quantities[index] = Math.max(0, quantities[index] + delta);
  calculate();
}

foodGroups.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const index = Number(button.dataset.index);
  adjust(index, button.dataset.action === "plus" ? 1 : -1);
});

playerName.addEventListener("input", calculate);

setOneBtn.addEventListener("click", () => {
  quantities.fill(1);
  calculate();
});

resetBtn.addEventListener("click", () => {
  quantities.fill(0);
  playerName.value = "";
  calculate();
  copyMessage.textContent = "";
});

function buildDiscordText() {
  const { selected, total } = calculate();
  const name = playerName.value.trim() || "Player";
  const lines = ["🍖 **Clown Fiesta Food Order**", `👤 Player: ${name}`, ""];

  if (!selected.length) {
    lines.push("No food selected.");
  } else {
    selected.forEach(item => {
      lines.push(`• ${item.name} × ${item.qty} = ${format(item.cost)}`);
    });
  }

  lines.push("", `💰 **Total: ${format(total)} Zeny**`);
  return lines.join("\n");
}

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildDiscordText());
    copyMessage.textContent = "Order copied — paste it into Discord.";
  } catch {
    copyMessage.textContent = "Clipboard access was blocked by the browser.";
  }
  window.setTimeout(() => { copyMessage.textContent = ""; }, 3000);
});

renderGroups();
calculate();
